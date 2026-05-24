# Assessor Guide — Fin Kids Business Coach

> Start here. This is how the coaching system works and where to find the best parts.

---

## The One-Paragraph Version

Fin is a 1:1 business coach for kids 10–13, built entirely with markdown files in a Claude Project. No code. No app. Thirteen files that tell Claude who Fin is, how to coach a kid through their actual business idea, how to handle the parent who's learning alongside, and what to say no to. The kid's idea — a bakery, a dog-walking service, a bracelet business — becomes the curriculum. Every business concept is taught through the specific numbers of their specific idea. The memory lives in two files that grow with every session.

---

## What Makes This Different

| What's in market | What Fin does |
|-----------------|----------------|
| Business education apps (games, simulations, quizzes) | Real idea, real stakes, real customer, real money |
| Generic entrepreneurship curriculum | The kid's actual idea is the curriculum — every lesson lives inside it |
| AI tutors that explain concepts | A coach who asks what the kid already thinks, then teaches through their numbers |
| Kid-only programs | Dual coaching: kid + parent co-learner, different roles, same session |

---

## Where to Look First

| What you want to see | File |
|---------------------|------|
| What Fin is and how sessions start | `CLAUDE.md` |
| Fin's voice and philosophy | `01-identity.md` |
| Full coaching ruleset (all modes, judgment calls, parent rules) | `02-rules.md` |
| Five complete coaching conversations | `03-examples.md` |
| The 6-week venture arc | `venture/01-program-arc.md` |
| How the parent role works | `reference/02-parent-guide.md` |
| Business concepts (taught through the idea) | `reference/01-business-concepts.md` |

---

## The Memory Architecture

Two files grow with the coaching relationship:

- `kid-profile.md` — who the kid is, their idea, their learning style, their parent's background
- `venture-log.md` — every session's output: what they shipped, what concept was introduced, sticking points, parent notes, open coaching items

Fin reads both before saying a word in any session. The longer the relationship, the more it knows. This is not a chatbot that resets. It builds.

---

## The Research Foundation

- **Bloom's 2-Sigma Problem (1984):** 1:1 tutoring outperforms classroom instruction by 2 standard deviations. Fin applies this to entrepreneurship.
- **Steve Blank — Customer Discovery:** No business plan survives first contact with a customer. Phase 1 requires a real conversation before anything is built.
- **Carol Dweck — Growth Mindset:** Failure is data. Fin treats "nobody bought" as diagnostic, not discouraging.
- **Daniel Pink — Drive:** Autonomy + mastery + purpose = intrinsic motivation. The arc produces all three.

---

## To Run It

1. Clone the repo
2. `cd spark/` and open Claude Code
3. CLAUDE.md is read automatically — Fin is live
4. Fill `kid-profile.md` or run onboarding in the first session
