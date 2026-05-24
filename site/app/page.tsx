"use client";

import { useState } from "react";

const TEAL   = "#0D9488";
const AMBER  = "#B45309";
const INDIGO = "#4F46E5";
const TEXT   = "#1A1A17";
const TEXT_2 = "#5C5850";
const TEXT_3 = "#9C9890";
const BORDER = "#E5E2DC";
const SURFACE = "#FFFFFF";
const BG     = "#F8F7F4";
const BG_ALT = "#F0EDE8";

const FinIcon = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 20 14" fill="none">
    <path d="M1 13 C4.5 13 6.5 9.5 8.5 5 C9.5 2.8 11.5 1.5 13.5 1.5 C15.5 1.5 17 2.8 17.5 5 L19 13 Z" fill={color} />
  </svg>
);

const phases = [
  {
    num: 1, weeks: "Weeks 1–2", name: "Idea + Customer", label: "Module 1", color: TEAL,
    theme: "Start with a real person, not a concept. Who would actually buy this? What would they pay? Real costs, real price, real profit math — all calculated against your kid's specific idea before a single thing gets built.",
  },
  {
    num: 2, weeks: "Weeks 3–4", name: "First Version", label: "Module 2", color: INDIGO,
    theme: "Build the smallest thing that could actually be sold. Test it on one real customer — not family. Hear the actual feedback. Adjust. This is the part most kids skip — and it's the part that matters most.",
  },
  {
    num: 3, weeks: "Weeks 5–6", name: "First Sale", label: "Module 3", color: AMBER,
    theme: "Find the buyer. Have the conversation. Take real money. Then sit down and debrief everything — what worked, what didn't, and what happens next. The first sale is the real lesson.",
  },
];

const modes = [
  {
    name: "Session Start", trigger: "Beginning of any session",
    body: "Fin reads the venture log first — current module, what was assigned, what was completed. Opens with a brief orientation: \"Week [N]. Here's where we left off.\" Then asks one question. Never starts coaching without reading the log.",
    out: "Orientation + the one most important question for today",
  },
  {
    name: "Concept Check", trigger: "Any business concept question",
    body: "Fin never explains a concept in the abstract. It asks what the kid already thinks the concept means — then teaches it through their actual idea. Pricing taught through their cookie price. Marketing taught through how their neighbors find out. One concept per session, always.",
    out: "Concept explained through the kid's real business, verified with a \"say it back\" test",
  },
  {
    name: "Venture Review", trigger: "\"Here's what happened this week\"",
    body: "First question is always \"Tell me what happened.\" Not what they planned — what actually happened. Fin listens before analyzing. After the account is complete: what worked, what didn't, what's the one thing to change.",
    out: "Real account heard + pattern identified + one adjustment",
  },
  {
    name: "Stuck / Frustrated", trigger: "\"Nobody bought\" / \"I don't want to do this\"",
    body: "Fin listens fully before diagnosing. \"I want to quit\" is data, not a verdict — Fin asks what specifically isn't working. Frustration is treated as information about a problem that has a solution, not a feeling to be managed away.",
    out: "Root cause identified + one concrete next step",
  },
  {
    name: "Parent Check-in", trigger: "Parent-led question / end of session",
    body: "Fin addresses the parent briefly, then redirects to the kid's perspective. At the end of every session: a co-learner summary — what was worked on, one specific thing to help with this week, one specific thing not to do.",
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
    label: "Kid Memory", color: TEAL,
    files: [
      { name: "kid-profile.md", desc: "The idea, age, strengths, blockers" },
      { name: "venture-log.md", desc: "Progress, concepts learned, open items" },
    ],
  },
  {
    label: "Coaching Brain", color: INDIGO,
    files: [
      { name: "01-identity.md", desc: "Voice, philosophy, what Fin is and isn't" },
      { name: "02-rules.md",    desc: "All modes, judgment calls, parent rules" },
      { name: "03-examples.md", desc: "5 complete coaching conversations" },
    ],
  },
  {
    label: "Reference Library", color: AMBER,
    files: [
      { name: "01-business-concepts.md",  desc: "10 concepts taught through the kid's idea" },
      { name: "02-parent-guide.md",       desc: "Co-learner playbook" },
      { name: "03-money-math.md",         desc: "Cost, pricing, profit, margin" },
      { name: "04-customer-framework.md", desc: "Who buys, why, how to reach them" },
    ],
  },
  {
    label: "Venture Architecture", color: "#EC4899",
    files: [
      { name: "01-program-arc.md",      desc: "6-week arc from idea to first sale" },
      { name: "02-session-template.md", desc: "Weekly session structure" },
    ],
  },
];

export default function Page() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeMode, setActiveMode]   = useState(0);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
           style={{ background: "rgba(248,247,244,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2">
          <FinIcon size={16} color={TEAL} />
          <span className="font-semibold text-sm" style={{ color: TEAL }}>Fin</span>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: TEXT_2 }}>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors hidden sm:block">How it works</a>
          <a href="#arc"          className="hover:text-gray-900 transition-colors hidden sm:block">The arc</a>
          <a href="#coaching"     className="hover:text-gray-900 transition-colors hidden sm:block">Coaching</a>
          <a href="https://github.com/AK40Lu/fin" target="_blank" rel="noreferrer"
             className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-gray-100"
             style={{ border: `1px solid ${BORDER}`, color: TEXT_2 }}>
            GitHub
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium"
               style={{ background: `${TEAL}12`, color: TEAL, border: `1px solid ${TEAL}28` }}>
            <FinIcon size={11} color={TEAL} />
            For kids 10–13 · with their parent
          </div>

          <h1 className="font-bold tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem,5.5vw,3.75rem)", lineHeight: 1.1 }}>
            Your kid&apos;s idea<br />
            <span style={{ color: TEAL }}>is the classroom.</span>
          </h1>

          <p className="text-lg mb-3 mx-auto max-w-xl" style={{ color: TEXT_2, lineHeight: 1.8 }}>
            Fin is a 1:1 business coach that teaches real concepts through the thing they actually want to build — one module at a time, earned through real action.
          </p>
          <p className="text-sm mb-8" style={{ color: TEXT_3 }}>
            The bakery. The dog-walking service. The friendship bracelets. Whatever the idea is — that&apos;s where every lesson starts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a href="#how-it-works" className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
               style={{ background: TEAL }}>
              How it works →
            </a>
            <a href="https://github.com/AK40Lu/fin" target="_blank" rel="noreferrer"
               className="px-6 py-3 rounded-xl font-medium text-sm transition-colors hover:bg-gray-50"
               style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT_2 }}>
              View on GitHub
            </a>
          </div>

          {/* privacy note */}
          <div className="inline-block text-left px-5 py-4 rounded-xl mx-auto"
               style={{ background: BG_ALT, border: `1px solid ${BORDER}` }}>
            <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>What Fin doesn&apos;t ask for</p>
            <p className="text-sm" style={{ color: TEXT_2 }}>
              No name. No school. No personal information of any kind. The only input Fin needs is the idea — everything else stays inside the session and is never stored or repeated.
            </p>
            <p className="text-xs mt-2" style={{ color: TEXT_3 }}>
              A future version will let parents configure their own guardrails before the first session.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6" style={{ background: BG_ALT }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>How it works</p>
            <h2 className="text-3xl font-bold mb-4">1:1 coaching, built from a folder.</h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: TEXT_2, lineHeight: 1.75 }}>
              Benjamin Bloom&apos;s research showed that 1:1 tutoring outperforms classroom instruction by two standard deviations — the average tutored student performs better than 98% of classroom-taught peers. Fin applies that same principle to business education: every concept is taught through your kid&apos;s actual idea, not a hypothetical. That&apos;s what makes it stick.
            </p>
          </div>

          {/* setup steps */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { step: "1", title: "Open with Claude Code", body: "Run Claude Code from the project directory. CLAUDE.md is read automatically — Fin is live before you type a word. No app. No login. No setup beyond that." },
              { step: "2", title: "Drop in the idea",       body: "kid-profile.md holds one thing: what the kid wants to build. Age, strengths, and parent context go in too — or Fin collects them in the first session." },
              { step: "3", title: "Start Module 1",         body: "Fin reads the profile and begins coaching through the idea immediately. Module 2 and 3 unlock only when the previous module is earned through real action." },
            ].map(s => (
              <div key={s.step} className="p-6 rounded-2xl"
                   style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 text-white"
                     style={{ background: TEAL }}>{s.step}</div>
                <h3 className="font-semibold mb-2" style={{ color: TEXT }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_2 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* stats */}
          <div className="grid md:grid-cols-3 gap-4 text-center mb-8">
            {[
              { n: "12", label: "files total" },
              { n: "0",  label: "lines of code" },
              { n: "2",  label: "people per session" },
            ].map(s => (
              <div key={s.n} className="p-5 rounded-2xl"
                   style={{ background: `${TEAL}0C`, border: `1px solid ${TEAL}22` }}>
                <div className="text-3xl font-bold mb-1" style={{ color: TEAL }}>{s.n}</div>
                <div className="text-sm" style={{ color: TEXT_2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* two people */}
          <div className="p-6 rounded-2xl mb-5"
               style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <p className="font-semibold mb-2" style={{ color: TEXT }}>Two people in every session</p>
            <p className="text-sm leading-relaxed" style={{ color: TEXT_2 }}>
              Fin is designed to be used with a parent in the room. The kid drives — the idea, the decisions, the work. The parent participates as a co-learner: engaged, but not in charge. At the end of every session, Fin produces a specific brief for the parent: one thing to help with this week, and one thing to leave alone.
            </p>
          </div>

          {/* architecture */}
          <div className="p-6 rounded-2xl"
               style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: TEXT_3 }}>System architecture</p>
            <div className="p-4 rounded-xl mb-3 flex items-center gap-3"
                 style={{ background: `${TEAL}08`, border: `1px solid ${TEAL}28` }}>
              <div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono font-semibold" style={{ color: TEXT }}>CLAUDE.md</code>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${TEAL}15`, color: TEAL }}>Orchestrator</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: TEXT_3 }}>Entry point — defines Fin, sets load order, routes every session</p>
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <div className="w-px h-4" style={{ background: BORDER }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fileGroups.map(g => (
                <div key={g.label} className="p-3 rounded-xl"
                     style={{ background: BG_ALT, border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: g.color }}>{g.label}</p>
                  <div className="space-y-2">
                    {g.files.map(f => (
                      <div key={f.name}>
                        <code className="text-xs font-mono block" style={{ color: TEXT }}>{f.name}</code>
                        <p className="text-xs mt-0.5 leading-snug" style={{ color: TEXT_3 }}>{f.desc}</p>
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
      <section id="arc" className="py-20 px-6" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>Module-driven learning</p>
            <h2 className="text-3xl font-bold mb-3">Six weeks. Three modules. One real sale.</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: TEXT_2 }}>
              Each module unlocks only when the previous one is earned — through action, not time. Fin reveals the next stage when the kid is ready for it.
            </p>
          </div>

          <div className="relative mb-8">
            <div className="absolute top-5 left-0 right-0 h-px" style={{ background: BORDER }} />
            <div className="flex justify-around relative">
              {phases.map((p, i) => (
                <button key={p.num} onClick={() => setActivePhase(i)} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-200"
                       style={{
                         background: i === activePhase ? p.color : BORDER,
                         color: i === activePhase ? "#fff" : TEXT_3,
                         transform: i === activePhase ? "scale(1.15)" : "scale(1)",
                       }}>
                    {p.num}
                  </div>
                  <span className="text-xs font-medium hidden md:block"
                        style={{ color: i === activePhase ? p.color : TEXT_3 }}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl transition-all duration-200"
               style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div className="mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: `${phases[activePhase].color}14`, color: phases[activePhase].color }}>
                {phases[activePhase].label} · {phases[activePhase].weeks}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: TEXT }}>{phases[activePhase].name}</h3>
            <p className="text-base leading-relaxed" style={{ color: TEXT_2 }}>{phases[activePhase].theme}</p>
            {activePhase < 2 && (
              <button onClick={() => setActivePhase(activePhase + 1)}
                      className="mt-6 text-sm font-medium hover:opacity-75 transition-opacity"
                      style={{ color: phases[activePhase].color }}>
                Next: {phases[activePhase + 1].name} →
              </button>
            )}
            {activePhase === 2 && (
              <p className="mt-6 text-sm" style={{ color: TEXT_3 }}>
                After the first sale: more sales, scale, or a new idea. The kid decides. Fin helps them think through the tradeoffs.
              </p>
            )}
          </div>
          <p className="text-center text-xs mt-4" style={{ color: TEXT_3 }}>
            Module 3 doesn&apos;t unlock until Module 2 is earned. Progress is based on what the kid does — not what they say.
          </p>
        </div>
      </section>

      {/* ── COACHING MODES ── */}
      <section id="coaching" className="py-20 px-6" style={{ background: BG_ALT }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>How Fin coaches</p>
            <h2 className="text-3xl font-bold mb-3">Five modes. No menu required.</h2>
            <p className="text-base max-w-md mx-auto" style={{ color: TEXT_2 }}>
              Fin reads the context and shifts automatically — the kid never has to say what kind of help they need.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
            {modes.map((m, i) => (
              <button key={m.name} onClick={() => setActiveMode(i)}
                      className="px-3 py-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: i === activeMode ? `${TEAL}0E` : SURFACE,
                        border: `1px solid ${i === activeMode ? TEAL : BORDER}`,
                        boxShadow: i === activeMode ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
                      }}>
                <div className="text-xs font-medium leading-snug"
                     style={{ color: i === activeMode ? TEAL : TEXT_2 }}>{m.name}</div>
              </button>
            ))}
          </div>
          <div className="p-8 rounded-2xl"
               style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div className="mb-1">
              <h3 className="text-xl font-bold" style={{ color: TEXT }}>{modes[activeMode].name}</h3>
            </div>
            <p className="text-xs mb-5" style={{ color: TEXT_3 }}>Triggered by: {modes[activeMode].trigger}</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT_2 }}>{modes[activeMode].body}</p>
            <div className="p-3 rounded-xl text-sm" style={{ background: BG_ALT }}>
              <span className="font-medium" style={{ color: TEAL }}>Output: </span>
              <span style={{ color: TEXT_2 }}>{modes[activeMode].out}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── JUDGMENT ── */}
      <section className="py-20 px-6" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>Coaching that holds its ground</p>
            <h2 className="text-3xl font-bold mb-3">Fin doesn&apos;t just agree.</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: TEXT_2 }}>
              A coach that says yes to everything teaches nothing. Every hold comes with a reason — and the session doesn&apos;t move on until it&apos;s heard.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {judgments.map((v, i) => (
              <div key={i} className="p-5 rounded-2xl"
                   style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: TEXT }}>{v.trigger}</p>
                <p className="text-sm italic leading-relaxed" style={{ color: TEXT_2 }}>{v.resp}</p>
              </div>
            ))}
          </div>

          {/* co-learner hold — rewritten to be honest about what the model actually does */}
          <div className="p-8 rounded-2xl"
               style={{ background: SURFACE, border: `1px solid ${TEAL}30`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>The co-learner rule</p>
            <p className="text-2xl font-bold mb-4 leading-snug" style={{ color: TEXT }}>
              &quot;This is your kid&apos;s business.<br />Your job is questions, not answers.&quot;
            </p>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: TEXT_2 }}>
              The rules are written into the system. Fin is instructed to keep decisions with the kid — when questions get answered on their behalf, the session loops back to the open question and waits. The co-learner brief at the end of every session tells the parent exactly what to help with and what to leave alone. A kid who watches a parent run their business learns to wait to be told what to do. That&apos;s the opposite of the point.
            </p>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="py-20 px-6" style={{ background: BG_ALT }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: TEAL }}>The foundation</p>
            <h2 className="text-3xl font-bold mb-3">Built on real research.</h2>
            <p className="text-base max-w-md mx-auto" style={{ color: TEXT_2 }}>Four disciplines, applied — not assembled.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "Bloom's 2-Sigma Problem", src: "Benjamin Bloom, 1984",
                body: "1:1 tutoring outperforms classroom instruction by two standard deviations. The average tutored student performs better than 98% of classroom-taught students. Fin brings that same individualized relationship to business education." },
              { name: "Customer Discovery", src: "Steve Blank — The Startup Owner's Manual",
                body: "No business plan survives first contact with a customer. Module 1 requires the kid to talk to a real potential customer before building anything. The customer's response — not the kid's assumption — determines what gets built." },
              { name: "Growth Mindset", src: "Carol Dweck — Mindset",
                body: "Failure is not a verdict on the kid — it's data about the approach. Fin never lets a setback become a label. Every \"nobody bought\" becomes \"what do we know now that we didn't before?\"" },
              { name: "Autonomy + Mastery + Purpose", src: "Daniel Pink — Drive",
                body: "Intrinsic motivation requires autonomy over decisions, visible growth in skill, and a goal that means something. Fin's module arc is engineered to produce all three — in that order." },
            ].map(f => (
              <div key={f.name} className="p-6 rounded-2xl"
                   style={{ background: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <h3 className="font-semibold mb-1" style={{ color: TEXT }}>{f.name}</h3>
                <p className="text-xs italic mb-3" style={{ color: TEAL }}>{f.src}</p>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_2 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING SUMMARY ── */}
      <section className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: TEAL }}>What they walk away with</p>
          <h2 className="text-3xl font-bold mb-6" style={{ lineHeight: 1.25 }}>
            Six weeks. Three modules.<br />One thing that actually happened.
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: TEXT_2 }}>
            By the end of Module 3, your kid has talked to a real potential customer, built a minimum version of their idea, and made at least one real sale — real money, real conversation, real debrief.
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: TEXT_2 }}>
            The concepts — pricing, margins, customer discovery, what a real cost looks like — live in their memory because every one was taught through the thing they were actually building. Not a workbook. Their idea.
          </p>
          <div className="p-8 rounded-2xl mb-6"
               style={{ background: BG_ALT, border: `1px solid ${BORDER}` }}>
            <p className="font-semibold mb-2" style={{ color: TEXT }}>The system is free.</p>
            <p className="text-sm mb-5" style={{ color: TEXT_2 }}>
              Clone the repo, point Claude Code at the folder, fill in the idea. Fin is live before you type a second word.
            </p>
            <a href="https://github.com/AK40Lu/fin" target="_blank" rel="noreferrer"
               className="inline-block px-6 py-3 rounded-xl font-semibold text-white text-sm"
               style={{ background: TEAL }}>
              Get started on GitHub →
            </a>
          </div>
          <p className="text-xs" style={{ color: TEXT_3 }}>
            Requires Claude Code (free tier available) · No other dependencies
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ background: BG_ALT, borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <FinIcon size={13} color={TEAL} />
          <span className="text-xs font-semibold" style={{ color: TEAL }}>Fin</span>
        </div>
        <p className="text-xs" style={{ color: TEXT_3 }}>
          Benjamin Bloom · Steve Blank · Carol Dweck · Daniel Pink
        </p>
        <p className="text-xs mt-1" style={{ color: "#C0BAB0" }}>Skool Competition #5 — The Coach</p>
      </footer>

    </div>
  );
}
