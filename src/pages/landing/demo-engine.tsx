// demo-engine.tsx — animation framework for the product demo video.
// Provides Stage (playhead), Sprite (time-window), easing, and interpolation.
// Converted from the design system's animations.jsx.

import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";

// ── Easing ──────────────────────────────────────────────────────────────────

export const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutCubicAlt: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInQuad2: (t: number) => t * t,
};

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }: {
  from?: number; to?: number; start?: number; end?: number; ease?: (t: number) => number;
}) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

interface TimelineCtx { time: number; duration: number; }
const TimelineContext = createContext<TimelineCtx>({ time: 0, duration: 10 });
export const useTime = () => useContext(TimelineContext).time;

// ── Sprite ──────────────────────────────────────────────────────────────────

interface SpriteCtx { localTime: number; progress: number; duration: number; visible: boolean; }
const SpriteContext = createContext<SpriteCtx>({ localTime: 0, progress: 0, duration: 0, visible: false });
export const useSprite = () => useContext(SpriteContext);

export function Sprite({ start = 0, end = Infinity, children }: {
  start?: number; end?: number; children: React.ReactNode;
}) {
  const { time } = useContext(TimelineContext);
  const visible = time >= start && time <= end;
  if (!visible) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  return (
    <SpriteContext.Provider value={{ localTime, progress, duration, visible }}>
      {children}
    </SpriteContext.Provider>
  );
}

// ── Stage (no playback bar — autoplay + loop for hero embed) ────────────────

export function Stage({ width = 1920, height = 1080, duration = 45, background = "#0B0D10", children }: {
  width?: number; height?: number; duration?: number; background?: string; children: React.ReactNode;
}) {
  const [time, setTime] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Animation loop — autoplay, loop
  useEffect(() => {
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) next = next % duration;
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [duration]);

  // Auto-scale to fit container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const s = Math.min(el.clientWidth / width, el.clientHeight / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  const ctxValue = useMemo(() => ({ time, duration }), [time, duration]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{
        width, height, background, position: "relative",
        transform: `scale(${scale})`, transformOrigin: "center",
        flexShrink: 0, borderRadius: 14, overflow: "hidden",
      }}>
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>
      </div>
    </div>
  );
}
