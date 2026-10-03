/** Minimal inline icon set (stroke icons, 24px grid). No icon library needed. */
const paths: Record<string, string> = {
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35",
  pen: "M16.5 3.5l4 4L8 20H4v-4L16.5 3.5zM14 6l4 4",
  video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
  megaphone: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  check: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  briefcase: "M4 7h16v12H4zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 12h16",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6L6 18",
  filter: "M4 5h16l-6 8v5l-4 2v-7L4 5z",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 1 2-2h13",
  scale: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a4 4 0 0 0 6 0L5 7zM19 7l-3 7a4 4 0 0 0 6 0l-3-7z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  clipboard: "M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  chevronDown: "M6 9l6 6 6-6",
  copy: "M8 8h12v12H8zM4 16V4h12",
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const d = paths[name] ?? paths.layers;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
