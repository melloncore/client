"use client";

import { useId, useState } from "react";

export type FloatingItem = {
  src?: string;
  label: string;
  kind?: "avatar" | "logo";
  bg?: string;
};

type Props = {
  items: FloatingItem[];
  showPauseButton?: boolean;
  className?: string;
};

function Orbit({
  items,
  direction,
  duration,
  scope,
  radius,
  phase,
}: {
  items: FloatingItem[];
  direction: "clockwise" | "counterclockwise";
  duration: number;
  scope: string;
  radius: number;
  phase: number;
}) {
  return (
    <ul
      className={`ff-orbit ff-orbit-${direction} absolute inset-0 m-0 list-none p-0`}
      style={
        {
          animationDuration: `${duration}s`,
          "--ff-duration": `${duration}s`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {items.map((item, index) => {
        const angle =
          (index / items.length) * Math.PI * 2 -
          Math.PI / 2 +
          (phase * Math.PI) / 180;
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius;

        return (
          <OrbitItem
            key={`${item.label}-${index}`}
            item={item}
            left={left}
            top={top}
            scope={scope}
          />
        );
      })}
    </ul>
  );
}

function OrbitItem({
  item,
  left,
  top,
  scope,
}: {
  item: FloatingItem;
  left: number;
  top: number;
  scope: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = item.src && !failed;
  const isAvatar = item.kind === "avatar";

  return (
    <li
      className="ff-orbit-item absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-12 sm:w-12"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <span
        className={`ff-orbit-icon-${scope} flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/90 shadow-[0_8px_24px_rgba(20,35,60,0.12)]`}
        style={{
          background: showImage && isAvatar ? "#fff" : (item.bg ?? "#fff"),
        }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
            className={
              isAvatar
                ? "h-full w-full object-cover"
                : "h-7 w-7 object-contain sm:h-8 sm:w-8"
            }
          />
        ) : (
          <span className="select-none text-sm font-semibold text-zinc-700">
            {item.label.slice(0, 1).toUpperCase()}
          </span>
        )}
      </span>
    </li>
  );
}

export default function FloatingField({
  items,
  showPauseButton = true,
  className = "",
}: Props) {
  const scope = useId().replace(/:/g, "");
  const [paused, setPaused] = useState(false);
  const orbitItems = [
    items.filter((_, index) => index % 3 === 0),
    items.filter((_, index) => index % 3 === 1),
    items.filter((_, index) => index % 3 === 2),
  ];

  return (
    <div
      className={`ff-stage ff-stage-${scope} relative mx-auto aspect-square w-full max-w-[34rem] overflow-clip ${className}`}
      data-paused={paused}
    >
      <style>{`
        @keyframes ff-orbit-cw-${scope} {
          to { transform: rotate(360deg); }
        }
        @keyframes ff-orbit-ccw-${scope} {
          to { transform: rotate(-360deg); }
        }
        @keyframes ff-counter-cw-${scope} {
          to { transform: rotate(-360deg); }
        }
        @keyframes ff-counter-ccw-${scope} {
          to { transform: rotate(360deg); }
        }
        @keyframes ff-globe-spin-${scope} {
          to { transform: rotate(-360deg); }
        }
        .ff-stage-${scope} .ff-orbit-clockwise {
          animation: ff-orbit-cw-${scope} var(--ff-duration) linear infinite;
        }
        .ff-stage-${scope} .ff-orbit-counterclockwise {
          animation: ff-orbit-ccw-${scope} var(--ff-duration) linear infinite;
        }
        .ff-orbit-clockwise .ff-orbit-icon-${scope} {
          animation-name: ff-counter-cw-${scope};
          animation-duration: var(--ff-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .ff-orbit-counterclockwise .ff-orbit-icon-${scope} {
          animation-name: ff-counter-ccw-${scope};
          animation-duration: var(--ff-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .ff-stage-${scope} .ff-globe-${scope} {
          animation: ff-globe-spin-${scope} 36s linear infinite;
        }
        .ff-stage-${scope}[data-paused="true"] .ff-orbit,
        .ff-stage-${scope}[data-paused="true"] .ff-orbit-icon-${scope},
        .ff-stage-${scope}[data-paused="true"] .ff-globe-${scope} {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ff-stage-${scope} .ff-orbit,
          .ff-stage-${scope} .ff-orbit-icon-${scope},
          .ff-stage-${scope} .ff-globe-${scope} {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/35"
        aria-hidden="true"
      />

      {/* Center globe: the wrapper keeps the centering transform, the img rotates */}
      <div
        className="absolute left-1/2 top-1/2 z-[2] aspect-square w-[48%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/globe.png"
          alt=""
          width={800}
          height={800}
          draggable={false}
          className={`ff-globe-${scope} h-full w-full object-contain drop-shadow-[0_0_24px_rgba(36,122,139,0.25)]`}
        />
      </div>

      <Orbit
        items={orbitItems[0]}
        direction="clockwise"
        duration={48}
        scope={scope}
        radius={44}
        phase={0}
      />
      <Orbit
        items={orbitItems[1]}
        direction="counterclockwise"
        duration={38}
        scope={scope}
        radius={38}
        phase={140}
      />
      <Orbit
        items={orbitItems[2]}
        direction="clockwise"
        duration={56}
        scope={scope}
        radius={32}
        phase={260}
      />
      {showPauseButton && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play animation" : "Pause animation"}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-xs text-zinc-800 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
        >
          {paused ? "▶" : "❚❚"}
        </button>
      )}
    </div>
  );
}