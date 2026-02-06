tasks-phase4.md
Phase 4 – Visual Polish & Motion System for Ayoola Platform.

Legend:

[A] = Ayoola

[T] = Trae

1. Setup & Foundation
   4.1 [A] Decide and note the animation library for the project (recommended: Framer Motion for React/Next).

4.2 [T] Install and configure the chosen animation library in the repo.

4.3 [T] Create a motionConfig (or similar) file to store shared durations, easing, and offsets.

4.4 [T] Implement a small utility/hook to read prefers-reduced-motion and expose a boolean flag to components.

2. Hero Section (Layout + Motion)
   4.5 [A] Finalize hero content structure: left-side copy (headline, subtext, CTA) and right-side “systems visual” concept (cards/diagram/abstract block).
   ​

4.6 [T] Adjust hero layout to match the structure (left copy block, right visual), ensuring responsiveness.
​

4.7 [T] Implement hero entrance animation for headline and subtext (slide up + fade with stagger, using motionConfig).

4.8 [T] Implement hero visual animation (subtle scale 0.95 → 1 + fade on load, respecting reduced motion flag).

4.9 [T] Enhance hero CTA(s) with clear hover and focus states (color/border change plus subtle motion).

3. Scroll‑Triggered Section Reveals
   For each main section: About, Systems/Tools/Experiments, Selected Work, Blog, Contact.
   ​

4.10 [A] Confirm the final list and order of homepage sections for this phase.
​

4.11 [T] Wrap each section in a scroll‑triggered reveal using the chosen library (viewport/observer) with slide‑up + fade pattern.

4.12 [T] Add staggered child animations within each section (headings, paragraphs, cards).

4.13 [T] Integrate reduced‑motion handling so sections fall back to simple fade or no animation when required.

4. Card Interactions (Systems / Tools / Portfolio)
   4.14 [A] Identify all card types that should share the interaction pattern (systems, tools, selected work, etc.).
   ​

4.15 [T] Implement a shared card interaction variant: hover scale (≈1.02) and subtle shadow lift.

4.16 [T] Add a small arrow or icon animation on hover (e.g. slide/opacity change).

4.17 [T] Implement accessible focus-visible states for cards (outline/glow plus mild motion).

4.18 [T] Apply this shared card interaction pattern consistently across all identified card components.

5. Section Cohesion & Transitions
   4.19 [A] Choose the recurring transition motif (e.g. animated line/progress marker/flowing system path) and sketch where it appears.

4.20 [T] Implement the motif component and integrate it at the boundaries between major sections.

4.21 [T] Tune the motif animation so it remains subtle and does not compete with section content.

6. Visual Richness & Depth
   4.22 [A] Approve/update the color roles for backgrounds and accents to support new depth/gradients.

4.23 [T] Add at least one layered background gradient or shape behind key sections (hero, systems, selected work).

4.24 [T] Adjust spacing, font sizes, and line heights where motion and hierarchy need support (especially hero and section headings).

4.25 [T] Verify and fix contrast issues introduced by any new backgrounds or overlays.
​

7. Performance & Accessibility Pass
   4.26 [T] Test the homepage on desktop and mobile for jank, layout shift, and animation smoothness; note any problem spots.
   ​

4.27 [T] Run Lighthouse (or similar) and ensure performance scores remain acceptable (aiming for >80 Performance on homepage).
​

4.28 [T] Manually test with prefers-reduced-motion enabled and confirm the experience is comfortable and readable.

8. Documentation
   4.29 [T] Create a short internal markdown file or section in existing docs describing: hero motion, section reveal pattern, card interactions, and section transition motif.
   ​

4.30 [T] Document the motionConfig values (durations, easing, offsets) and how to use them for future components.
​
