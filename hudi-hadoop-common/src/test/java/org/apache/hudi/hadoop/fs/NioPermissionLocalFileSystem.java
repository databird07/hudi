/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.hudi.hadoop.fs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.LocalFileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.RawLocalFileSystem;
import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.io.nativeio.NativeIO;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.attribute.PosixFilePermission;
import java.util.EnumSet;
import java.util.Set;

/**
 * Local file system for tests that applies permissions through java.nio instead of forking a
 * {@code chmod} process per file, which is what {@link RawLocalFileSystem} does when the Hadoop
 * native library is not available (the usual case for tests). Only plain rwx modes are handled
 * this way; sticky/setuid/setgid modes, directories carrying setuid/setgid bits (which chmod
 * preserves) and file systems without POSIX attributes fall back to the stock implementation.
 *
 * <p>Without this override the {@code file} scheme resolves through the FileSystem service loader to
 * Hive's {@code ProxyLocalFileSystem}, so its {@link #rename} contract is kept as well.
 */
public class NioPermissionLocalFileSystem extends LocalFileSystem {

  public NioPermissionLocalFileSystem() {
    super(new NioPermissionRawLocalFileSystem());
  }

  /**
   * Makes {@code conf} use this file system for the {@code file} scheme, and replaces a stock local file
   * system already in the JVM-wide FileSystem cache, which would otherwise keep being returned. Needed by
   * harnesses that build their configuration with {@code new Configuration(false)} and so never read
   * the test core-site.xml.
   */
  public static void install(Configuration conf) throws IOException {
    conf.set("fs.file.impl", NioPermissionLocalFileSystem.class.getName());
    FileSystem cached = FileSystem.get(URI.create("file:///"), conf);
    if (!(cached instanceof NioPermissionLocalFileSystem)) {
      cached.close();
    }
  }

  @Override
  public boolean rename(Path src, Path dst) throws IOException {
    // same as Hive's ProxyLocalFileSystem: an existing destination file fails the rename
    return !isFile(dst) && super.rename(src, dst);
  }

  /**
   * Raw local file system that sets permissions with java.nio.
   */
  public static class NioPermissionRawLocalFileSystem extends RawLocalFileSystem {
    private static final PosixFilePermission[] BITS = {
        PosixFilePermission.OTHERS_EXECUTE, PosixFilePermission.OTHERS_WRITE, PosixFilePermission.OTHERS_READ,
        PosixFilePermission.GROUP_EXECUTE, PosixFilePermission.GROUP_WRITE, PosixFilePermission.GROUP_READ,
        PosixFilePermission.OWNER_EXECUTE, PosixFilePermission.OWNER_WRITE, PosixFilePermission.OWNER_READ};

    @Override
    public void setPermission(Path p, FsPermission permission) throws IOException {
      if (NativeIO.isAvailable()) {
        super.setPermission(p, permission);
        return;
      }
      int mode = permission.toShort();
      java.nio.file.Path path = pathToFile(p).toPath();
      if ((mode & ~0777) != 0 || hasSpecialBits(path)) {
        super.setPermission(p, permission);
        return;
      }
      Set<PosixFilePermission> perms = EnumSet.noneOf(PosixFilePermission.class);
      for (int i = 0; i < BITS.length; i++) {
        if ((mode & (1 << i)) != 0) {
          perms.add(BITS[i]);
        }
      }
      try {
        Files.setPosixFilePermissions(path, perms);
      } catch (UnsupportedOperationException e) {
        super.setPermission(p, permission);
      }
    }

    private static boolean hasSpecialBits(java.nio.file.Path path) {
      if (!Files.isDirectory(path)) {
        return false;
      }
      try {
        return (((Integer) Files.getAttribute(path, "unix:mode")) & 06000) != 0;
      } catch (UnsupportedOperationException | IllegalArgumentException | IOException e) {
        return true;
      }
    }
  }
}
