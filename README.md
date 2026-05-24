# Fin — Kids Business Coach

**A 1:1 business coach for kids 10–13. Six weeks. One idea. One real sale.**

→ [fin-zeta-nine.vercel.app](https://fin-zeta-nine.vercel.app)

---

## What It Is

Fin is a personal business coach that runs entirely inside Claude Code. It takes a kid's actual idea — the bakery, the dog-walking service, the handmade jewelry — and uses that idea as the curriculum. Every business concept is taught through the thing they're trying to build, not in the abstract.

The program runs six weeks across three phases:

| Phase | Weeks | Goal |
|-------|-------|------|
| Idea + Customer | 1–2 | Know your cost, your price, your profit, and one real potential customer |
| First Version | 3–4 | Make something real and get a real customer response |
| First Sale | 5–6 | Close one real sale with someone outside the family |

---

## How It Works

Fin is not an app. It's a **folder-as-OS**: a set of markdown files that Claude Code reads at the start of every session. The files tell Claude who it's coaching, where they are in the program, and exactly how to behave.

**Claude Code is the runtime.** The markdown files are the coaching system.

To use Fin, you open Claude Code and point it at this directory. Claude reads `CLAUDE.md` first — that file orchestrates everything else.

---

## Setup

### Prerequisites
- [Claude Code](https://claude.ai/code) (Anthropic's CLI)

### Getting started

```bash
git clone https://github.com/AK40Lu/fin.git
cd fin
```

Open Claude Code in this directory:

```bash
claude
```

That's it. Claude reads `CLAUDE.md` on startup and begins the coaching session from there.

**First session:** Claude will introduce itself as Fin and walk through onboarding — one question at a time. No configuration needed.

---

## Before You Start

Fill in `kid-profile.md` before the first session, or let Fin gather the information through onboarding questions.

**What the profile asks for:**
- Age (just the number)
- The business idea in one sentence
- How the kid works best
- What tends to get in the way

**What it does not ask for:** No name, no school, no grade, no address, no identifying information. Fin addresses the kid as "you" throughout. This is non-negotiable — Fin is built for minors.

---

## File Structure

```
fin/
├── CLAUDE.md                  # Entry point — Claude reads this first every session
├── kid-profile.md             # Who Fin is coaching (fill in before first session)
├── venture-log.md             # Fin's memory — append after every session, never overwrite
│
├── 01-identity.md             # Fin's voice, philosophy, and what it is/isn't
├── 02-rules.md                # Full coaching ruleset — all session behaviors
├── 03-examples.md             # Complete example sessions showing Fin in action
│
├── venture/
│   ├── 01-program-arc.md      # The 6-week structure and phase completion criteria
│   └── 02-session-template.md # Standard weekly session flow
│
├── reference/
│   ├── 01-business-concepts.md  # Business concepts taught through the kid's idea
│   ├── 02-parent-guide.md       # Parent co-learner role and dynamics
│   ├── 03-money-math.md         # Pricing, cost, and profit frameworks
│   └── 04-customer-framework.md # Customer identification and validation
│
└── site/                      # Next.js landing page (deploys to Vercel)
```

---

## The Venture Log

`venture-log.md` is Fin's memory across sessions. At the end of every session, Fin generates a `VENTURE LOG UPDATE` block. Copy it and append it to the bottom of `venture-log.md` — do not replace what's already there.

The log tracks: task compliance, what was shipped, concept introduced, sticking points, parent co-learner notes, phase status, and open coaching items.

Without the log, Fin starts the next session blind.

---

## Parent Role

Parents are co-learners — present and supportive, but not in charge. The kid runs the business. The kid makes the calls.

At the end of every session, Fin gives the parent a brief summary: what concept was worked on, one specific thing to help with this week, and one thing not to do (usually: don't rescue them when it gets hard).

---

## Privacy

Fin is built for minors. Hard rules:

- No names — Fin never asks for a name and never uses one if offered
- No school, grade, address, social media, or identifying information
- Fin only holds what's in `kid-profile.md` — nothing more
- Anything outside business coaching scope gets redirected immediately, every time
- If something serious surfaces, Fin redirects to a trusted adult before continuing

---

## The Site

The landing page lives in `site/` — a Next.js app deployed to Vercel.

To run locally:

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Status

Active development. Core coaching system complete. Site live.
