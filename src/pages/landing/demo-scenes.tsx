// demo-scenes.tsx — 45s product demo for the hero section.
// 5 scenes: title → the moment → cue arrives → you speak → closing tagline.
// Converted from design system's scenes.jsx.

import React from "react";
import { Easing, animate, useSprite, Sprite, Stage } from "./demo-engine";

const FONT_DISPLAY = "'Inter Tight', 'Inter', system-ui, sans-serif";
const FONT_SANS = "'Inter', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";
const SLATE_900 = "#0B0D10";
const PAPER = "#F8F6F2";
const FG = "#1A1D24";
const FG_2 = "rgba(26,29,36,0.65)";
const CUE_BLUE = "#3D8BFF";
const CUE_BLUE_LT = "#7AB0FF";
const LIVE_RED = "#FF4D4D";
const PAPER_DK = "#ECEAE4";

// ─── Scene 1: Title card ───────────────────────────────────────────────────

function SceneTitle() {
  const { localTime, duration } = useSprite();
  const dotScale = animate({ from: 0, to: 1, start: 0.2, end: 0.8, ease: Easing.easeOutBack })(localTime);
  const wmOpacity = animate({ from: 0, to: 1, start: 0.4, end: 1.1 })(localTime);
  const wmTy = animate({ from: 12, to: 0, start: 0.4, end: 1.1, ease: Easing.easeOutCubic })(localTime);
  const tgOpacity = animate({ from: 0, to: 1, start: 1.4, end: 2.2 })(localTime);
  const tgTy = animate({ from: 8, to: 0, start: 1.4, end: 2.2, ease: Easing.easeOutCubic })(localTime);
  const exit = duration - localTime;
  const exitOp = exit < 0.6 ? Math.max(0, exit / 0.6) : 1;
  return (
    <div style={{ position: "absolute", inset: 0, background: PAPER, display: "flex", alignItems: "center", justifyContent: "center", opacity: exitOp }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: LIVE_RED, transform: `scale(${dotScale})`, animation: "live-pulse 1.4s ease-in-out infinite" }} />
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 96, letterSpacing: "-0.045em", color: FG, opacity: wmOpacity, transform: `translateY(${wmTy}px)` }}>cuedesk</span>
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: FG_2, opacity: tgOpacity, transform: `translateY(${tgTy}px)` }}>
          live AI co-pilot for sales calls
        </div>
      </div>
    </div>
  );
}

// ─── Scene 2: The moment ─────────────────────────────────────────────────

function SceneTheMoment() {
  const { localTime } = useSprite();
  const camScale = animate({ from: 0.92, to: 1.0, start: 0, end: 2, ease: Easing.easeOutCubic })(localTime);
  const camScale2 = animate({ from: 1.0, to: 1.06, start: 6, end: 10, ease: Easing.easeInOutCubic })(localTime);
  const finalScale = camScale * camScale2;
  const cap1Op = animate({ from: 0, to: 1, start: 0.6, end: 1.0 })(localTime) * (localTime > 8.5 ? Math.max(0, (9 - localTime) / 0.5) : 1);
  const cap2Op = localTime > 8 ? animate({ from: 0, to: 1, start: 8, end: 9 })(localTime) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, background: SLATE_900, overflow: "hidden", transform: `scale(${finalScale})`, transformOrigin: "center" }}>
      <ZoomBackdrop />
      <ZoomTranscriptStream localTime={localTime} />
      {localTime > 7.5 && <SilenceIndicator localTime={localTime - 7.5} />}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
        {localTime > 0.5 && localTime < 9 && <Caption text="every AE knows the moment." opacity={cap1Op} />}
        {localTime > 8 && <Caption text="the prospect asks. you have two seconds." opacity={cap2Op} />}
      </div>
    </div>
  );
}

function ZoomBackdrop() {
  return (
    <>
      <div style={{ position: "absolute", inset: "40px 380px 160px 40px", borderRadius: 14, background: "linear-gradient(135deg, #2a2f3a, #14171d)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "55%", transform: "translate(-50%,-50%)" }}>
          <div style={{ width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #4a5060, #2a2f3a)", marginBottom: -40 }} />
          <div style={{ width: 380, height: 240, borderRadius: "50% 50% 0 0 / 80% 80% 0 0", background: "linear-gradient(180deg, #3a4050, #1f232c)", margin: "0 auto" }} />
        </div>
        <div style={{ position: "absolute", left: 18, bottom: 14, fontFamily: FONT_SANS, fontSize: 14, color: PAPER_DK }}>marcus chen · acme corp</div>
        <div style={{ position: "absolute", right: 18, top: 14, display: "flex", alignItems: "center", gap: 6, fontFamily: FONT_SANS, fontSize: 11, color: "rgba(236,234,228,0.7)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: LIVE_RED, animation: "live-pulse 1.4s ease-in-out infinite" }} />
          REC
        </div>
      </div>
      <div style={{ position: "absolute", top: 40, right: 40, width: 320, height: 200, borderRadius: 12, background: "linear-gradient(135deg, #1f232c, #0F1115)", border: "1px solid rgba(255,255,255,0.06)", padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "rgba(236,234,228,0.55)", fontFamily: FONT_SANS, fontSize: 12 }}>you</div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12, padding: "12px 18px", borderRadius: 999, background: "rgba(20,22,28,0.88)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
        {["mic", "cam", "chat", "ppl"].map(k => (
          <span key={k} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "inline-block" }} />
        ))}
        <span style={{ padding: "8px 18px", borderRadius: 22, background: LIVE_RED, color: "#fff", fontFamily: FONT_SANS, fontSize: 13, alignSelf: "center" }}>end</span>
      </div>
    </>
  );
}

function ZoomTranscriptStream({ localTime }: { localTime: number }) {
  const lines = [
    { at: 1.5, text: "Honestly, we looked at Gong last quarter" },
    { at: 3.0, text: "and the pricing was a non-starter for a team our size —" },
    { at: 5.0, text: "how are you guys priced?" },
  ];
  const visible = lines.filter(l => localTime >= l.at);
  return (
    <div style={{ position: "absolute", left: 60, bottom: 220, width: 700, fontFamily: FONT_MONO, fontSize: 17, lineHeight: 1.6, color: "rgba(236,234,228,0.92)", display: "flex", flexDirection: "column", gap: 6 }}>
      {visible.map((l, i) => {
        const charsT = Math.max(0, localTime - l.at);
        const chars = Math.min(l.text.length, Math.floor(charsT * 28));
        return (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "2px 6px", borderRadius: 3, background: "rgba(255,138,138,0.2)", color: "#FF8A8A", marginTop: 4, flex: "none" }}>P</span>
            <span>{l.text.slice(0, chars)}{chars < l.text.length && <span style={{ display: "inline-block", width: 8, height: 16, background: "rgba(236,234,228,0.5)", verticalAlign: "middle", marginLeft: 2, animation: "blink 0.9s steps(2) infinite" }} />}</span>
          </div>
        );
      })}
      {localTime > 6.5 && (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 4, opacity: 0.55 }}>
          <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "2px 6px", borderRadius: 3, background: "rgba(122,176,255,0.2)", color: "#7AB0FF", marginTop: 4, flex: "none" }}>You</span>
          <span style={{ display: "inline-block", width: 9, height: 18, background: "rgba(236,234,228,0.5)", animation: "blink 0.9s steps(2) infinite", marginTop: 4 }} />
        </div>
      )}
    </div>
  );
}

function SilenceIndicator({ localTime }: { localTime: number }) {
  const op = animate({ from: 0, to: 1, start: 0, end: 0.5 })(localTime);
  return (
    <div style={{ position: "absolute", left: 60, bottom: 130, opacity: op, display: "flex", alignItems: "center", gap: 10, fontFamily: FONT_MONO, fontSize: 13, color: LIVE_RED, letterSpacing: "0.04em" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: LIVE_RED, animation: "live-pulse 1.0s ease-in-out infinite" }} />
      silence · {Math.floor(localTime)}.{Math.floor((localTime % 1) * 10)}s
    </div>
  );
}

function Caption({ text, opacity }: { text: string; opacity: number }) {
  return (
    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 38, color: PAPER_DK, letterSpacing: "-0.022em", opacity, padding: "10px 28px", background: "rgba(11,13,16,0.55)", borderRadius: 8, backdropFilter: "blur(10px)" }}>{text}</div>
  );
}

// ─── Scene 3: Cue arrives ──────────────────────────────────────────────────

function SceneCueArrives() {
  const { localTime } = useSprite();
  const hudX = animate({ from: 1920, to: 1360, start: 0, end: 1.1, ease: Easing.easeOutCubic })(localTime);
  const camScale = animate({ from: 1.0, to: 1.12, start: 2.5, end: 6.5, ease: Easing.easeInOutCubic })(localTime);
  const camTx = animate({ from: 0, to: -60, start: 2.5, end: 6.5, ease: Easing.easeInOutCubic })(localTime);
  const camTy = animate({ from: 0, to: 30, start: 2.5, end: 6.5, ease: Easing.easeInOutCubic })(localTime);
  return (
    <div style={{ position: "absolute", inset: 0, background: SLATE_900, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx}px, ${camTy}px) scale(${camScale})`, transformOrigin: "center" }}>
        <ZoomBackdrop />
        <div style={{ position: "absolute", inset: 0, background: SLATE_900, opacity: animate({ from: 0, to: 0.45, start: 0.4, end: 1.2 })(localTime), pointerEvents: "none" as const }} />
        <HUDFrame x={hudX} localTime={localTime} />
      </div>
    </div>
  );
}

function HUDFrame({ x, localTime }: { x: number; localTime: number }) {
  const cuePrimaryOp = animate({ from: 0, to: 1, start: 1.6, end: 2.2 })(localTime);
  const cuePrimaryDx = animate({ from: 12, to: 0, start: 1.6, end: 2.2, ease: Easing.easeOutCubic })(localTime);
  const cueSecondaryOp = animate({ from: 0, to: 1, start: 2.4, end: 3.0 })(localTime);
  const cueSecondaryDx = animate({ from: 12, to: 0, start: 2.4, end: 3.0, ease: Easing.easeOutCubic })(localTime);
  return (
    <div style={{ position: "absolute", top: 40, left: x, width: 520, background: "rgba(15,17,21,0.86)", backdropFilter: "blur(24px) saturate(140%)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", overflow: "hidden", color: PAPER_DK, fontFamily: FONT_SANS }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: LIVE_RED, animation: "live-pulse 1.4s ease-in-out infinite" }} />
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: LIVE_RED }}>Live</span>
        <span style={{ fontSize: 12, color: "rgba(236,234,228,0.7)" }}>discovery · acme corp</span>
        <span style={{ marginLeft: "auto", fontFamily: FONT_MONO, fontSize: 11, color: "rgba(236,234,228,0.55)" }}>00:{String(35 + Math.floor(localTime)).padStart(2, "0")}</span>
      </div>
      <div style={{ padding: "12px 16px 8px", fontSize: 9, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: "rgba(236,234,228,0.5)" }}>cues</div>
      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {localTime > 1.6 && (
          <div style={{ position: "relative", padding: "16px 18px 16px 22px", background: "rgba(61,139,255,0.10)", border: "1px solid rgba(61,139,255,0.25)", borderRadius: 10, opacity: cuePrimaryOp, transform: `translateX(${cuePrimaryDx}px)` }}>
            <span style={{ position: "absolute", left: 0, top: 10, bottom: 10, width: 3, background: CUE_BLUE, borderRadius: 2 }} />
            <div style={{ fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase" as const, fontWeight: 600, color: CUE_BLUE_LT, marginBottom: 8 }}>pricing objection → reframe to value</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 13, lineHeight: 1.55 }}>Acme has 14 AEs (per LinkedIn). At their ACV ($45k), one extra deal/quarter pays for the full team license. Lead with ROI, not seat price.</div>
            <div style={{ fontStyle: "italic", fontSize: 11.5, color: "rgba(236,234,228,0.55)", marginTop: 8 }}>your pricing playbook + Acme LinkedIn</div>
          </div>
        )}
        {localTime > 2.2 && (
          <div style={{ position: "relative", padding: "12px 16px 12px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, opacity: cueSecondaryOp, transform: `translateX(${cueSecondaryDx}px)` }}>
            <span style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: "rgba(255,255,255,0.25)", borderRadius: 1 }} />
            <div style={{ fontSize: 9.5, letterSpacing: "0.10em", textTransform: "uppercase" as const, fontWeight: 600, color: "rgba(236,234,228,0.55)", marginBottom: 6 }}>competitor note</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: PAPER_DK }}>Gong doesn't offer real-time. That's the wedge.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 4: You speak ────────────────────────────────────────────────────

function SceneYouSpeak() {
  const { localTime } = useSprite();
  const camScale = animate({ from: 1.12, to: 1.0, start: 0, end: 1.2, ease: Easing.easeInOutCubic })(localTime);
  const camTx = animate({ from: -60, to: 0, start: 0, end: 1.2, ease: Easing.easeInOutCubic })(localTime);
  const camTy = animate({ from: 30, to: 0, start: 0, end: 1.2, ease: Easing.easeInOutCubic })(localTime);
  const reply = "Totally hear you on Gong's pricing. Quick question — what's your average deal size?";
  const startType = 1.2;
  const charsT = Math.max(0, localTime - startType);
  const chars = Math.min(reply.length, Math.floor(charsT * 28));
  return (
    <div style={{ position: "absolute", inset: 0, background: SLATE_900, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx}px, ${camTy}px) scale(${camScale})`, transformOrigin: "center" }}>
        <ZoomBackdrop />
        <div style={{ position: "absolute", top: 40, left: 1360, width: 520, opacity: 0.85 }}>
          <HUDWithFadingCue localTime={localTime} />
        </div>
        <div style={{ position: "absolute", left: 60, bottom: 220, width: 760, fontFamily: FONT_MONO, fontSize: 18, lineHeight: 1.55, color: PAPER_DK, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.55 }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "2px 6px", borderRadius: 3, background: "rgba(255,138,138,0.2)", color: "#FF8A8A", marginTop: 4, flex: "none" }}>P</span>
            <span>how are you guys priced?</span>
          </div>
          {localTime > startType && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "2px 6px", borderRadius: 3, background: "rgba(122,176,255,0.2)", color: "#7AB0FF", marginTop: 4, flex: "none" }}>You</span>
              <span>{reply.slice(0, chars)}{chars < reply.length && <span style={{ display: "inline-block", width: 8, height: 18, background: "rgba(236,234,228,0.6)", verticalAlign: "middle", marginLeft: 2, animation: "blink 0.9s steps(2) infinite" }} />}</span>
            </div>
          )}
        </div>
        {localTime > 5.5 && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, display: "flex", justifyContent: "center" }}>
            <Caption text="you speak. the cue softens. the call moves." opacity={animate({ from: 0, to: 1, start: 5.5, end: 6.3 })(localTime)} />
          </div>
        )}
      </div>
    </div>
  );
}

function HUDWithFadingCue({ localTime }: { localTime: number }) {
  const fadeOp = localTime > 4 ? Math.max(0.4, 1 - (localTime - 4) * 0.2) : 1;
  return (
    <div style={{ background: "rgba(15,17,21,0.86)", backdropFilter: "blur(24px) saturate(140%)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", overflow: "hidden", color: PAPER_DK, fontFamily: FONT_SANS }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: LIVE_RED, animation: "live-pulse 1.4s ease-in-out infinite" }} />
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: LIVE_RED }}>Live</span>
        <span style={{ fontSize: 12, color: "rgba(236,234,228,0.7)" }}>discovery · acme corp</span>
      </div>
      <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ position: "relative", padding: "14px 18px 14px 22px", background: "rgba(61,139,255,0.08)", border: "1px solid rgba(61,139,255,0.20)", borderRadius: 10, opacity: fadeOp }}>
          <span style={{ position: "absolute", left: 0, top: 10, bottom: 10, width: 3, background: CUE_BLUE, borderRadius: 2 }} />
          <div style={{ fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase" as const, fontWeight: 600, color: CUE_BLUE_LT, marginBottom: 6 }}>pricing objection → reframe to value</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 12.5, lineHeight: 1.55 }}>Lead with ROI, not seat price. ACV $45k × +1 deal = full license.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Scene 5: Closing tagline ──────────────────────────────────────────────

function SceneClose() {
  const { localTime } = useSprite();
  const beat1 = animate({ from: 0, to: 1, start: 1.4, end: 2.0 })(localTime);
  const beat2 = animate({ from: 0, to: 1, start: 2.8, end: 3.4 })(localTime);
  const beat3 = animate({ from: 0, to: 1, start: 4.2, end: 4.8 })(localTime);
  const wm = animate({ from: 0, to: 1, start: 6.0, end: 6.8 })(localTime);
  const wmTy = animate({ from: 12, to: 0, start: 6.0, end: 6.8, ease: Easing.easeOutCubic })(localTime);
  const cta = animate({ from: 0, to: 1, start: 7.3, end: 7.9 })(localTime);
  return (
    <div style={{ position: "absolute", inset: 0, background: SLATE_900, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 64 }}>
          <Beat text="it listens." opacity={beat1} />
          <Beat text="it thinks." opacity={beat2} />
          <Beat text="it cues you." opacity={beat3} accent />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: wm, transform: `translateY(${wmTy}px)` }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: LIVE_RED, animation: "live-pulse 1.4s ease-in-out infinite" }} />
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 56, letterSpacing: "-0.040em", color: PAPER_DK }}>cuedesk</span>
        </div>
        <div style={{ marginTop: 32, fontFamily: FONT_MONO, fontSize: 15, color: "rgba(236,234,228,0.55)", letterSpacing: "0.04em", opacity: cta }}>
          cuedesk.com · invite-only beta
        </div>
      </div>
    </div>
  );
}

function Beat({ text, opacity, accent }: { text: string; opacity: number; accent?: boolean }) {
  return (
    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 88, letterSpacing: "-0.035em", lineHeight: 1.0, opacity, color: accent ? PAPER_DK : "rgba(236,234,228,0.45)", transform: `translateY(${(1 - opacity) * 12}px)` }}>
      {text}
    </div>
  );
}

// ─── Export: DemoVideo ──────────────────────────────────────────────────────

export function DemoVideo() {
  return (
    <Stage width={1920} height={1080} duration={45} background={SLATE_900}>
      <Sprite start={0} end={4}><SceneTitle /></Sprite>
      <Sprite start={4} end={14}><SceneTheMoment /></Sprite>
      <Sprite start={14} end={24}><SceneCueArrives /></Sprite>
      <Sprite start={24} end={34}><SceneYouSpeak /></Sprite>
      <Sprite start={34} end={45}><SceneClose /></Sprite>
    </Stage>
  );
}
