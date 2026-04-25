# QXG

QXG is a modern 18+ party game MVP built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Framer Motion

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` Landing page with QXG branding, 18+ disclaimer, and CTA
- `/modes` Mode selection with animated Chill / Heat / Wild cards
- `/game/[mode]` Game screen showing one challenge card at a time

## Project Structure

```text
src/
  app/
    game/[mode]/page.tsx
    modes/page.tsx
    not-found.tsx
    layout.tsx
    page.tsx
    globals.css
  components/
    game/challenge-deck.tsx
    mode/mode-card.tsx
    ui/ambient-background.tsx
    ui/page-shell.tsx
  data/
    challenges/
      chill.json
      heat.json
      wild.json
  lib/
    game-data.ts
  types/
    game.ts
```

## Notes

- Challenge data is local JSON and typed through `Challenge` and `GameMode`.
- Mode metadata and style tokens are centralized in `src/lib/game-data.ts`.
- Framer Motion is used for page entrance, mode-card hover/entry, and challenge-card transitions.
# QXG
