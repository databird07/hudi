import React from "react";

const W = 150;
const H = 86;
const D = 22;
const CX = 200;

const LAYERS = [
  { y: 236, top: ["#0F3A73", "#0A2A57"], left: "#072047", right: "#05183A", grid: 0.18 },
  { y: 170, top: ["#1E6FD0", "#1559B4"], left: "#124C9E", right: "#0E3F86", grid: 0.22 },
  { y: 104, top: ["#46A6F0", "#2B8BE0"], left: "#2479C9", right: "#1C67B0", grid: 0.3 },
  { y: 38, top: ["#FFFFFF", "#EAF7FD"], left: "#C9EBFA", right: "#AEDDF3", grid: 0.5 },
];

const diamond = (y) => `${CX},${y} ${CX + W},${y + H} ${CX},${y + 2 * H} ${CX - W},${y + H}`;

function gridLines(y) {
  const lines = [];
  for (let i = 1; i < 4; i++) {
    const t = i / 4;
    lines.push([CX - W * t, y + H * (1 - t), CX + W * (1 - t), y + H * (2 - t)]);
    lines.push([CX + W * t, y + H * (1 - t), CX - W * (1 - t), y + H * (2 - t)]);
  }
  return lines;
}

const NODES = [
  [200, 74],
  [138, 112],
  [252, 114],
  [196, 152],
  [216, 108],
];
const EDGES = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [0, 2],
  [1, 3],
];

export default function LayerStack({ className }) {
  return (
    <svg
      className={className}
      viewBox="30 20 340 340"
      role="img"
      aria-label="Four stacked layers of the Hudi lakehouse"
    >
      <defs>
        {LAYERS.map((l, i) => (
          <linearGradient key={i} id={`lsTop${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={l.top[0]} />
            <stop offset="1" stopColor={l.top[1]} />
          </linearGradient>
        ))}
        <radialGradient id="lsGlow">
          <stop offset="0" stopColor="#3BA3F0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3BA3F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {LAYERS.map((l, i) => (
        <g key={i}>
          <polygon
            points={`${CX - W},${l.y + H} ${CX},${l.y + 2 * H} ${CX},${l.y + 2 * H + D} ${CX - W},${l.y + H + D}`}
            fill={l.left}
          />
          <polygon
            points={`${CX + W},${l.y + H} ${CX},${l.y + 2 * H} ${CX},${l.y + 2 * H + D} ${CX + W},${l.y + H + D}`}
            fill={l.right}
          />
          <polygon points={diamond(l.y)} fill={`url(#lsTop${i})`} />
          {gridLines(l.y).map(([x1, y1, x2, y2], k) => (
            <line
              key={k}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i === 3 ? "#9ED8F4" : "#FFFFFF"}
              strokeOpacity={l.grid}
              strokeWidth="0.8"
            />
          ))}
        </g>
      ))}
      <circle cx="216" cy="108" r="26" fill="url(#lsGlow)" />
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="#1E6FD0"
          strokeOpacity="0.7"
          strokeWidth="1.1"
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 4 ? 4 : 3.6}
          fill={i === 4 ? "#3BA3F0" : "#FFFFFF"}
          stroke="#1E6FD0"
          strokeWidth="1.3"
        />
      ))}
    </svg>
  );
}

const GLYPH_COLORS = ["#0A2A57", "#1E6FD0", "#3BA3F0", "#BFE6F8"];

export function LayerGlyph({ active = 0, size = 28, className }) {
  const rows = [3, 2, 1, 0];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      {rows.map((layer) => {
        const y = 4 + (3 - layer) * 4.5;
        const on = layer === active;
        return (
          <polygon
            key={layer}
            points={`14,${y} 26,${y + 5} 14,${y + 10} 2,${y + 5}`}
            fill={on ? GLYPH_COLORS[layer] : "#D5DCE4"}
            fillOpacity={on ? 1 : 0.85}
            stroke="#FFFFFF"
            strokeWidth="0.6"
          />
        );
      })}
    </svg>
  );
}
