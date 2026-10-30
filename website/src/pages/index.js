import React from "react";
import Layout from "@theme/Layout";
import Landing from "@site/src/components/Landing";

export default function Home() {
  return (
    <Layout
      title="Apache Hudi | The Open-Source Agentic Data Lakehouse"
      shouldShowOnlyTitle={true}
      description="Apache Hudi brings database behavior to open data lake storage and extends it for AI: unstructured data, vector and text search, an agent gateway, and a Kubernetes-native full stack."
    >
      <main>
        <Landing />
      </main>
    </Layout>
  );
}
