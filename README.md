# Micheal Aderinto — Portfolio

A modern, dependency-free portfolio for Micheal Aderinto, Growth Marketer & Systems Builder.

## Positioning

The portfolio focuses on the connected system between acquisition and revenue:

**Google Ads → landing pages → GA4/GTM → CRM → AI-assisted follow-up → booked calls → revenue**

## Selected work

- Ad-to-Revenue Growth System
- KR Gutters Growth System
- Lightway Homes Lead System
- Chex Computers Storefront
- Megabros Enterprises

All project descriptions distinguish real implementations from portfolio demonstrations. Unsupported claims from the previous site were intentionally removed.

## Interactive lead intelligence proof

The portfolio includes a dependency-free browser demo that makes the CRM and AI layer concrete. Visitors can:

- move a synthetic lead through Acquire → Convert → Measure → Operate → Monetize;
- change budget, timeline, form-answer, and website-behaviour signals;
- inspect the score and written rationale at every stage;
- see conflicting signals held for human review;
- generate and copy a follow-up in three client voice styles; and
- copy a plain-English weekly attribution brief.

The demo intentionally uses deterministic, inspectable scoring and synthetic data. It does not collect visitor data or claim to make live model calls. The interface explains how a production reasoning layer would be grounded, constrained, logged, and reviewed.

## Run locally

The site has no build step or third-party runtime dependencies.

```bash
npx serve .
```

Open the local URL shown in the terminal.

## Deploy to Netlify

```bash
netlify deploy --prod --dir=.
```

The included `netlify.toml` sets the repository root as the publish directory and adds basic security headers.
