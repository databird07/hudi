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

package org.apache.hadoop.fs;

import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.io.nativeio.NativeIO;
import org.apache.hadoop.util.Shell;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.attribute.GroupPrincipal;
import java.nio.file.attribute.UserPrincipal;
import java.util.Map;

/**
 * Holder of {@link DeprecatedRawLocalFileStatus}; lives in this package to subclass Hadoop's package-private status.
 */
public final class NioLocalFileStatus {

  private static final Field USE_DEPRECATED_FILE_STATUS = useDeprecatedFileStatusField();

  private NioLocalFileStatus() {
  }

  /**
   * Same as the stock {@code new RawLocalFileSystem.DeprecatedRawLocalFileStatus(f, defaultBlockSize, fs)}.
   */
  public static FileStatus of(File f, long defaultBlockSize, FileSystem fs) throws IOException {
    return new DeprecatedRawLocalFileStatus(f, defaultBlockSize, fs);
  }

  /**
   * Whether {@link RawLocalFileSystem} would return a {@code DeprecatedRawLocalFileStatus} that forks {@code ls -ld}:
   * no native library, not Windows, and the {@code stat}-based statuses ({@code useStatIfAvailable}) not enabled.
   * Conservative on Hadoop 2.10, whose status forks {@code ls -ld} even when the native library is loaded.
   */
  public static boolean replacesStockStatus() {
    if (NativeIO.isAvailable() || Shell.WINDOWS || USE_DEPRECATED_FILE_STATUS == null) {
      return false;
    }
    try {
      return USE_DEPRECATED_FILE_STATUS.getBoolean(null);
    } catch (IllegalAccessException e) {
      return false;
    }
  }

  private static Field useDeprecatedFileStatusField() {
    try {
      Field field = RawLocalFileSystem.class.getDeclaredField("useDeprecatedFileStatus");
      field.setAccessible(true);
      return field;
    } catch (ReflectiveOperationException | RuntimeException e) {
      return null;
    }
  }

  /**
   * The file status {@link RawLocalFileSystem} returns when the Hadoop native library is not available, except that
   * permission, owner and group are read with one java.nio {@code lstat} instead of a forked {@code ls -ld}. As a
   * subclass of the stock status, with the same simple name (which {@link FileStatus#toString} prints), it keeps its
   * type, its serialization and its lazy loading: attributes are read on the first {@code getPermission},
   * {@code getOwner}, {@code getGroup} or {@code write}, like the stock status does. Wherever java.nio cannot give
   * the answer {@code ls -ld} would (no {@code unix} attribute view, a symlink, or any error such as the file having
   * been deleted since the status was built), nothing is set and the stock {@code ls -ld} runs as before. Only
   * overrides public and protected {@link FileStatus} methods, so it works with the Hadoop 2.10 and 3.x versions of
   * the stock status.
   */
  static class DeprecatedRawLocalFileStatus extends RawLocalFileSystem.DeprecatedRawLocalFileStatus {

    private static final int S_IFMT = 0170000;
    private static final int S_IFLNK = 0120000;

    private boolean nioLoaded;

    DeprecatedRawLocalFileStatus(File f, long defaultBlockSize, FileSystem fs) throws IOException {
      super(f, defaultBlockSize, fs);
    }

    @Override
    public FsPermission getPermission() {
      loadByNio();
      return super.getPermission();
    }

    @Override
    public String getOwner() {
      loadByNio();
      return super.getOwner();
    }

    @Override
    public String getGroup() {
      loadByNio();
      return super.getGroup();
    }

    @Override
    public void write(DataOutput out) throws IOException {
      loadByNio();
      super.write(out);
    }

    /**
     * The stock status counts its permission info as loaded once it has a non-empty owner, whoever set it (its own
     * {@code ls -ld}, {@link #readFields} or a caller); from then on java.nio must not overwrite it.
     */
    @Override
    protected void setOwner(String owner) {
      super.setOwner(owner);
      if (owner != null && !owner.isEmpty()) {
        nioLoaded = true;
      }
    }

    @Override
    public void readFields(DataInput in) throws IOException {
      super.readFields(in);
      // Hadoop 2.10 assigns the owner field directly; an empty owner read here makes the stock status run ls -ld
      nioLoaded = true;
    }

    /**
     * Sets what the stock status would load with {@code ls -ld}; the stock status then sees a non-empty owner,
     * considers its permission info loaded and does not fork.
     */
    private synchronized void loadByNio() {
      if (nioLoaded) {
        return;
      }
      int mode;
      String owner;
      String group;
      // the "unix" view rather than PosixFileAttributes, whose permissions() lack the sticky bit and the file type;
      // where the "unix" view is not supported this throws and the stock ls -ld runs
      try {
        Map<String, Object> attrs = Files.readAttributes(new File(getPath().toUri()).toPath(),
            "unix:mode,owner,group", LinkOption.NOFOLLOW_LINKS);
        mode = (Integer) attrs.get("mode");
        // the JDK falls back to the numeric id for unknown users and groups, as ls does
        owner = ((UserPrincipal) attrs.get("owner")).getName();
        group = ((GroupPrincipal) attrs.get("group")).getName();
      } catch (IOException | RuntimeException e) {
        return;
      }
      if ((mode & S_IFMT) == S_IFLNK) {
        return;
      }
      // what FsPermission.valueOf makes of the ls -ld mode string: the rwx bits (s and t count as x, S and T do
      // not) and the sticky bit; setuid, setgid and the ACL marker after the mode are dropped
      setPermission(new FsPermission((short) (mode & 01777)));
      setOwner(owner);
      setGroup(group);
      nioLoaded = true;
    }
  }
}
