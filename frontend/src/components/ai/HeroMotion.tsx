"use client";

import { useEffect, useRef } from "react";

const N = 4200;
const CYCLE = 10; // seconds: flag a patch, pull it out, glow, settle
const PATCH = [0.55, -0.35, 0.76]; // direction of the patch that gets flagged

// Fibonacci sphere, computed once.
const POINTS: [number, number, number][] = Array.from({ length: N }, (_, i) => {
  const y = 1 - (i / (N - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = i * 2.39996;
  return [Math.cos(th) * r, y, Math.sin(th) * r];
});

interface Pointer {
  x: number;
  y: number;
  tx: number;
  ty: number;
  px: number;
  py: number;
  on: number;
  ton: number;
}

function draw(c: HTMLCanvasElement, t: number, m: Pointer) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = c.clientWidth;
  const h = c.clientHeight;
  if (c.width !== Math.round(w * dpr)) {
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
  }
  const x = c.getContext("2d");
  if (!x) return;
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  x.clearRect(0, 0, w, h);

  const k = t % CYCLE;
  const sm = (a: number, b: number) => {
    const v = Math.min(1, Math.max(0, (k - a) / (b - a)));
    return v * v * (3 - 2 * v);
  };
  const flagAmt = sm(3, 3.8) * (1 - sm(6.6, 7.4));
  const pull = sm(4.2, 5) * (1 - sm(6.6, 7.6));
  const glow = sm(6.6, 7) * (1 - sm(7.4, 8.6));

  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.32;
  const halo = x.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.5);
  halo.addColorStop(0, "rgba(30,107,74,0.2)");
  halo.addColorStop(0.55, "rgba(221,232,221,0.4)");
  halo.addColorStop(1, "rgba(238,241,234,0)");
  x.fillStyle = halo;
  x.fillRect(0, 0, w, h);

  m.x += (m.tx - m.x) * 0.06;
  m.y += (m.ty - m.y) * 0.06;
  m.on += (m.ton - m.on) * 0.08;

  const ry = t * 0.12 + m.x * 0.7;
  const cr = Math.cos(ry);
  const sr = Math.sin(ry);
  const tl = 0.32 + m.y * 0.45;
  const ct = Math.cos(tl);
  const st = Math.sin(tl);
  const rad = R * 0.55;
  const rad2 = rad * rad;

  for (const [a, b, d] of POINTS) {
    const n =
      Math.sin(a * 2.6 + t * 0.55) * Math.sin(b * 2.2 + t * 0.45) * Math.sin(d * 2.8 + t * 0.4) +
      0.35 * Math.sin(a * 5 + b * 4 - t * 0.8);
    const dot = a * PATCH[0] + b * PATCH[1] + d * PATCH[2];
    const inPatch = dot > 0.86 ? Math.min(1, (dot - 0.86) / 0.06) : 0;
    const r = R * (1 + 0.1 * n + inPatch * pull * 0.34);
    const px = a * r;
    const py = b * r;
    const pz = d * r;
    const x1 = px * cr + pz * sr;
    const z1 = -px * sr + pz * cr;
    const y2 = py * ct - z1 * st;
    const z2 = py * st + z1 * ct;
    const s = 900 / (900 + z2);
    const dep = Math.max(0, Math.min(1, (1 - z2 / R) / 2));
    const f = inPatch * flagAmt;
    const g = glow * (inPatch > 0 ? 1 : 0.3);
    const bR = 19 + (70 - 19) * dep;
    const bG = 45 + (140 - 45) * dep;
    const bB = 32 + (100 - 32) * dep;
    const cR = Math.round(bR + (110 - bR) * f + (160 - bR) * g * 0.5);
    const cG = Math.round(bG + (190 - bG) * f + (215 - bG) * g * 0.5);
    const cB = Math.round(bB + (140 - bB) * f + (180 - bB) * g * 0.5);
    const al = 0.2 + dep * 0.8;
    x.fillStyle = `rgba(${cR},${cG},${cB},${Math.min(1, al).toFixed(3)})`;

    let sx = cx + x1 * s;
    let sy = cy + y2 * s;
    let lift = 0;
    // The cursor pushes the near-side dots aside and lightens them.
    if (m.on > 0.01 && z2 < 0) {
      const dx = sx - m.px;
      const dy = sy - m.py;
      const d2 = dx * dx + dy * dy;
      if (d2 < rad2) {
        const dd = Math.sqrt(d2) || 1;
        const fall = 1 - dd / rad;
        const push = fall * fall * 34 * m.on;
        sx += (dx / dd) * push;
        sy += (dy / dd) * push;
        lift = fall * m.on;
      }
    }
    if (lift > 0) {
      x.fillStyle = `rgba(${Math.round(cR + (160 - cR) * lift * 0.7)},${Math.round(
        cG + (215 - cG) * lift * 0.7,
      )},${Math.round(cB + (180 - cB) * lift * 0.7)},${Math.min(1, al + lift * 0.3).toFixed(3)})`;
    }
    const sz = (0.9 + dep * 1.7 + f * 0.8 + lift * 1.2) * s * Math.max(1, R / 260);
    x.beginPath();
    x.arc(sx, sy, sz * 0.55, 0, 6.2832);
    x.fill();
  }
}

/**
 * The AI page's particle sphere: slow rotation, a patch that's flagged,
 * pulled out and glows on a 10s cycle, and dots that part around the cursor.
 * Pauses off-screen and in background tabs; one still frame under reduced motion.
 */
export default function HeroMotion() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const m: Pointer = { x: 0, y: 0, tx: 0, ty: 0, px: -1e4, py: -1e4, on: 0, ton: 0 };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(c, 2, m);
      const redraw = () => draw(c, 2, m);
      window.addEventListener("resize", redraw);
      return () => window.removeEventListener("resize", redraw);
    }

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      m.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      m.px = e.clientX - r.left;
      m.py = e.clientY - r.top;
      m.ton =
        e.clientX > r.left - 80 && e.clientX < r.right + 80 && e.clientY > r.top - 80 && e.clientY < r.bottom + 80
          ? 1
          : 0;
    };
    const onLeave = () => {
      m.tx = 0;
      m.ty = 0;
      m.ton = 0;
    };

    let raf = 0;
    let visible = true;
    let elapsed = 0; // animation time, which stops while paused
    let last: number | null = null;
    const loop = (ms: number) => {
      if (last !== null) elapsed += (ms - last) / 1000;
      last = ms;
      draw(c, elapsed, m);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = null;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(c);
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full block" />;
}
