export const K = 6;
export type C = [number, number, number];
export type GenCtx = { n: number; R: number; W: number; H: number; font: string };
export type Gen = (c: GenCtx) => { pts: Float32Array; grp?: Uint8Array };
export type M = { W: number; H: number; aw: number };
export interface Scene {
  gen: Gen; colors: C[]; R: (m: M) => number;
  theme: "dark" | "light"; rot: number; tilt?: number; alpha: number; dot: number; fx?: boolean; globe?: boolean;
}

function rand(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (x: number, y: number, z: number) => {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const s = (t: number) => t * t * (3 - 2 * t);
  const u = s(x - xi), v = s(y - yi), w = s(z - zi);
  const h = (a: number, b: number, c: number) => hash(xi + a, yi + b, zi + c);
  return lerp(
    lerp(lerp(h(0, 0, 0), h(1, 0, 0), u), lerp(h(0, 1, 0), h(1, 1, 0), u), v),
    lerp(lerp(h(0, 0, 1), h(1, 0, 1), u), lerp(h(0, 1, 1), h(1, 1, 1), u), v), w);
}

function ball(pts: Float32Array, from: number, to: number, cx: number, cy: number, R: number, rnd: () => number, shell: number) {
  for (let i = from; i < to; i++) {
    const z = rnd() * 2 - 1, t = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z);
    const rad = rnd() < shell ? R * (0.94 + 0.06 * rnd()) : R * Math.pow(rnd(), 0.6);
    pts[i * 3] = cx + r * Math.cos(t) * rad;
    pts[i * 3 + 1] = cy + z * rad;
    pts[i * 3 + 2] = r * Math.sin(t) * rad;
  }
}
function bands(pts: Float32Array, grp: Uint8Array, from: number, to: number, cx: number, cy: number, rnd: () => number) {
  for (let i = from; i < to; i++) {
    const ang = Math.atan2(pts[i * 3 + 1] - cy, pts[i * 3] - cx);
    let g = Math.floor(((ang + Math.PI) / (2 * Math.PI)) * 4) % 4;
    const r = rnd();
    if (r < 0.22) g = Math.floor(rnd() * 4); else if (r < 0.3) g = 4; else if (r < 0.36) g = 5;
    grp[i] = g;
  }
}

const sphereGen = (shell: number, seed: number): Gen => ({ n, R }) => {
  const rnd = rand(seed), pts = new Float32Array(n * 3), grp = new Uint8Array(n);
  ball(pts, 0, n, 0, 0, R, rnd, shell);
  bands(pts, grp, 0, n, 0, 0, rnd);
  return { pts, grp };
};

const dust: Gen = ({ n, W, H }) => {
  const rnd = rand(11), pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pts[i * 3] = (rnd() - 0.5) * W * 1.3;
    pts[i * 3 + 1] = (rnd() - 0.5) * H * 1.3;
    pts[i * 3 + 2] = (rnd() - 0.5) * 800;
  }
  return { pts };
};

const duo: Gen = ({ n, W, H }) => {
  const rnd = rand(5), pts = new Float32Array(n * 3), grp = new Uint8Array(n);
  const base = Math.min(W, H * 1.2), Rl = Math.min(base * 0.19, 230), Rr = Rl * 0.82;
  const lx = -W * 0.22, rx = W * 0.2, y = H * 0.03;
  const nl = Math.floor(n * 0.5), nr = Math.floor(n * 0.4);
  ball(pts, 0, nl, lx, y, Rl, rnd, 0.5); bands(pts, grp, 0, nl, lx, y, rnd);
  ball(pts, nl, nl + nr, rx, y, Rr, rnd, 0.55); grp.fill(4, nl, nl + nr);
  const x0 = lx + Rl * 0.8, x1 = rx - Rr * 0.8;
  for (let i = nl + nr; i < n; i++) {
    const t = rnd();
    pts[i * 3] = x0 + (x1 - x0) * t;
    pts[i * 3 + 1] = y + Math.sin(t * 9) * 6 + (rnd() - 0.5) * 5;
    pts[i * 3 + 2] = (rnd() - 0.5) * 20;
    grp[i] = 5;
  }
  return { pts, grp };
};

const land = (x: number, y: number, z: number) =>
  noise3(x * 1.7 + 3, y * 1.7, z * 1.7) * 0.65 + noise3(x * 3.9, y * 3.9 + 7, z * 3.9) * 0.35 > 0.52;

const globe: Gen = ({ n, R }) => {
  const rnd = rand(9), M = n * 8, acc: number[] = [];
  for (let i = 0; i < M; i++) {
    const y = 1 - 2 * ((i + 0.5) / M), r = Math.sqrt(1 - y * y), th = i * 2.399963;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    if (land(x, y, z) || rnd() < 0.08) acc.push(x, y, z);
  }
  const cnt = acc.length / 3, pts = new Float32Array(n * 3);
  for (let j = 0; j < n; j++) {
    const s = Math.floor((j * cnt) / n) * 3;
    pts[j * 3] = acc[s] * R; pts[j * 3 + 1] = acc[s + 1] * R; pts[j * 3 + 2] = acc[s + 2] * R;
  }
  return { pts };
};

const text = (s: string): Gen => ({ n, W, H, font }) => {
  const cw = Math.min(Math.round(W), 1600), ch = Math.round(H * 0.5);
  const c = document.createElement("canvas"); c.width = cw; c.height = ch;
  const x = c.getContext("2d", { willReadFrequently: true });
  const pts = new Float32Array(n * 3);
  if (!x) return { pts };
  let size = ch * 0.95;
  x.font = `200 ${size}px ${font}`;
  const m = x.measureText(s).width;
  if (m > cw * 0.86) { size *= (cw * 0.86) / m; x.font = `200 ${size}px ${font}`; }
  x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#fff";
  x.fillText(s, cw / 2, ch / 2);
  const d = x.getImageData(0, 0, cw, ch).data, pool: number[] = [];
  for (let yy = 0; yy < ch; yy += 2) for (let xx = 0; xx < cw; xx += 2) if (d[(yy * cw + xx) * 4 + 3] > 128) pool.push(xx, yy);
  const rnd = rand(3), cnt = pool.length / 2;
  for (let i = 0; i < n; i++) {
    const j = cnt ? Math.floor(rnd() * cnt) * 2 : 0;
    pts[i * 3] = (pool[j] ?? 0) - cw / 2 + (rnd() - 0.5) * 3;
    pts[i * 3 + 1] = (pool[j + 1] ?? 0) - ch / 2 - H * 0.08 + (rnd() - 0.5) * 3;
    pts[i * 3 + 2] = (rnd() - 0.5) * 24;
  }
  return { pts };
};

export const WARM: C[] = [[255, 122, 69], [255, 79, 110], [111, 123, 255], [255, 176, 32], [201, 184, 255], [255, 255, 255]];
const WHITE: C[] = Array.from({ length: K }, () => [232, 236, 255] as C);
const DUSTV: C[] = [[255, 160, 90], [170, 140, 255], [255, 255, 255], [255, 110, 150], [120, 140, 255], [255, 255, 255]];
const VIOLET: C[] = [[75, 63, 216], [123, 97, 255], [255, 92, 138], [60, 120, 255], [150, 130, 255], [90, 70, 220]];

const mk = (o: Partial<Scene> & Pick<Scene, "gen" | "colors" | "R">): Scene => ({ theme: "dark", rot: 0, alpha: 0.9, dot: 1.5, ...o });
const mn = ({ W, H }: M) => Math.min(W, H);
const numberScene = (s: string) => mk({ gen: text(s), colors: WHITE, R: () => 300, alpha: 0.95, dot: 1.7 });

export const SCENES: Record<string, Scene> = {
  hero: mk({ gen: sphereGen(0.65, 7), colors: WARM, R: ({ aw }) => aw * 0.4, rot: 0.0035, fx: true }),
  "reveal:0": mk({ gen: sphereGen(0.6, 7), colors: WARM, R: (m) => mn(m) * 0.16, rot: 0.003, fx: true }),
  "reveal:1": mk({ gen: sphereGen(0.7, 7), colors: WARM, R: (m) => mn(m) * 0.46, rot: 0.002, alpha: 0.8, fx: true }),
  "reveal:2": mk({ gen: dust, colors: DUSTV, R: () => 400, alpha: 0.8, dot: 1.2 }),
  products: mk({ gen: dust, colors: DUSTV, R: () => 400, alpha: 0.7, dot: 1.3 }),
  duo: mk({ gen: duo, colors: WARM, R: ({ W, H }) => Math.min(W, H * 1.2), rot: 0.002, fx: true }),
  principle: mk({ gen: dust, colors: DUSTV, R: () => 400, alpha: 0.4, dot: 1.2 }),
  "numbers:0": numberScene("2006"),
  "numbers:1": numberScene("500+"),
  "numbers:2": numberScene("4"),
  globe: mk({ gen: globe, colors: WHITE, R: ({ aw }) => aw * 0.46, rot: 0.002, tilt: 0.35, alpha: 0.95, dot: 1.4, fx: true, globe: true }),
  portfolio: mk({ gen: sphereGen(0.35, 21), colors: VIOLET, R: ({ aw }) => aw * 0.42, rot: 0.004, theme: "light", fx: true }),
  contact: mk({ gen: sphereGen(0.35, 21), colors: VIOLET, R: ({ aw }) => aw * 0.42, rot: 0.004, theme: "light", fx: true }),
};
