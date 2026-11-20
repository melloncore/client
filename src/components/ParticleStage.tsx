"use client";
import { useEffect, useRef } from "react";
import { K, SCENES, type C, type Scene } from "@/lib/scenes";
import { offices, products } from "@/content/site";

const F = 1100;
const hex = (h: string): C => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: C, b: C, t: number): C => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export default function ParticleStage() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;

    let W = innerWidth, H = innerHeight, dpr = 1;
    const MAX = W < 768 ? 2600 : 6000;
    let act = MAX;
    const cur = new Float32Array(MAX * 3), tgt = new Float32Array(MAX * 3);
    const ox = new Float32Array(MAX), oy = new Float32Array(MAX), seed = new Float32Array(MAX);
    const sx = new Float32Array(MAX), sy = new Float32Array(MAX), al = new Float32Array(MAX), sz = new Float32Array(MAX);
    const grp = new Uint8Array(MAX);
    for (let i = 0; i < MAX; i++) {
      seed[i] = Math.random();
      cur[i * 3] = (Math.random() - 0.5) * W; cur[i * 3 + 1] = (Math.random() - 0.5) * H; cur[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    const col: C[] = Array.from({ length: K }, () => [200, 200, 255] as C);
    const cache = new Map<string, { pts: Float32Array; grp?: Uint8Array }>();
    let font = "sans-serif", tkey = "", theme = "";
    let secs: HTMLElement[] = [], last: HTMLElement | null = null, frame = 0;
    let cx = W / 2, cy = H / 2, rot = 0, mx = -1e4, my = -1e4;
    let raf = 0, prev = performance.now(), ema = 0.016;

    const resize = (force = false) => {
      const nw = innerWidth, nh = innerHeight;
      if (!force && nw === W && Math.abs(nh - H) < 120 && nw < 1024) return; // ignore mobile URL-bar jitter
      W = nw; H = nh; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cache.clear(); tkey = "";
    };
    resize(true);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => resize(), 150); };
    const onMove = (e: PointerEvent) => { if (!coarse) { mx = e.clientX; my = e.clientY; } };
    const onLeave = () => { mx = -1e4; my = -1e4; };
    document.fonts.ready.then(() => { font = getComputedStyle(document.body).fontFamily; cache.clear(); tkey = ""; });

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - prev) / 1000, 0.05); prev = now;
      ema += (dt - ema) * 0.05;
      if (frame++ % 30 === 0 || secs.some((s) => !s.isConnected)) secs = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

      let el: HTMLElement | null = null;
      for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= H * 0.5 && r.bottom > H * 0.5) { el = s; break; } }
      if (el) last = el; else if (!secs.length) last = null;
      const name = last?.dataset.scene ?? "principle", st = last?.dataset.step;
      const sk = st !== undefined ? `${name}:${st}` : name;
      const sc: Scene = SCENES[sk] ?? SCENES[name] ?? SCENES.principle;

      let tx = W / 2, ty = H / 2, aw = Math.min(W, H);
      const a = last?.querySelector<HTMLElement>("[data-anchor]");
      if (a) { const r = a.getBoundingClientRect(); tx = r.left + r.width / 2; ty = r.top + r.height / 2; aw = r.width; }
      const sm = reduce ? 1 : 0.35;
      cx += (tx - cx) * sm; cy += (ty - cy) * sm;

      if (sc.theme !== theme) { theme = sc.theme; document.documentElement.dataset.theme = theme; }

      const R = sc.R({ W, H, aw });
      const key = `${sk}|${Math.round(R)}|${W}x${H}`;
      if (key !== tkey) {
        tkey = key;
        let g = cache.get(key);
        if (!g) {
          g = sc.gen({ n: MAX, R, W, H, font });
          if (cache.size > 12) cache.delete(cache.keys().next().value as string);
          cache.set(key, g);
        }
        tgt.set(g.pts);
        if (g.grp) grp.set(g.grp); else for (let i = 0; i < MAX; i++) grp[i] = i % K;
      }

      let pal = sc.colors;
      const acc = last?.dataset.accent;
      if (acc) { const A = hex(acc), w: C = [255, 255, 255]; pal = [A, A, mix(A, w, 0.45), w, A, mix(A, w, 0.7)]; }
      for (let g = 0; g < K; g++) for (let c = 0; c < 3; c++) col[g][c] += (pal[g][c] - col[g][c]) * 0.08;

      const kk = reduce ? 1 : 1 - Math.pow(1 - 0.07, dt * 60);
      for (let i = 0; i < act; i++) {
        const ks = Math.min(1, kk * (0.5 + seed[i])), j = i * 3;
        cur[j] += (tgt[j] - cur[j]) * ks; cur[j + 1] += (tgt[j + 1] - cur[j + 1]) * ks; cur[j + 2] += (tgt[j + 2] - cur[j + 2]) * ks;
      }
      if (reduce) rot = 0;
      else if (sc.rot) rot += sc.rot * dt * 60;
      else { const n = Math.round(rot / (2 * Math.PI)) * 2 * Math.PI; rot += (n - rot) * 0.06; }

      const cr = Math.cos(rot), sr = Math.sin(rot), tilt = sc.tilt ?? 0, ct = Math.cos(tilt), stl = Math.sin(tilt);
      const rad = Math.max(R * 0.3, 70), rad2 = rad * rad, repel = !!sc.fx && !coarse && !reduce;
      const zr = Math.max(R, 200), scale = W < 768 ? 0.85 : 1;

      for (let i = 0; i < act; i++) {
        const j = i * 3, x = cur[j], y = cur[j + 1], z = cur[j + 2];
        let x1 = x * cr + z * sr, z1 = -x * sr + z * cr, y1 = y;
        if (tilt) { y1 = y * ct - z1 * stl; z1 = y * stl + z1 * ct; }
        const s = F / (F + z1);
        const px = cx + x1 * s, py = cy + y1 * s;
        if (repel) {
          const dx = px - mx, dy = py - my, d2 = dx * dx + dy * dy;
          if (d2 < rad2 && d2 > 0.01) {
            const d = Math.sqrt(d2), f = (1 - d / rad) * rad * 0.9;
            ox[i] += ((dx / d) * f - ox[i]) * 0.2; oy[i] += ((dy / d) * f - oy[i]) * 0.2;
          } else { ox[i] *= 0.92; oy[i] *= 0.92; }
        } else { ox[i] *= 0.9; oy[i] *= 0.9; }
        sx[i] = px + ox[i]; sy[i] = py + oy[i];
        const depth = Math.min(1, Math.max(0, 0.5 - z1 / (2 * zr)));
        al[i] = sc.alpha * (0.3 + 0.7 * depth) * (0.6 + 0.4 * seed[i]);
        sz[i] = sc.dot * (0.7 + 0.9 * depth) * scale;
      }

      ctx.clearRect(0, 0, W, H);
      for (let g = 0; g < K; g++) {
        ctx.fillStyle = `rgb(${col[g][0] | 0},${col[g][1] | 0},${col[g][2] | 0})`;
        for (let i = 0; i < act; i++) {
          if (grp[i] !== g || sx[i] < -4 || sx[i] > W + 4 || sy[i] < -4 || sy[i] > H + 4) continue;
          ctx.globalAlpha = al[i];
          ctx.fillRect(sx[i], sy[i], sz[i], sz[i]);
        }
      }
      ctx.globalAlpha = 1;

      if (sc.globe) {
        ctx.font = `500 12px ${font}`;
        offices.forEach((o, idx) => {
          const la = (o.lat * Math.PI) / 180, lo = (o.lon * Math.PI) / 180;
          const x0 = Math.cos(la) * Math.sin(lo) * R, y0 = -Math.sin(la) * R, z0 = -Math.cos(la) * Math.cos(lo) * R;
          const x1 = x0 * cr + z0 * sr; let z1 = -x0 * sr + z0 * cr; const y1 = y0 * ct - z1 * stl; z1 = y0 * stl + z1 * ct;
          if (z1 > R * 0.1) return;
          const s = F / (F + z1), px = cx + x1 * s, py = cy + y1 * s, color = products[idx % products.length].hex;
          ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#fff"; ctx.fillText(o.city, px + 12, py + 4);
        });
      }

      if (frame % 60 === 0 && ema > 0.027 && act > 1500) act = Math.floor(act * 0.85);
    };

    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) { prev = performance.now(); raf = requestAnimationFrame(tick); } };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
