import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Apache Hudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apache Hudi is the open-source agentic data lakehouse. It adds database behavior to files in cloud object storage (transactions, updates and deletes, indexes, schema evolution, and automated table services) and extends the same tables for AI with unstructured data, vector and text search, an agent gateway, and an AI CLI.",
      },
    },
    {
      "@type": "Question",
      name: "What is an agentic data lakehouse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agentic data lakehouse is a lakehouse that AI agents can both query and operate. In Hudi, agents get catalog-aware, cost-guarded SQL and incremental queries through an agent gateway over MCP, and an AI CLI inspects, tunes, maintains, and diagnoses tables.",
      },
    },
    {
      "@type": "Question",
      name: "Can I run vector and text search on my data lake with Hudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Hudi stores vector and text indexes in its metadata table, next to the data and governed by the same permissions, so no separate vector database or search cluster is needed.",
      },
    },
    {
      "@type": "Question",
      name: "Does Hudi handle unstructured data like documents, images, and audio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Native VECTOR, BLOB, and VARIANT columns keep files and embeddings alongside structured rows, Hudi Streamer ingests unstructured files incrementally as they arrive, and embeddings are refreshed only for records that changed.",
      },
    },
    {
      "@type": "Question",
      name: "Is the whole Hudi stack open source, and can I run it myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Storage, indexes, query engine, and agent gateway are all Apache-licensed, and the hudi-lakehouse Helm charts deploy the full stack on any Kubernetes cluster in your own account.",
      },
    },
  ],
};
import Landing from "@site/src/components/Landing";

export default function Home() {
  return (
    <Layout
      title="Apache Hudi™ | The Open-Source Agentic Data Lakehouse"
      shouldShowOnlyTitle={true}
      description="Apache Hudi is the open-source agentic data lakehouse: database behavior on open storage, extended for AI with unstructured data, vector and text search, an agent gateway, an AI CLI, and a full stack you run on Kubernetes."
    >
      <Head>
        <title>Apache Hudi™ | The Open-Source Agentic Data Lakehouse</title>
        <meta property="og:title" content="Apache Hudi™ | The Open-Source Agentic Data Lakehouse" />
        <script type="application/ld+json">{JSON.stringify(FAQ_LD)}</script>
      </Head>
      <main>
        <Landing />
      </main>
    </Layout>
  );
}
