import { originalSlackUrl } from "@site/constants";
import KafkaIcon from "@site/src/components/Integrations/Icons/kafka-sq.png";
import PulsarIcon from "@site/src/components/Integrations/Icons/pulsar.png";
import PostgresIcon from "@site/src/components/Integrations/Icons/postgres-sq.png";
import MySqlIcon from "@site/src/components/Integrations/Icons/mysql-sq.png";
import ParquetIcon from "@site/src/components/Integrations/Icons/parquet-sq.png";
import AvroIcon from "@site/src/components/Integrations/Icons/avro-sq.png";
import OrcIcon from "@site/src/components/Integrations/Icons/orc-sq.png";
import HadoopIcon from "@site/src/components/Integrations/Icons/hadoop-sq.png";
import S3Icon from "@site/src/components/Integrations/Icons/s3-sq.png";
import DebeziumIcon from "@site/src/components/Integrations/Icons/debezium-sq.png";
import FlinkIcon from "@site/src/components/Integrations/Icons/flink-sq.png";
import HiveIcon from "@site/src/components/Integrations/Icons/hive-sq.png";
import HudiIcon from "@site/src/components/Integrations/Icons/hudi-sq.png";
import GlueIcon from "@site/src/components/Integrations/Icons/glue-sq.png";
import BigQueryIcon from "@site/src/components/Integrations/Icons/bigquery-sq.png";
import DatabricksIcon from "@site/src/components/Integrations/Icons/databricks-sq.png";
import DatahubIcon from "@site/src/components/Integrations/Icons/datahub-sq.png";
import XTableIcon from "@site/src/components/Integrations/Icons/xtable.png";
import SparkIcon from "@site/src/components/Integrations/Icons/spark-sq.png";
import TrinoIcon from "@site/src/components/Integrations/Icons/trino-sq.png";
import PrestoIcon from "@site/src/components/Integrations/Icons/presto.png";
import AthenaIcon from "@site/src/components/Integrations/Icons/athena-sq.png";
import StarRocksIcon from "@site/src/components/Integrations/Icons/starrocks-sq.png";
import DorisIcon from "@site/src/components/Integrations/Icons/doris-sq.png";
import RayIcon from "@site/src/components/Integrations/Icons/ray-sq.png";
import DaftIcon from "@site/src/components/Integrations/Icons/daft-sq.png";
import RedshiftIcon from "@site/src/components/Integrations/Icons/redshift-sq.png";
import ClickHouseIcon from "@site/src/components/Integrations/Icons/clickhouse-sq.png";

export const LAYERS = [
  {
    id: "layer-1",
    short: "L1",
    name: "The lakehouse foundation",
    hero: "Open formats, catalogs, engines, ACID transactions, indexes and table services.",
    card: "Open file and table formats, catalogs, ingestion, query engines, and database behavior on top.",
  },
  {
    id: "layer-2",
    short: "L2",
    name: "AI-native storage",
    hero: "Vectors, blobs, variants, and text indexes in the same tables as your rows.",
    card: "One table for structured and unstructured data, and the path from raw files to search.",
  },
  {
    id: "layer-3",
    short: "L3",
    name: "Agentic features",
    hero: "An agent gateway that serves governed context, and an AI CLI that operates the lakehouse.",
    card: "Agents query the lakehouse through a gateway, and help run it from the command line.",
  },
  {
    id: "layer-4",
    short: "L4",
    name: "The full stack",
    hero: "One Helm install: storage, catalog, query engine, gateway, and tooling.",
    card: "Helm charts that bring up the whole lakehouse on any Kubernetes cluster.",
  },
];

export const ADOPTERS = [
  { name: "Uber", logo: "/assets/images/powers/uber.png" },
  { name: "Amazon", logo: "/assets/images/powers/amazon.png" },
  { name: "ByteDance", logo: "/assets/images/powers/bytedance.png" },
  { name: "Walmart", logo: "/assets/images/powers/walmart.png" },
  { name: "Robinhood", logo: "/assets/images/powers/robinhood.png" },
  { name: "Zendesk", logo: "/assets/images/powers/zendesk.png" },
  { name: "GE Aviation", logo: "/assets/images/powers/GE_aviation.png" },
  { name: "Disney+ Hotstar", logo: "/assets/images/powers/disney_hotstar.png" },
  { name: "Alibaba", logo: "/assets/images/powers/alibaba.png" },
  { name: "Huawei", logo: "/assets/images/powers/huawei.png" },
  { name: "Bilibili", logo: "/assets/images/powers/bilibili.png" },
  { name: "Udemy", logo: "/assets/images/powers/udemy.png" },
];

export const ECOSYSTEM = [
  {
    title: "File formats",
    items: [
      { name: "Parquet", icon: ParquetIcon },
      { name: "ORC", icon: OrcIcon },
      { name: "Avro", icon: AvroIcon },
      { name: "HFile", icon: HadoopIcon },
      { name: "Lance", text: "LANCE" },
      { name: "Vortex", text: "VTX" },
    ],
  },
  {
    title: "Table formats",
    items: [
      { name: "Hudi native", icon: HudiIcon },
      { name: "Apache Iceberg", text: "ICE" },
      { name: "Hive-style", icon: HiveIcon },
    ],
  },
  {
    title: "Ingestion",
    items: [
      { name: "Kafka", icon: KafkaIcon },
      { name: "Pulsar", icon: PulsarIcon },
      { name: "Debezium", icon: DebeziumIcon },
      { name: "Flink CDC", icon: FlinkIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
      { name: "MySQL", icon: MySqlIcon },
      { name: "Cloud storage", icon: S3Icon },
    ],
  },
  {
    title: "Catalogs",
    items: [
      { name: "Hive Metastore", icon: HiveIcon },
      { name: "AWS Glue", icon: GlueIcon },
      { name: "BigQuery", icon: BigQueryIcon },
      { name: "Unity Catalog", icon: DatabricksIcon },
      { name: "DataHub", icon: DatahubIcon },
      { name: "Apache Polaris", text: "POL" },
      { name: "Apache XTable", icon: XTableIcon },
    ],
  },
  {
    title: "Engines",
    wide: true,
    items: [
      { name: "Spark", icon: SparkIcon },
      { name: "Flink", icon: FlinkIcon },
      { name: "Trino", icon: TrinoIcon },
      { name: "Presto", icon: PrestoIcon },
      { name: "Athena", icon: AthenaIcon },
      { name: "BigQuery", icon: BigQueryIcon },
      { name: "StarRocks", icon: StarRocksIcon },
      { name: "Doris", icon: DorisIcon },
      { name: "Ray", icon: RayIcon },
      { name: "Daft", icon: DaftIcon },
      { name: "Redshift", icon: RedshiftIcon },
      { name: "ClickHouse", icon: ClickHouseIcon },
    ],
  },
];

export const DATABASE_FEATURES = [
  {
    icon: "trend",
    title: "Incremental processing",
    body: "Read only the records that changed since your last run. Incremental and CDC queries turn hourly batch rewrites into minutes of work.",
    to: "/docs/use_cases",
  },
  {
    icon: "edit",
    title: "Updates and deletes",
    body: "Upserts, deletes, late and out-of-order records, deduplication and schema evolution, backed by pluggable indexes.",
    to: "/docs/write_operations",
  },
  {
    icon: "lock",
    title: "ACID and concurrency",
    body: "Atomic commits, snapshot isolation, and non-blocking concurrency control built for long-running lake transactions.",
    to: "/docs/concurrency_control",
  },
  {
    icon: "layers",
    title: "Multi-modal indexes",
    body: "Record-level, secondary, bloom, and expression indexes keep writes fast on huge tables and make point lookups cheap.",
    to: "/docs/indexes",
  },
  {
    icon: "gear",
    title: "Table services",
    body: "Compaction, clustering, cleaning, and file sizing are scheduled and run for you, inline or asynchronously.",
    to: "/docs/compaction",
  },
  {
    icon: "history",
    title: "Time travel",
    body: "Query any earlier version of a table, roll back a bad write, and audit every change through the commit timeline.",
    to: "/docs/timeline",
  },
];

export const AI_PIPELINE = [
  {
    icon: "database",
    title: "Store anything",
    body: "Native VECTOR, BLOB, and VARIANT columns keep documents, images, audio, and embeddings next to structured data.",
  },
  {
    icon: "fileUp",
    title: "Ingest unstructured files",
    body: "Hudi Streamer lands PDFs, images, and audio as rows, incrementally, as they arrive in object storage.",
  },
  {
    icon: "network",
    title: "Keep embeddings fresh",
    body: "Embeddings are generated on ingest and recomputed only for the records that changed.",
  },
  {
    icon: "search",
    title: "Search in place",
    body: "Vector and text indexes live in the metadata table and inherit the table's permissions. No separate search cluster.",
  },
];

export const STACK_FEATURES = [
  {
    icon: "server",
    title: "Query engine included",
    body: "Spark SQL ships with the stack, so there's no separate engine to stand up.",
  },
  {
    icon: "bolt",
    title: "Native acceleration",
    body: "DataFusion-based native execution for faster queries, still fully open source.",
  },
  {
    icon: "box",
    title: "Native Spark bundle",
    body: "A Spark bundle tuned for Hudi, so jobs run fast without a proprietary runtime.",
  },
];

export const WHY_HUDI = [
  {
    icon: "chart",
    title: "Proven at scale",
    body: "Runs some of the largest data lakes in the world at Uber, Walmart, ByteDance, Amazon, Robinhood, Zendesk, and GE Aviation.",
  },
  {
    icon: "flow",
    title: "Open source, AI layer included",
    body: "Storage, indexes, engine, and gateway are all Apache-licensed. Run them anywhere, in your own account.",
  },
  {
    icon: "refresh",
    title: "Built for change and freshness",
    body: "Incremental processing, merge-on-read, and CDC ingestion keep tables fresh without rewriting them.",
  },
  {
    icon: "bot",
    title: "Built for agents",
    body: "A gateway that serves agents governed context, and a CLI that lets agents help operate the lakehouse.",
  },
];

export const FIRSTS = [
  { year: "2017", title: "Transactional updates on the lake" },
  { year: "2017", title: "Merge-on-read tables" },
  { year: "2017", title: "Incremental queries" },
  { year: "2022", title: "Multi-modal indexing" },
  { year: "2023", title: "Record-level index" },
  { year: "2024", title: "Non-blocking concurrency control" },
];

export const COMMUNITY_LINKS = [
  { label: "Slack", href: originalSlackUrl },
  { label: "GitHub", href: "https://github.com/apache/hudi" },
  { label: "Mailing list", href: "mailto:dev-subscribe@hudi.apache.org?Subject=SubscribeToHudi" },
  { label: "YouTube", href: "https://www.youtube.com/@apachehudi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/apache-hudi/" },
  { label: "X", href: "https://x.com/ApacheHudi" },
];
