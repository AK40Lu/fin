"use client";

import { useState } from "react";

const BLUE = "#06B6D4";
const GOLD = "#F59E0B";

const FinIcon = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" fill="none">
    <path
      d="M1 13 C4.5 13 6.5 9.5 8.5 5 C9.5 2.8 11.5 1.5 13.5 1.5 C15.5 1.5 17 2.8 17.5 5 L19 13 Z"
      fill={color}
    />
  </svg>
);

const phases = [
  {
    num: 1,
    weeks: "Weeks 1–2",
    name: "Idea + Customer",
    theme: "Who buys it and why. Real costs, real price, real profit math. The one question every investor asks first — answered before you build a single thing.",
    color: BLUE,
  },
  {
    num: 2,
    weeks: "Weeks 3–4",
    name: "First Version",
    theme: "Make the minimum thing that could actually be sold. Test it on a real customer — not family. Hear the feedback. Adjust. This is what separates ideas from businesses.",
    color: "#6366F1",
  },
  {
    num: 3,
    weeks: "Weeks 5–6",
    name: "The Pitch",
    theme: "Prepare the pitch. Find the buyer. Close the deal. Real money from a real customer — then debrief everything. This is what the room looks like. Fin gets them ready before they're ever in it.",
    color: GOLD,
  },
];

const modes = [
  {
    icon: "💡",
    name: "Session Start",
    trigger: '"What are we working on?" / beginning of any session',
    body: 'Fin reads the venture log first — current phase, what was assigned, what was completed. Opens with a brief orientation: "Week [N]. Here\'s where we left off." Then asks one question. Never starts coaching without reading the log.',
    out: "Orientation + the one most important question for today",
  },
  {
    icon: "📐",
    name: "Concept Check",
    trigger: '"What\'s a profit margin?" / any business concept question',
    body: "Fin never explains a concept in the abstract. It asks what the kid already thinks the concept means — then teaches it through their actual idea. Pricing taught through their cookie price. Marketing taught through how their neighbors find out. One concept per session, always.",
    out: "Concept explained through the kid's real business, verified with a \"say it back\" test",
  },
  {
    icon: "📋",
    name: "Venture Review",
    trigger: '"I tried selling" / "Here\'s what happened this week"',
    body: 'First question is always "Tell me what happened." Not what they planned — what actually happened. Fin listens before analyzing. After the account is complete: what worked, what didn\'t, what\'s the one thing to change. Compliance gaps are named, not skipped.',
    out: "Real account heard + pattern identified + one adjustment",
  },
  {
    icon: "⚡",
    name: "Stuck / Frustrated",
    trigger: '"Nobody bought" / "I don\'t want to do this anymore"',
    body: "Fin listens fully. Reflects back before diagnosing. \"I want to quit\" is data, not a verdict — Fin asks what specifically isn't working. Frustration is treated as information about a problem that has a solution, not as a feeling to be managed away.",
    out: "Root cause identified + one concrete next step — never generic encouragement",
  },
  {
    icon: "👨‍👩‍👧",
    name: "Parent Calibration",
    trigger: "Parent asks about progress / parent-led question",
    body: "Fin addresses the parent briefly, then redirects to the kid's perspective. At the end of every session with a parent present: a co-learner summary — what was worked on, one specific thing to help with this week, one specific thing not to do. The parent learns alongside, not above.",
    out: "Parent briefed + co-learner task assigned + one \"don't\" named",
  },
];

const judgments = [
  { trigger: '"Can you just write my business plan?"',       resp: '"I\'m not going to write it for you. You\'re going to write it — I\'ll help you think through each piece. That\'s the whole point."' },
  { trigger: '"I want to sell to everyone"',                 resp: '"Everyone is not a customer. Name one person — their age, their situation, why they\'d care. Start there."' },
  { trigger: '"Let\'s skip testing and just start selling"', resp: '"One person first. Find one real person, tell them the price, and see what they say. That\'s your test. Then we sell."' },
  { trigger: '"I\'ll start for real next week"',             resp: '"You\'ve said that before. What\'s actually stopping you this week? Let\'s fix that — not move the date."' },
  { trigger: "Price set below cost",                         resp: '"Your cost is higher than your price. Every sale loses money. We fix this before you sell a single unit."' },
  { trigger: '"I want to pitch to investors"',               resp: '"You need a paying customer first. One person who gives you real money. That\'s your proof. Everything else comes after."' },
];

const fileGroups = [
  {
    label: "Kid Memory",
    color: BLUE,
    files: [
      { name: "kid-profile.md",  desc: "Idea, age, strengths, blockers, parent info" },
      { name: "venture-log.md",  desc: "Progress, compliance, concepts learned, open items" },
    ],
  },
  {
    label: "Coaching Brain",
    color: "#6366F1",
    files: [
      { name: "01-identity.md", desc: "Voice, philosophy, what Fin is and isn't" },
      { name: "02-rules.md",    desc: "All modes, judgment calls, parent rules" },
      { name: "03-examples.md", desc: "5 complete coaching conversations" },
    ],
  },
  {
    label: "Reference Library",
    color: GOLD,
    files: [
      { name: "01-business-concepts.md",  desc: "10 concepts taught through the kid's idea" },
      { name: "02-parent-guide.md",       desc: "Co-learner playbook — what to do and what not to" },
      { name: "03-money-math.md",         desc: "Cost, pricing, profit, margin — real numbers only" },
      { name: "04-customer-framework.md", desc: "Who buys, why, how to reach them" },
    ],
  },
  {
    label: "Venture Architecture",
    color: "#EC4899",
    files: [
      { name: "01-program-arc.md",      desc: "6-week arc from idea to first pitch" },
      { name: "02-session-template.md", desc: "Weekly session structure + variations" },
    ],
  },
];

export default function Page() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeMode, setActiveMode]   = useState(0);

  return (
    <div style={{ background: "#060A10", color: "#F5F5F0", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
           style={{ background: "rgba(6,10,16,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #141E2C" }}>
        <div className="flex items-center gap-2">
          <FinIcon size={18} color={BLUE} />
          <span className="font-bold tracking-wider text-sm" style={{ color: BLUE }}>Fin</span>
        </div>
        <div className="flex items-center gap-5 text-sm" style={{ color: "#9CA3AF" }}>
          <a href="#arc"      className="hover:text-white transition-colors hidden sm:block">The Arc</a>
          <a href="#modes"    className="hover:text-white transition-colors hidden sm:block">How It Works</a>
          <a href="#judgment" className="hover:text-white transition-colors hidden sm:block">The Pitch</a>
          <a href="https://github.com/AK40Lu/fin" target="_blank" rel="noreferrer"
             className="px-3 py-1.5 rounded text-xs font-semibold text-white"
             style={{ background: BLUE }}>
            GitHub →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24"
               style={{ background: "linear-gradient(180deg,#030608 0%,#060A10 100%)", minHeight: "100vh" }}>
        {/* large faint fin silhouette */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-end justify-center">
          <svg viewBox="0 0 400 280" width="700" fill="white"
               style={{ opacity: 0.04, marginBottom: "-40px", flexShrink: 0 }}>
            <path d="M20 260 C80 260 130 180 170 100 C190 55 225 30 265 30 C305 30 330 55 345 100 L380 260 Z" />
          </svg>
        </div>
        {/* ocean depth glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
               style={{ background: `radial-gradient(ellipse, ${BLUE}18, transparent 65%)` }} />
        </div>

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
               style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}40` }}>
            <FinIcon size={12} color={BLUE} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: BLUE }}>
              Before the big room
            </span>
          </div>

          <h1 className="font-bold tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem,6vw,4rem)", lineHeight: 1.1 }}>
            Your kid has an idea.<br />
            <span style={{ color: BLUE }}>Fin gets them ready to pitch it.</span>
          </h1>

          <p className="text-xl mb-4 mx-auto max-w-2xl" style={{ color: "#9CA3AF", lineHeight: 1.75 }}>
            A 1:1 business coach for kids 10–13. Six weeks. One idea. One real sale.
            The foundation every founder needs — before they&apos;re ever in the room.
          </p>
          <p className="text-base mb-4" style={{ color: "#6B7280" }}>
            The bakery. The dog-walking service. The friendship bracelets.<br />
            Whatever the idea is — that&apos;s where we start.
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10"
               style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: BLUE }} />
            <span className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
              No app to download &nbsp;·&nbsp; No curriculum to buy &nbsp;·&nbsp; No code to run
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#how-it-works" className="px-7 py-3.5 rounded-xl font-semibold text-white"
               style={{ background: BLUE }}>
              How it was built →
            </a>
            <a href="https://github.com/AK40Lu/fin" target="_blank" rel="noreferrer"
               className="px-7 py-3.5 rounded-xl font-semibold"
               style={{ background: "#0C1018", border: "1px solid #1A2030" }}>
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── PLAIN ENGLISH ── */}
      <section className="py-20 px-6" style={{ background: "#080C14" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What is this, actually?</h2>
            <p style={{ color: "#9CA3AF" }}>No jargon. Here&apos;s how it works in plain English.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                step: "1",
                title: "Claude Code is the runtime.",
                body: "Claude Code runs in your terminal and reads your project folder automatically. Point it at the Fin folder — the coach is live before you type a word. No setup beyond that.",
              },
              {
                step: "2",
                title: "12 files are the coaching brain.",
                body: "Plain-text markdown files tell Claude who Fin is, how to coach kids, what concepts to teach, how to handle parents, and what to say no to. No app. No backend. Instructions Claude reads before every session.",
              },
              {
                step: "3",
                title: "The memory lives in two files.",
                body: "The kid profile captures who they are and what they're building. The venture log grows every session — phase, compliance, concepts learned, open items. Fin reads both before saying a word. It builds over time.",
              },
            ].map(s => (
              <div key={s.step} className="p-6 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                     style={{ background: `${BLUE}20`, color: BLUE }}>{s.step}</div>
                <h3 className="font-semibold mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl flex items-start gap-4 mb-5"
               style={{ background: "#0C1018", border: `1px solid ${BLUE}35` }}>
            <span className="text-2xl flex-shrink-0">👨‍👩‍👧</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: BLUE }}>Two people in every session</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                Fin coaches two people at once: the kid, and the parent who shows up as a co-learner.
                The kid runs the business. The parent learns alongside — not above.
                At the end of every session, Fin gives the parent a specific briefing: what to help with,
                and what not to do. This isn&apos;t a babysitter in agent form. It&apos;s a coaching relationship
                that makes both participants better.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl flex items-start gap-4"
               style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: BLUE }}>The idea is the curriculum</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                Fin never teaches &quot;profit margin&quot; as a concept. It teaches profit margin
                by calculating the exact margin on your kid&apos;s cookie business.
                Generic lessons are noise. Real numbers from a real idea stick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: "#060A10" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">How It Was Built</h2>
            <p style={{ color: "#9CA3AF" }}>Every coaching behavior lives in plain text. The memory is a file. The judgment is markdown.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-12 text-center">
            {[
              { n: "12", label: "files total" },
              { n: "0",  label: "lines of code" },
              { n: "2",  label: "users per session" },
            ].map(s => (
              <div key={s.n} className="p-6 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
                <div className="text-4xl font-bold mb-1" style={{ color: BLUE }}>{s.n}</div>
                <div className="text-sm" style={{ color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { n: "1", t: "Open with Claude Code", b: "Clone the repo and run Claude Code from the project directory. CLAUDE.md is read automatically — Fin is live before you type a word." },
              { n: "2", t: "Fill the kid profile",  b: "kid-profile.md: the idea, the kid's age and strengths, the parent's background. Or let Fin run onboarding questions in the first session." },
              { n: "3", t: "Start the program",     b: "Fin reads the profile, confirms what it knows, and builds out the 6-week venture arc — Phase 1 in full, Phases 2–3 revealed as they're earned through real action." },
            ].map(s => (
              <div key={s.n} className="p-6 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                     style={{ background: `${BLUE}20`, color: BLUE }}>{s.n}</div>
                <h3 className="font-semibold mb-2">{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{s.b}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#0C1018", border: `1px solid ${BLUE}30` }} className="p-6 rounded-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: BLUE }}>System architecture</p>
            <div className="p-4 rounded-xl mb-2 flex items-center gap-3"
                 style={{ background: "#060A10", border: `2px solid ${BLUE}60` }}>
              <span className="text-base">⚙️</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm font-mono font-bold" style={{ color: "#F5F5F0" }}>CLAUDE.md</code>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${BLUE}20`, color: BLUE }}>Orchestrator</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  Entry point — defines Fin, sets load order, routes every session
                </p>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <div className="w-px h-5" style={{ background: "#1A2030" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fileGroups.map(g => (
                <div key={g.label} className="p-3 rounded-xl" style={{ background: "#060A10", border: "1px solid #141E2C" }}>
                  <p className="text-xs font-semibold tracking-wide uppercase mb-2.5"
                     style={{ color: g.color }}>{g.label}</p>
                  <div className="space-y-2">
                    {g.files.map(f => (
                      <div key={f.name}>
                        <code className="text-xs font-mono block" style={{ color: "#D0D0C8" }}>{f.name}</code>
                        <p className="text-xs mt-0.5 leading-snug" style={{ color: "#4A4A4A" }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VENTURE ARC ── */}
      <section id="arc" className="py-24 px-6" style={{ background: "#080C14" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">The 6-Week Venture Arc</h2>
            <p style={{ color: "#9CA3AF" }}>
              Fin reveals one phase at a time. The goal of Week 6: one real deal — real money, real customer, real debrief.
            </p>
          </div>
          <div className="relative mb-10">
            <div className="absolute top-5 left-0 right-0 h-px" style={{ background: "#141E2C" }} />
            <div className="flex justify-around relative">
              {phases.map((p, i) => (
                <button key={p.num} onClick={() => setActivePhase(i)} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-200"
                       style={{
                         background: i === activePhase ? p.color : "#141E2C",
                         color: i === activePhase ? "#fff" : "#6B7280",
                         transform: i === activePhase ? "scale(1.2)" : "scale(1)",
                         border: `2px solid ${i === activePhase ? p.color : "#1A2030"}`,
                       }}>
                    {p.num}
                  </div>
                  <span className="text-xs hidden md:block" style={{ color: i === activePhase ? p.color : "#6B7280" }}>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl transition-all duration-200"
               style={{ background: "#0C1018", border: `1px solid ${phases[activePhase].color}50` }}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase block mb-1"
                      style={{ color: phases[activePhase].color }}>
                  Phase {phases[activePhase].num} · {phases[activePhase].weeks}
                </span>
                <h3 className="text-2xl font-bold">{phases[activePhase].name}</h3>
              </div>
            </div>
            <p className="leading-relaxed" style={{ color: "#9CA3AF" }}>{phases[activePhase].theme}</p>
            {activePhase < 2 && (
              <button onClick={() => setActivePhase(activePhase + 1)}
                      className="mt-6 text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
                      style={{ color: phases[activePhase].color }}>
                Next: {phases[activePhase + 1].name} →
              </button>
            )}
            {activePhase === 2 && (
              <p className="mt-6 text-sm" style={{ color: "#4A4A4A" }}>
                After the first deal: more sales, scale, or a new idea. The kid decides. Fin helps them think through the tradeoffs.
              </p>
            )}
          </div>
          <p className="text-center text-xs mt-5" style={{ color: "#4A4A4A" }}>
            Phase 3 is not unlocked until Phase 2 is earned. Progress is based on what the kid does — not what they discuss.
          </p>
        </div>
      </section>

      {/* ── MODES ── */}
      <section id="modes" className="py-24 px-6" style={{ background: "#060A10" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">Five Coaching Modes</h2>
            <p style={{ color: "#9CA3AF" }}>Fin identifies the mode from context. No menu. No prompt needed.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
            {modes.map((m, i) => (
              <button key={m.name} onClick={() => setActiveMode(i)}
                      className="p-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: i === activeMode ? `${BLUE}18` : "#0C1018",
                        border: `1px solid ${i === activeMode ? BLUE : "#141E2C"}`,
                      }}>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-xs font-medium" style={{ color: i === activeMode ? BLUE : "#9CA3AF" }}>
                  {m.name}
                </div>
              </button>
            ))}
          </div>
          <div className="p-8 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{modes[activeMode].icon}</span>
              <h3 className="text-xl font-bold">{modes[activeMode].name}</h3>
            </div>
            <p className="text-xs font-mono mb-5" style={{ color: "#6B7280" }}>Trigger: {modes[activeMode].trigger}</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#9CA3AF" }}>{modes[activeMode].body}</p>
            <div className="p-3 rounded-xl text-sm" style={{ background: "#060A10" }}>
              <span style={{ color: BLUE }}>Output: </span>
              <span style={{ color: "#9CA3AF" }}>{modes[activeMode].out}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── JUDGMENT ── */}
      <section id="judgment" className="py-24 px-6" style={{ background: "#080C14" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">The Pitch Room Mindset</h2>
            <p style={{ color: "#9CA3AF" }}>
              Real investors don&apos;t soften hard truths. Neither does Fin.<br />
              Every hold comes with a reason — and the coaching doesn&apos;t move on until it&apos;s heard.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            {judgments.map((v, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "#D0D0C8" }}>{v.trigger}</p>
                <p className="text-sm italic leading-relaxed" style={{ color: "#6B7280" }}>{v.resp}</p>
              </div>
            ))}
          </div>
          <div className="p-8 rounded-2xl" style={{ background: "#030608", border: `1px solid ${BLUE}50` }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: BLUE }}>
              The Co-Learner Hold
            </p>
            <p className="text-2xl font-bold mb-4 leading-snug" style={{ color: "#F5F5F0" }}>
              &quot;This is your kid&apos;s business.<br />
              Your job is questions, not answers.&quot;
            </p>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#9CA3AF" }}>
              When a parent starts directing the session — answering questions meant for the kid, steering decisions, taking over — Fin redirects directly:
              <em style={{ color: "#D0D0C8" }}> &quot;I want to hear your kid&apos;s take first.&quot; </em>
              After three redirects that don&apos;t hold, Fin names the pattern to the parent and resets the co-learner contract.
              A parent who runs the session produces a kid who waits to be told what to do. That&apos;s the opposite of the goal.
            </p>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS ── */}
      <section className="py-24 px-6" style={{ background: "#060A10" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">Built on Real Research</h2>
            <p style={{ color: "#9CA3AF" }}>Four disciplines, woven together. Not assembled — applied.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                name: "Bloom's 2-Sigma Problem",
                src: "Benjamin Bloom, 1984",
                body: "One-on-one tutoring outperforms classroom instruction by two standard deviations. The average tutored student performs better than 98% of classroom-taught students. Fin brings that same individualized relationship to entrepreneurship education.",
              },
              {
                name: "Customer Discovery",
                src: "Steve Blank — The Startup Owner's Manual",
                body: "No business plan survives first contact with a customer. Phase 1 of the arc requires the kid to talk to a real potential customer before building anything. The customer's response — not the kid's idea — determines what gets built.",
              },
              {
                name: "Growth Mindset",
                src: "Carol Dweck — Mindset",
                body: "Failure is not a verdict on the kid. It is data about the approach. Fin never lets a setback become a label. Every \"nobody bought\" becomes \"what do we know now that we didn't before, and what's the next experiment?\"",
              },
              {
                name: "Autonomy + Mastery + Purpose",
                src: "Daniel Pink — Drive",
                body: "Intrinsic motivation — the only kind that survives past the first sale — requires autonomy over decisions, visible growth in skill, and a goal that means something. Fin's arc is engineered to produce all three.",
              },
            ].map(f => (
              <div key={f.name} className="p-6 rounded-2xl" style={{ background: "#0C1018", border: "1px solid #141E2C" }}>
                <h3 className="font-bold mb-1">{f.name}</h3>
                <p className="text-xs italic mb-3" style={{ color: BLUE }}>{f.src}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ background: "#030608", borderTop: "1px solid #0C1018" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <FinIcon size={14} color={BLUE} />
          <span className="text-xs font-semibold tracking-wider" style={{ color: BLUE }}>Fin</span>
        </div>
        <p className="text-xs mb-1" style={{ color: "#333" }}>
          Benjamin Bloom · <em>The 2-Sigma Problem</em> &nbsp;·&nbsp;
          Steve Blank · <em>The Startup Owner&apos;s Manual</em> &nbsp;·&nbsp;
          Carol Dweck · <em>Mindset</em> &nbsp;·&nbsp;
          Daniel Pink · <em>Drive</em>
        </p>
        <p className="text-xs mt-1" style={{ color: "#2A2A2A" }}>Skool Competition #5 — The Coach</p>
      </footer>

    </div>
  );
}
