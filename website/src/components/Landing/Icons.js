import React from "react";

const paths = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13h2M12 13h2M16 13h0.5M8 16.5h2M12 16.5h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.2a4.7 4.7 0 0 1 .3 9.3H7Z" />
      <path d="m9.5 14 2 2 3.5-3.5" />
    </>
  ),
  trend: <path d="M3.5 17 9 11.5l3.5 3.5 7-7M15 8h4.5v4.5" />,
  edit: <path d="M4 6h11M4 10h8M4 14h5M13.5 19.5l1-3.5 5-5 2.5 2.5-5 5-3.5 1Z" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  history: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
      <path d="M4 4v4.5h4.5M12 8v4.5l3 2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  fileUp: (
    <>
      <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
      <path d="M14 3.5V8h4.5M12 17v-6M9.5 13.5 12 11l2.5 2.5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="5" cy="18" r="1.8" />
      <circle cx="19" cy="18" r="1.8" />
      <path d="m6.5 7.2 3.8 3.3M17.5 7.2l-3.8 3.3M6.5 16.8l3.8-3.3M17.5 16.8l-3.8-3.3" />
    </>
  ),
  search: (
    <>
      <path d="M3.5 7h7M3.5 12h5M3.5 17h5" />
      <circle cx="15.5" cy="13" r="4" />
      <path d="m18.5 16 2.5 2.5" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="1.2" />
      <rect x="3.5" y="13" width="17" height="7" rx="1.2" />
      <path d="M7 7.5h2M7 16.5h2" />
    </>
  ),
  bolt: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />,
  box: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  chart: <path d="M5 20V12M10 20V6M15 20v-9M20 20H3" />,
  flow: (
    <>
      <rect x="3" y="4" width="6" height="5" rx="1" />
      <rect x="15" y="4" width="6" height="5" rx="1" />
      <rect x="9" y="15" width="6" height="5" rx="1" />
      <path d="M9 6.5h6M18 9v3.5h-6V15" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 9A8 8 0 0 0 5 7.5M4.5 15A8 8 0 0 0 19 16.5" />
      <path d="M19.5 4v5h-5M4.5 20v-5h5" />
    </>
  ),
  bot: (
    <>
      <rect x="4.5" y="7.5" width="15" height="11" rx="2.5" />
      <path d="M12 4v3.5M9 12.5h.01M15 12.5h.01M9.5 15.5h5M2.5 12v3M21.5 12v3" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="m7 10 3 2.5L7 15M12.5 15.5h4.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  table: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.2" />
      <path d="M3.5 9.5h17M9.5 9.5v10" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
      <path d="M9 12.5h6M9 16h6" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 18 5-5 3.5 3.5L16 13l4.5 4.5" />
    </>
  ),
  audio: <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3" />,
};

export default function Icon({ name, size = 20, className, strokeWidth = 1.6 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
