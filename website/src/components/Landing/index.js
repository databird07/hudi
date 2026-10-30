import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import useBaseUrl, { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
import { originalSlackUrl } from "@site/constants";

import Icon from "./Icons";
import { LayerGlyph } from "./LayerStack";
import {
  LAYERS,
  ADOPTERS,
  ECOSYSTEM,
  DATABASE_FEATURES,
  AI_PIPELINE,
  STACK_FEATURES,
  WHY_HUDI,
  FIRSTS,
  COMMUNITY_LINKS,
} from "./data";
import styles from "./styles.module.css";

function Eyebrow({ children, className }) {
  return <div className={clsx(styles.eyebrow, className)}>[ {children} ]</div>;
}

function Button({ to, href, children, variant = "dark" }) {
  return (
    <Link to={to} href={href} className={clsx(styles.button, styles[`button_${variant}`])}>
      <span className={styles.buttonLabel}>{children}</span>
      <span className={styles.buttonChevron}>
        <Icon name="chevronRight" size={16} />
      </span>
    </Link>
  );
}

function TextLink({ to, href, children, down = false, className }) {
  return (
    <Link to={to} href={href} className={clsx(styles.textLink, className)}>
      {children} <Icon name={down ? "arrowDown" : "arrowRight"} size={14} strokeWidth={2} />
    </Link>
  );
}

function IconBox({ name, dark = false }) {
  return (
    <span className={clsx(styles.iconBox, dark && styles.iconBoxDark)}>
      <Icon name={name} size={18} />
    </span>
  );
}

function LayerHeader({ layer, index, title, lead, dark = false }) {
  return (
    <div className={styles.layerHeader}>
      <div className={clsx(styles.layerEyebrow, dark && styles.layerEyebrowDark)}>
        <LayerGlyph active={index} />
        <span>
          [ Layer {index + 1} — {layer.name} ]
        </span>
      </div>
      <h2 className={styles.h2}>{title}</h2>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroBrand}>
          <img src={useBaseUrl("/assets/images/home/mark-layered.svg")} alt="" width={32} height={32} />
          <span>Apache Hudi™</span>
        </div>
        <h1 className={styles.heroTitle}>
          The open-source <span className={styles.accent}>agentic</span>
          <br />
          data lakehouse
        </h1>
        <p className={styles.heroLead}>
          The open lakehouse platform, extended for AI. Database behavior on open storage, plus unstructured data,
          vector and text search, an agent gateway, and an AI CLI. Apache-licensed, end to end, and it runs in your own
          account.
        </p>
        <div className={styles.buttonRow}>
          <Button to="/docs/quick-start-guide">Quick Start</Button>
          <Button to="#layer-4" variant="light">
            Deploy on Kubernetes
          </Button>
        </div>
      </div>
      <div className={styles.heroStage}>
        <div className={clsx("container", styles.heroStageInner)}>
          <img
            src={useBaseUrl("/assets/images/home/layer-stack.webp")}
            alt="Four stacked layers: the lakehouse foundation, AI-native storage, agentic features, and the full stack"
            className={styles.heroStack}
            width={700}
            height={609}
          />
          <div className={styles.heroCallouts}>
            <div className={styles.calloutsEyebrow}>[ Four layers · read from L1 up ]</div>
            {[...LAYERS].reverse().map((layer) => (
              <a key={layer.id} href={`#${layer.id}`} className={styles.callout}>
                <span className={styles.calloutTick} />
                <span className={clsx(styles.badge, styles[`badge_${layer.short}`])}>{layer.short}</span>
                <span>
                  <span className={styles.calloutTitle}>{layer.name}</span>
                  <span className={styles.calloutBody}>{layer.hero}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Adopters() {
  const { withBaseUrl } = useBaseUrlUtils();
  const logos = [...ADOPTERS, ...ADOPTERS];
  return (
    <section className={styles.adopters}>
      <div className={clsx("container", styles.adoptersHead)}>
        <span className={styles.monoLabel}>In production at scale</span>
        <TextLink to="/powered-by">See all adopters</TextLink>
      </div>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {logos.map((a, i) => (
            <img
              key={i}
              src={withBaseUrl(a.logo)}
              alt={i < ADOPTERS.length ? a.name : ""}
              aria-hidden={i >= ADOPTERS.length}
              className={styles.adopterLogo}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsHudi() {
  const facts = [
    {
      icon: "calendar",
      title: "Since 2016",
      body: "In production at some of the largest data lakes in the world.",
    },
    {
      icon: "shield",
      title: "Apache-licensed, end to end",
      body: "Storage, indexes, engine, and gateway are all open source. No proprietary tier.",
    },
    {
      icon: "cloud",
      title: "Runs where your data runs",
      body: "Any cloud object store, your own account, your own Kubernetes cluster.",
    },
  ];
  return (
    <section className={styles.section}>
      <div className="container">
        <Eyebrow>What is Hudi</Eyebrow>
        <h2 className={clsx(styles.h2, styles.narrow)}>Database behavior for data that lives in open storage</h2>
        <div className={styles.whatGrid}>
          <div className={styles.whatCopy}>
            <p>
              <strong>
                A data lake is just open files, usually Parquet, in cloud object storage. On its own it has no
                transactions, no updates, and no indexes.
              </strong>{" "}
              Hudi adds them: ACID commits, upserts and deletes, record-level indexes, schema evolution, time travel,
              and table services that keep everything tuned.
            </p>
            <p>
              Its core idea is incremental processing: work only on what changed instead of rewriting whole tables. The
              same storage, ingestion, and indexing layers now serve AI workloads too, including embeddings, document
              search, agent context, and fine-tuning data, without copying data out of the lake.
            </p>
            <TextLink to="/docs/overview">Read the docs</TextLink>
          </div>
          <ul className={styles.factList}>
            {facts.map((f) => (
              <li key={f.title} className={styles.fact}>
                <IconBox name={f.icon} />
                <div>
                  <div className={styles.factTitle}>{f.title}</div>
                  <div className={styles.factBody}>{f.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LayersOverview() {
  return (
    <section className={clsx(styles.section, styles.sectionTint)}>
      <div className="container">
        <div className={styles.centerHead}>
          <Eyebrow>How it fits together</Eyebrow>
          <h2 className={styles.h2}>One project, four layers</h2>
          <p className={styles.lead}>
            Each layer builds on the one below it, and nothing below is given up. Jump to any layer.
          </p>
        </div>
        <div className={styles.layerCards}>
          {LAYERS.map((layer, i) => (
            <a
              key={layer.id}
              href={`#${layer.id}`}
              className={clsx(styles.layerCard, styles[`layerCard_${layer.short}`])}
            >
              <div className={styles.layerCardTop}>
                <span className={clsx(styles.pill, styles[`badge_${layer.short}`])}>Layer {i + 1}</span>
                <LayerGlyph active={i} size={32} />
              </div>
              <h3 className={styles.h3}>{layer.name}</h3>
              <p className={styles.cardBody}>{layer.card}</p>
              <span className={styles.textLink}>
                Jump to Layer {i + 1} <Icon name="arrowDown" size={14} strokeWidth={2} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function useLayerProgress() {
  const [state, setState] = useState({ active: -1, progress: [0, 0, 0, 0] });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = 160;
      const progress = LAYERS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const p = (offset - r.top) / r.height;
        return Math.max(0, Math.min(1, p));
      });
      let active = -1;
      progress.forEach((p, i) => {
        if (p > 0) active = i;
      });
      if (progress[3] >= 1) active = -1;
      setState({ active, progress });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return state;
}

function LayerTabs() {
  const { active, progress } = useLayerProgress();
  return (
    <nav className={styles.layerTabs} aria-label="Layers">
      <div className={clsx("container", styles.layerTabsInner)}>
        {LAYERS.map((layer, i) => (
          <a
            key={layer.id}
            href={`#${layer.id}`}
            className={clsx(styles.layerTab, i === active && styles.layerTabActive)}
          >
            <span className={styles.layerTabLabel}>
              <span className={clsx(styles.badge, styles[`badge_${layer.short}`])}>{layer.short}</span>
              {layer.name}
            </span>
            <span className={styles.layerTabTrack}>
              <span
                className={clsx(styles.layerTabFill, styles[`fill_${layer.short}`])}
                style={{ transform: `scaleX(${progress[i]})` }}
              />
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function FoundationLayer() {
  return (
    <section id="layer-1" className={clsx(styles.layer, styles.layerDark)}>
      <div className="container">
        <LayerHeader
          dark
          layer={LAYERS[0]}
          index={0}
          title="The open lakehouse platform"
          lead="More than a table format. Hudi works with the file formats, table formats, and catalogs you already use, ingests from streams, databases, and CDC, and is queryable from the engines your teams already run. Pick per table."
        />
        <div className={styles.ecoGrid}>
          {ECOSYSTEM.map((group) => (
            <div key={group.title} className={clsx(styles.ecoGroup, group.wide && styles.ecoGroupWide)}>
              <div className={styles.ecoTitle}>{group.title}</div>
              <div className={styles.ecoItems}>
                {group.items.map((item) => (
                  <div key={item.name} className={styles.ecoItem}>
                    <span className={styles.ecoTile}>
                      {item.icon ? <img src={item.icon} alt="" loading="lazy" /> : <span>{item.text}</span>}
                    </span>
                    <span className={styles.ecoName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.subHead}>
          <span className={styles.monoLabel}>Database behavior, in detail</span>
          <TextLink to="/docs/overview" className={styles.textLinkLight}>
            Browse the documentation
          </TextLink>
        </div>
        <div className={styles.featureGridDark}>
          {DATABASE_FEATURES.map((f) => (
            <div key={f.title} className={styles.featureDark}>
              <IconBox name={f.icon} dark />
              <h3 className={styles.h3}>{f.title}</h3>
              <p>{f.body}</p>
              <TextLink to={f.to} className={styles.textLinkLight}>
                Docs
              </TextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TABLE_ROWS = [
  { id: "001", kind: "doc", cells: [3, 2, 1, 0, 3, 2, 3, 1, 2, 3, 1, 2] },
  { id: "002", kind: "image", cells: [1, 3, 2, 3, 0, 2, 3, 1, 2, 1, 3, 2] },
  { id: "003", kind: "audio", cells: [2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 3, 1] },
];

function HudiTableMock() {
  return (
    <div className={styles.tableMock}>
      <div className={styles.tableMockHead}>
        <span className={styles.tableMockName}>
          <Icon name="table" size={16} /> hudi_table
        </span>
        <span className={styles.tableMockMeta}>
          <span>metadata table</span>
          <span className={styles.chipStrong}>vector index</span>
          <span className={styles.chipSoft}>text index</span>
        </span>
      </div>
      <div className={styles.tableMockScroll}>
        <table>
          <thead>
            <tr>
              <th>
                record <em>rows</em>
              </th>
              <th>
                columns <em>structured</em>
              </th>
              <th>
                embedding <em>vector</em>
              </th>
              <th>
                object <em>blob</em>
              </th>
              <th>
                attributes <em>variant</em>
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row) => (
              <tr key={row.id}>
                <td className={styles.mono}>{row.id}</td>
                <td>
                  <span className={styles.bars}>
                    <i style={{ width: 64 }} />
                    <i style={{ width: 40 }} />
                    <i style={{ width: 26 }} />
                  </span>
                </td>
                <td>
                  <span className={styles.vector}>
                    {row.cells.map((c, k) => (
                      <i key={k} className={styles[`v${c}`]} />
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.blob}>
                    <Icon name={row.kind} size={14} />
                    <i />
                  </span>
                </td>
                <td>
                  <span className={styles.variant}>
                    {"{"} <i style={{ width: 30 }} /> <i style={{ width: 40 }} /> {"}"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AiStorageLayer() {
  return (
    <section id="layer-2" className={styles.layer}>
      <div className="container">
        <LayerHeader
          layer={LAYERS[1]}
          index={1}
          title="Every shape of data, in the same tables"
          lead="Documents, images, audio, and embeddings sit next to your rows. Vector and text indexes live in Hudi's metadata table, governed by the same permissions as the data."
        />
        <HudiTableMock />
        <div className={styles.subHeadLight}>
          <h3 className={styles.h3Large}>From ingestion to search</h3>
          <TextLink to="/docs/unstructured-data-quick-start-guide">Try the unstructured data quick start</TextLink>
        </div>
        <div className={styles.steps}>
          {AI_PIPELINE.map((s) => (
            <div key={s.title} className={styles.step}>
              <IconBox name={s.icon} />
              <h3 className={styles.h3}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GATEWAY_TRACE = [
  ["agent", "→", '"Which regions had late shipments this week?"', ["agent"]],
  ["mcp", "→", "tool call to the agent gateway", ["mcp"]],
  ["gateway", "→", "catalog ok, cost guard ok", ["gateway"]],
  ["gateway", "→", "rewritten as an incremental query", ["gateway", "model"]],
  ["hudi", "→", "reads only the changed records", ["tables"]],
  ["gateway", "→", "shaped result", ["gateway"]],
  ["agent", "←", "context returned; only prompts and shaped results crossed the boundary", ["agent", "context"]],
];

function useGatewayStep() {
  const [step, setStep] = useState(-1);
  const ref = React.useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting) {
          setStep(0);
          timer = setInterval(() => setStep((s) => (s + 1) % (GATEWAY_TRACE.length + 1)), 1500);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);
  return [ref, step];
}

function GatewayDiagram() {
  const [ref, step] = useGatewayStep();
  const animating = step >= 0 && step < GATEWAY_TRACE.length;
  const lit = animating ? GATEWAY_TRACE[step][3] : null;
  const part = (key) => clsx(styles.gwStep, lit && (lit.includes(key) ? styles.gwOn : styles.gwDim));
  return (
    <div className={styles.diagram} ref={ref}>
      <svg
        viewBox="0 0 560 230"
        className={styles.diagramSvg}
        role="img"
        aria-label="An AI agent calls the Hudi agent gateway over MCP inside your VPC"
      >
        <defs>
          <pattern id="gwGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#D6E3F2" strokeWidth="0.6" />
          </pattern>
          <marker id="gwArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 8 4 0 8Z" fill="#1668C4" />
          </marker>
        </defs>
        <g className={part("context")}>
          <path d="M60 92V20H330V52" fill="none" stroke="#9DBEE3" strokeDasharray="3 3" markerEnd="url(#gwArrow)" />
          <text x="72" y="16" className={styles.svgMono}>
            ← context
          </text>
        </g>
        <rect
          x="200"
          y="44"
          width="350"
          height="140"
          rx="6"
          fill="url(#gwGrid)"
          stroke="#9FD1F5"
          strokeDasharray="4 3"
        />
        <text x="212" y="62" className={styles.svgMono}>
          [ your vpc ]
        </text>
        <g className={part("agent")}>
          <circle cx="60" cy="118" r="32" fill="#5B6777" />
          <rect x="46" y="106" width="28" height="22" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="55" cy="117" r="2" fill="#FFFFFF" />
          <circle cx="65" cy="117" r="2" fill="#FFFFFF" />
          <path d="M60 100v6" stroke="#FFFFFF" strokeWidth="2" />
          <text x="60" y="170" textAnchor="middle" className={styles.svgLabel}>
            Any AI agent
          </text>
        </g>
        <g className={part("mcp")}>
          <path d="M93 118H228" stroke="#1668C4" strokeWidth="1.5" markerEnd="url(#gwArrow)" />
          <rect x="104" y="106" width="108" height="24" rx="12" fill="#FFFFFF" stroke="#1668C4" strokeWidth="1.5" />
          <text x="158" y="122" textAnchor="middle" className={styles.svgMonoStrong}>
            MCP · tool call
          </text>
        </g>
        <g className={part("gateway")}>
          <rect x="232" y="80" width="150" height="76" rx="6" fill="#4A93E6" />
          <text x="246" y="106" className={styles.svgTitle}>
            Agent gateway
          </text>
          <rect x="246" y="122" width="58" height="18" rx="3" fill="#FFFFFF" fillOpacity="0.25" />
          <text x="275" y="135" textAnchor="middle" className={styles.svgChip}>
            ✓ catalog
          </text>
          <rect x="310" y="122" width="64" height="18" rx="3" fill="#FFFFFF" fillOpacity="0.25" />
          <text x="342" y="135" textAnchor="middle" className={styles.svgChip}>
            ✓ cost guard
          </text>
        </g>
        <g className={part("tables")}>
          <path d="M382 118H404" stroke="#1668C4" strokeWidth="1.5" markerEnd="url(#gwArrow)" />
          <rect x="408" y="70" width="130" height="96" rx="5" fill="#FFFFFF" stroke="#D6E3F2" />
          <rect x="408" y="70" width="130" height="20" rx="5" fill="#8AA4C2" />
          <text x="418" y="84" className={styles.svgChip}>
            HUDI TABLES
          </text>
          <rect x="418" y="100" width="50" height="5" rx="2.5" fill="#9CC8F2" />
          <rect x="474" y="100" width="40" height="5" rx="2.5" fill="#9CC8F2" />
          <rect x="418" y="114" width="70" height="5" rx="2.5" fill="#D6E3F2" />
          <rect x="418" y="128" width="40" height="5" rx="2.5" fill="#9CC8F2" />
          <rect x="464" y="128" width="54" height="5" rx="2.5" fill="#9CC8F2" />
          <text x="418" y="154" className={styles.svgLabelSmall}>
            Incremental queries
          </text>
        </g>
        <g className={part("model")}>
          <path d="M307 156V196" stroke="#9DBEE3" strokeDasharray="3 3" />
          <rect x="250" y="190" width="114" height="20" rx="10" fill="#FFFFFF" stroke="#9DBEE3" />
          <text x="307" y="204" textAnchor="middle" className={styles.svgMono}>
            configured model
          </text>
          <text x="307" y="226" textAnchor="middle" className={styles.svgLabelSmall}>
            self-hosted or hosted endpoint
          </text>
        </g>
      </svg>
      <div className={styles.trace} aria-live="off">
        {GATEWAY_TRACE.map(([who, dir, text], i) => (
          <div
            key={i}
            className={clsx(
              animating && i > step && styles.traceIdle,
              animating && i === step && styles.traceNow,
              i === GATEWAY_TRACE.length - 1 && styles.traceStrong
            )}
          >
            <span>{who}</span> {dir} {text}
          </div>
        ))}
      </div>
    </div>
  );
}

function CliMock() {
  const lines = [
    ["›", "inspect", "orders: 3,412 file groups, 38% under 32 MB"],
    ["›", "diagnose", "small files from 5-minute streaming commits"],
    ["›", "tune", "enable clustering, target file size 128 MB"],
    ["?", "apply", "schedule clustering on orders? [y/N] y"],
    ["✓", "run", "clustering done: 3,412 → 486 file groups"],
  ];
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <i />
        <i />
        <i />
        <span>hudi ai — illustrative session</span>
      </div>
      <div className={styles.terminalBody}>
        <div>
          <span className={styles.prompt}>$</span> hudi ai{" "}
          <span className={styles.dim}>"why are queries on orders slow?"</span>
        </div>
        {lines.map(([mark, cmd, out]) => (
          <div key={cmd} className={styles.terminalLine}>
            <span className={mark === "✓" ? styles.ok : styles.dim}>{mark}</span>
            <span className={styles.cmd}>{cmd}</span>
            <span className={styles.dim}>{out}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgenticLayer() {
  return (
    <section id="layer-3" className={clsx(styles.layer, styles.sectionTint)}>
      <div className="container">
        <LayerHeader
          layer={LAYERS[2]}
          index={2}
          title="Agents in both directions"
          lead="Hudi serves agents, and agents help operate Hudi."
        />
        <div className={styles.agentCard}>
          <div className={styles.agentCopy}>
            <IconBox name="network" />
            <div className={styles.agentKicker}>Hudi serves agents</div>
            <h3 className={styles.h3Large}>Agent gateway</h3>
            <p className={styles.cardBody}>
              Serves context to agents over MCP: catalog-aware, cost-guarded SQL and incremental queries. Inference
              calls go to the model you configure, self-hosted or a hosted endpoint. The gateway runs inside your VPC,
              so only prompts and shaped results ever cross the boundary.
            </p>
            <TextLink to="/docs/overview">Read the docs</TextLink>
          </div>
          <GatewayDiagram />
        </div>
        <div className={styles.agentCard}>
          <div className={styles.agentCopy}>
            <IconBox name="terminal" />
            <div className={styles.agentKicker}>Agents operate Hudi</div>
            <h3 className={styles.h3Large}>AI CLI with agentic skills</h3>
            <p className={styles.cardBody}>
              An assistant that runs and tunes the lakehouse from the command line. It inspects tables, finds the cause
              of slow queries, proposes layout changes, and runs maintenance after you confirm.
            </p>
            <TextLink to="/docs/cli">Read the docs</TextLink>
          </div>
          <div>
            <CliMock />
            <p className={styles.footnote}>Illustrative session. Commands and output are examples.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullStackLayer() {
  return (
    <section id="layer-4" className={styles.layer}>
      <div className="container">
        <LayerHeader layer={LAYERS[3]} index={3} title="One install on Kubernetes" lead="" />
        <div className={styles.stackGrid}>
          <div>
            <p className={styles.leadLarge}>
              Hudi is no longer a library you assemble a platform around. The hudi-lakehouse Helm charts bring up
              storage, a catalog, a SQL query engine, the agent gateway, and operational tooling together, on any
              Kubernetes cluster in your own account.
            </p>
            <div className={styles.buttonRowLeft}>
              <Button to="/docs/deployment">Deploy on Kubernetes</Button>
              <Button to="/docs/quick-start-guide" variant="light">
                Quick Start
              </Button>
            </div>
          </div>
          <div className={styles.k8sCard}>
            <div className={styles.k8sHead}>
              <span className={styles.k8sBrand}>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1.8 21 6.1l2.2 9.8-6.2 7.8H7L.8 15.9 3 6.1 12 1.8Z" fill="#326CE5" />
                  <circle cx="12" cy="12.5" r="4.2" fill="none" stroke="#FFFFFF" strokeWidth="1.4" />
                  <path
                    d="M12 5.5v4M12 15.5v4M5.4 10.3l3.8 1.2M14.8 13.5l3.8 1.2M7.6 18l2.4-3.2M14 10.2l2.4-3.2M16.4 18 14 14.8M10 10.2 7.6 7"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                </svg>
                kubernetes
              </span>
              <span className={styles.chipSoft}>helm chart</span>
            </div>
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <i />
                <i />
                <i />
                <span>terminal</span>
              </div>
              <div className={styles.terminalBody}>
                <div>
                  <span className={styles.prompt}>$</span> helm install hudi-lakehouse{" "}
                  <span className={styles.dim}>&lt;chart-repo&gt;/hudi-lakehouse</span>
                </div>
                <div className={styles.dim}># chart repository to be published</div>
                <div className={styles.ok}>› storage · catalog · query engine · agent gateway · tooling</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stackFeatures}>
          {STACK_FEATURES.map((f) => (
            <div key={f.title} className={styles.stackFeature}>
              <IconBox name={f.icon} />
              <div>
                <div className={styles.factTitle}>{f.title}</div>
                <div className={styles.factBody}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyHudi() {
  return (
    <section className={clsx(styles.section, styles.sectionTint)}>
      <div className="container">
        <div className={styles.centerHead}>
          <Eyebrow>Why Hudi</Eyebrow>
          <h2 className={styles.h2}>Proven at scale, open end to end</h2>
        </div>
        <div className={styles.steps}>
          {WHY_HUDI.map((f) => (
            <div key={f.title} className={styles.step}>
              <IconBox name={f.icon} />
              <h3 className={styles.h3}>{f.title}</h3>
              <p className={styles.cardBody}>{f.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.firsts}>
          <div className={styles.monoLabelLight}>Firsts in the category</div>
          <p className={styles.firstsLead}>
            Hudi pioneered the transactional data lake. Today it comes pre-installed on AWS EMR and AWS Glue, and is
            supported on every major cloud.
          </p>
          <ol className={styles.timeline}>
            {FIRSTS.map((f, i) => (
              <li key={i} className={clsx(i === FIRSTS.length - 1 && styles.timelineLast)}>
                <span className={styles.timelineDot} />
                <span className={styles.timelineYear}>{f.year}</span>
                <span className={styles.timelineTitle}>{f.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const allPosts = ((ctx) =>
  ctx.keys().map((key) => {
    const m = ctx(key);
    return { frontMatter: { ...m.frontMatter }, metadata: { ...m.metadata }, assets: { ...m.assets } };
  }))(require.context("../../../blog", true, /\.mdx?$/));

const latestPosts = allPosts
  .filter((p) => p.metadata.date)
  .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
  .slice(0, 3);

function PostMeta({ post }) {
  const fmt = useDateTimeFormat({ day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const authors = (post.metadata.authors || []).map((a) => a.name).filter(Boolean);
  const author = authors.length ? authors.join(", ") : post.frontMatter.author;
  return (
    <div className={styles.postMeta}>
      {author ? `${author} · ` : ""}
      {fmt.format(new Date(post.metadata.date))}
    </div>
  );
}

function PostImage({ post, className }) {
  const src = useBaseUrl(post.assets.image ?? post.frontMatter.image ?? "/assets/images/hudi.png");
  return (
    <span className={clsx(styles.postImage, className)}>
      <img src={src} alt="" loading="lazy" />
    </span>
  );
}

function FromTheBlog() {
  const [featured, ...rest] = latestPosts;
  return (
    <section className={styles.section}>
      <div className="container">
        <Eyebrow>From the blog</Eyebrow>
        <div className={styles.blogHead}>
          <h2 className={styles.h2}>What the Hudi community is writing</h2>
          <TextLink to="/blog">View all posts</TextLink>
        </div>
        <div className={styles.blogGrid}>
          {featured && (
            <Link to={featured.metadata.permalink} className={styles.postFeatured}>
              <PostImage post={featured} className={styles.postImageLarge} />
              <h3 className={styles.postTitle}>{featured.metadata.title}</h3>
              <PostMeta post={featured} />
            </Link>
          )}
          <div className={styles.postList}>
            {rest.map((post) => (
              <Link key={post.metadata.permalink} to={post.metadata.permalink} className={styles.postRow}>
                <PostImage post={post} className={styles.postImageSmall} />
                <span>
                  <h3 className={styles.postTitle}>{post.metadata.title}</h3>
                  <PostMeta post={post} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className={styles.community}>
      <div className={clsx("container", styles.communityInner)}>
        <div>
          <Eyebrow className={styles.eyebrowLight}>Community</Eyebrow>
          <h2 className={styles.h2}>Join the Hudi community</h2>
          <p className={styles.communityLead}>
            Get help from the people who build Hudi, shape the roadmap, and see what's shipping next.
          </p>
          <div className={styles.communityLinks}>
            {COMMUNITY_LINKS.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && <span> · </span>}
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {l.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.buttonRowLeft}>
          <Button href={originalSlackUrl} variant="white">
            Join Slack
          </Button>
          <Button href="https://github.com/apache/hudi" variant="outline">
            Contribute on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const brokenLinks = useBrokenLinks();
  LAYERS.forEach((l) => brokenLinks.collectAnchor(l.id));
  return (
    <div className={styles.landing}>
      <Hero />
      <Adopters />
      <WhatIsHudi />
      <LayersOverview />
      <LayerTabs />
      <FoundationLayer />
      <AiStorageLayer />
      <AgenticLayer />
      <FullStackLayer />
      <WhyHudi />
      <FromTheBlog />
      <Community />
    </div>
  );
}
