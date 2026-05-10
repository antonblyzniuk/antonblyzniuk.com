# Redesign Spec: antonblyzniuk.com → Professional Developer CV

## Context

This is a React + TypeScript portfolio site (Vite, Tailwind v4, Framer Motion via `motion/react`). All CV data is fetched from a REST API (`fetchCVData()`) and typed as `CVData` (see `src/types.ts`). The site currently renders either an AntOS desktop simulation (desktop) or a scroll layout with OS window frames (mobile). Both must be replaced with a single professional scroll layout.

**Goal:** A recruiter opens this site and in 10 seconds knows who Anton is, what he's built, and how to contact him. No gimmicks, no delays, clean dark professional aesthetic.

---

## What to Remove Entirely

| Item | File(s) | Reason |
|------|---------|--------|
| Boot sequence | `src/components/os/BootSequence.tsx` | Delays content 3–5 sec, irritating to recruiters |
| AntOS Desktop | `src/components/os/` (entire folder) | Gimmick that obscures content |
| Window frames | `src/components/WindowFrame.tsx` | Visual noise, no semantic value |
| Particle background | `src/components/ParticleBackground.tsx` | Distracting, hurts readability |
| Custom cursor | `src/components/CustomCursor.tsx` | Annoying on touch laptops |
| Scanline overlay | `src/index.css` `.scanline` class | |
| Grain texture | `src/index.css` `body::before` | Too heavy |
| `FallingNumbers.tsx` | already unused | Delete |
| `isMobile` split in App.tsx | `src/App.tsx` | Replace with single layout |
| `MobileToast` | `src/App.tsx` | |
| `AIChat` component | `src/components/AIChat.tsx` | Remove from main layout (too distracting for recruiters); keep file but don't render |

Keep: `motion/react`, all data fetching, `sendTelegramNotification`, PDF download, all `CVData` types.

---

## New App.tsx Structure

```tsx
// src/App.tsx — simplified

export default function App() {
  // Same fetch logic, same error state
  // Remove: bootDone, isMobile, ADMIN_SEQUENCE
  // Remove: BootSequence, Desktop, AIChat render
  // Remove: CustomCursor, ParticleBackground, scanline div

  if (!data) return <LoadingScreen />; // simple centered spinner, no boot animation
  
  return (
    <TooltipProvider>
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Experience data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <Achievements data={data} />
        {data.custom_sections.length > 0 && <CustomSections data={data} />}
        {data.photos.length > 1 && <Gallery data={data} />}
      </main>
      <Footer data={data} />
    </TooltipProvider>
  );
}
```

Section IDs: `#about`, `#experience`, `#skills`, `#projects`, `#contact`

---

## Design System

### Color Palette (replace `src/index.css` `@theme` block)

```css
@theme {
  --font-display: "Space Grotesk", sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --color-background:   #09090f;
  --color-surface:      #111118;
  --color-surface-2:    #16161f;
  --color-foreground:   #f0f0f5;

  --color-primary:           #6366f1;   /* indigo — single accent */
  --color-primary-light:     #818cf8;
  --color-primary-foreground: #ffffff;

  --color-muted:             #16161f;
  --color-muted-foreground:  #6b7280;

  --color-border:   #1e1e2e;
  --color-ring:     #6366f1;

  --color-success:  #10b981;   /* emerald — only for "available" indicator */
  --color-destructive: #ef4444;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}
```

Remove these from `index.css`:
- `--color-accent` (#ff6b6b), `--color-accent-2` (#00ffcc), `--color-accent-3` (#ffcc00)
- All `gradient-text`, `gradient-text-vivid`, `text-shimmer` utilities
- `.liquid-card` → replace with `.card` (see below)
- `.scanline`, `.dot-grid`, `.chroma-hover`, `.mag-link`, `.glow-primary`
- `@keyframes ring-spin`, `float`, `float-b`, `grain`

Keep: `.glass`, `shimmer` keyframe, `marquee-track` (for Gallery).

### New Utility Classes

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.card-hover {
  transition: border-color 200ms, box-shadow 200ms;
}
.card-hover:hover {
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-primary);
}
```

### Typography Scale

- H1 (hero name): `clamp(3.5rem, 8vw, 7rem)`, Space Grotesk Black, `letter-spacing: -0.04em`
- H2 (section title): `text-3xl font-bold`, Space Grotesk
- H3 (card title): `text-lg font-semibold`
- Body: `text-sm leading-relaxed`, color `--color-foreground` at 80% opacity
- Meta/labels: `text-xs font-mono`, `--color-muted-foreground`

---

## Component Specs

### Navbar (`src/components/Navbar.tsx`)

Keep current structure but simplify styles:
- Remove `progressWidth` scroll progress bar (too gamey)
- Frosted glass on scroll: `background: rgba(9,9,15,0.85); backdrop-filter: blur(20px)`
- Border bottom: `1px solid rgba(99,102,241,0.1)` when scrolled
- Nav links: `text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground`
- Resume button: solid style — `bg-primary text-white px-4 py-2 rounded-md text-xs font-mono hover:bg-primary-light`
- Logo: keep monogram `A·B` but use `text-foreground` not gradient

Sections in nav: `About | Experience | Skills | Projects | Contact`

---

### Hero (`src/components/Hero.tsx`) — full rewrite

Layout: 2-column grid on md+, stacked on mobile. Max-width 1100px centered.

**Left column (content):**

```
[available badge]          ← subtle, small
ANTON                      ← giant name, foreground color
BLYZNIUK                   ← same size, primary color (indigo)
[role typewriter]          ← smaller, mono font, muted
[2-line bio excerpt]       ← max 160 chars, muted
[Download CV] [GitHub] [LinkedIn] [Email]
[stat strip: N projects · N positions · N skills]
```

**Right column (photo):**
- Clean rounded rectangle, `border-radius: 20px`
- Thin border: `1px solid rgba(99,102,241,0.2)`
- Box shadow: `0 20px 60px rgba(0,0,0,0.5)`
- Subtle indigo overlay tint on hover only
- NO spinning ring, NO floating badges, NO corner brackets

**Available badge:**
```tsx
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20 text-success text-xs font-mono">
  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
  Available for work
</span>
```

**CTA buttons:**
```tsx
// Primary: Download CV
<a className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-sm font-mono rounded-lg transition-colors">
  <Download className="w-4 h-4" /> Download CV
</a>

// Secondary: social icon buttons
// w-9 h-9 rounded-lg border border-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-foreground
```

**Animations:** Keep motion entrance but halve delays. Fade-up only — no char-by-char reveal (too slow).

Remove:
- `CharReveal` component
- Ghost watermark text behind last name
- Spinning conic ring
- Floating badges (`ONLINE NOW`, `OPEN TO RELOCATION`, `N YRS EXP`)
- Polygon `clip-path` morph on hover
- Scroll indicator (remove)

---

### About (`src/components/About.tsx`) — rewrite

Remove the fake terminal aesthetic (fake title bars, `$` prompts, `cat profile_summary.txt EOF`).

**Layout: 2 columns on lg+**

Left (2/3): Clean bio card
```
[name + role header]
[full about text, readable font-size text-sm leading-relaxed]
```

Right (1/3): Contact info list
```
Location: [icon] [value]
Email:     [icon] [value — clickable mailto]
Phone:     [icon] [value — if present]
```

Stats row below (4 cards):
- Same 4 stats (Projects, Positions, Skills, Certs) with animated counter
- Style: `.card` with icon + big number + label
- Remove: icon bg circles, replace with simple colored number

Remove:
- Terminal title bar (`profile_summary.txt`, colored dots)
- `$ cat` prompt line at bottom
- `STATUS: Online` row with pulsing dot (it's in the hero badge now)

---

### Experience (`src/components/Experience.tsx`) — rewrite

Replace alternating left-right timeline with a **left-aligned vertical timeline**.

No desktop/mobile split — same component for all widths.

Layout:
```
[left border line: 2px, indigo/10]
  ● [dot: 8px, indigo]
    [date range]        ← mono, muted, xs
    [Organization]      ← indigo, sm, bold
    [Job Title]         ← foreground, lg, semibold
    [Location]          ← muted, xs, with MapPin icon
    [Description]       ← muted, sm, leading-relaxed (full text, not truncated to 3 bullets)
```

Show Experience first (sorted by to_date desc), then Education after a section divider with header label.

Card style: `.card .card-hover p-5 ml-6` (offset from timeline line)

Dot: `w-3 h-3 rounded-full border-2 border-primary bg-background absolute left-[-6.5px]`

Remove:
- `side` prop, alternating layout
- Bullet-point splitting of description
- `▸` arrow bullets
- `isExp`/`isEdu` color switching mid-card (use one neutral style for both, distinguish by section header only)

---

### Skills (`src/components/Skills.tsx`) — rewrite

Replace skill bars with **tag/pill grid grouped by category**.

Skill bars look like resumes from 2015. Tags are modern, scannable, and don't make you rank yourself with a fake percentage.

```tsx
// Category header
<h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
  {categoryName}
</h4>
// Pills
<div className="flex flex-wrap gap-2">
  {skills.map(skill => (
    <span className="px-3 py-1.5 rounded-md border border-border bg-surface text-sm font-mono text-foreground/80 hover:border-primary/40 hover:text-foreground transition-colors cursor-default">
      {skill.name}
    </span>
  ))}
</div>
```

If skill has `level === "expert"` or `"advanced"`: add subtle indigo tint to badge `bg-primary/5 border-primary/20 text-primary-light`.

Languages section: keep, same pill style but with level shown as secondary text inside pill.

Remove:
- Left category panel with `→` arrows
- Animated progress bars
- `getLevelWidth()` / `getLevelLabel()` functions
- Tab switching animation

---

### Projects (`src/components/Projects.tsx`) — keep structure, update styles

Keep: grid layout, modal, project cards, image display.

**Card changes:**
- Remove `liquid-card` → use `.card .card-hover`
- Remove fake OS title bar in modal (colored dots + `.sh` filename)
- Modal: clean header with just project name + X button
- Add tech stack display if links contain readable names (GitHub, Live, Demo — show as small badges)
- Image aspect ratio: `aspect-video` for all cards (remove "featured" double-width first card — it breaks grid flow)
- Card hover: `translateY(-4px)` not `-8px` (subtler)

---

### Achievements (`src/components/Achievements.tsx`) — keep, minor style update

- Replace `liquid-card` → `.card`
- Remove decorative `##` prefix before section subheadings
- Cert icon: keep Shield, keep indigo tint
- Award icon: keep Star, change color from red to indigo (single accent color)
- Remove `borderLeft: "3px solid ..."` colored side bar — unnecessary

---

### Gallery (`src/components/Gallery.tsx`) — keep as-is

Only visual change: remove status bar at bottom (`buffer ready`, `assets loaded` — it's tech cosplay that confuses non-devs).

---

### CustomSections (`src/components/CustomSections.tsx`) — keep, minor style update

- Remove `bento-card` class if it references removed utilities
- Replace with `.card`
- Remove `>>` arrow prefix in description text
- Remove giant `clamp(3rem, 8vw, 7rem)` section heading — use standard H2 `text-3xl font-bold`

---

### Footer (`src/components/Footer.tsx`) — keep structure, clean text

- Remove `## Built with React · Deployed on Railway` footer text (not recruiter-relevant)
- Replace with: `© 2025 Anton Blyzniuk`
- Remove `↑ BACK TO TOP` button (browser handles this)
- Clean up ambient glow div (remove)
- Keep 3-column layout: Monogram + tagline | Navigation | Connect

---

## Section Layout (page-level)

Each section in `<main>`:
```tsx
<section id="about" className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
  <div className="mb-10">
    <span className="section-label">01 — About</span>
    <h2 className="text-3xl font-bold mt-2">Who I am</h2>
  </div>
  <SectionContent />
</section>
```

Section dividers: no decorative lines/gradients. Just `py-20` spacing.

---

## Loading State

Replace complex boot with simple spinner:

```tsx
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
}
```

---

## Animations (keep but trim)

Keep `motion/react` but apply these rules:

| Current | New |
|---------|-----|
| `initial={{ opacity: 0, y: 24 }}` | `initial={{ opacity: 0, y: 12 }}` — halve y offset |
| `delay: index * 0.08` | `delay: index * 0.05` — faster stagger |
| `whileHover={{ y: -6 }}` | `whileHover={{ y: -3 }}` |
| `whileInView` with `viewport={{ once: true }}` | keep |
| `CharReveal` char-by-char | remove — use simple fade-up on whole element |
| Spring physics on everything | use `ease: [0.22, 1, 0.36, 1]` consistently |

Hero entrance: simple `fade-up` on whole left column, slight delay for photo. No char-by-char.

---

## Files to Delete

```
src/components/os/          (entire folder — 7 files)
src/components/WindowFrame.tsx
src/components/ParticleBackground.tsx
src/components/CustomCursor.tsx
src/components/FallingNumbers.tsx
src/hooks/useWindowManager.ts
src/hooks/useTerminal.ts
```

Files to keep but not render:
```
src/components/AIChat.tsx   (keep file, remove from App.tsx render)
```

---

## Checklist for Implementing AI

1. [ ] Update `src/index.css`: new `@theme` block, remove old utilities, add `.card`, `.card-hover`, `.section-label`
2. [ ] Rewrite `src/App.tsx`: remove boot/desktop/mobile split, add `LoadingScreen`, single layout
3. [ ] Rewrite `src/components/Hero.tsx`: remove gimmicks, clean 2-col layout
4. [ ] Rewrite `src/components/About.tsx`: remove terminal aesthetic, clean bio + contact
5. [ ] Rewrite `src/components/Experience.tsx`: left-aligned single-column timeline
6. [ ] Rewrite `src/components/Skills.tsx`: tag/pill grid, remove bars
7. [ ] Update `src/components/Projects.tsx`: style cleanup, remove OS modal chrome
8. [ ] Update `src/components/Achievements.tsx`: style cleanup
9. [ ] Update `src/components/Navbar.tsx`: remove progress bar, clean styles
10. [ ] Update `src/components/Footer.tsx`: remove tech-cosplay text
11. [ ] Update `src/components/Gallery.tsx`: remove status bar
12. [ ] Update `src/components/CustomSections.tsx`: remove oversized heading, `>>` prefix
13. [ ] Delete unused files (OS folder, WindowFrame, ParticleBackground, CustomCursor, FallingNumbers, hooks)
14. [ ] Verify `npm run build` passes TypeScript
15. [ ] Check mobile (375px) and desktop (1440px) layouts

---

## Do Not Change

- `src/types.ts` — CVData types
- `src/services/api.ts` — data fetching
- `src/services/notifications.ts` — Telegram hook
- `src/lib/generatePDF.tsx`
- `src/lib/utils.ts`
- `src/components/Typewriter.tsx` — keep, used in Hero role display
- `src/components/ui/` — all shadcn components
- `vite.config.ts`, `tsconfig.json`, `package.json`
- All env/deploy config files

---

## Reference: Current Color Mapping

When replacing old colors in components:

| Old | New |
|-----|-----|
| `#7c6aff` (primary) | `#6366f1` |
| `#a89aff` (primary-light) | `#818cf8` |
| `#00ffcc` (accent-2 / mint) | Remove. Use `#10b981` only for available indicator |
| `#ff6b6b` (accent / red) | Remove. Use `var(--color-muted-foreground)` |
| `#ffcc00` (accent-3 / yellow) | Remove entirely |
| `#04040a` (background) | `#09090f` |
| `#080816` (surface) | `#111118` |
| `#0d0d20` (surface-2) | `#16161f` |
| `rgba(124,106,255,X)` | `rgba(99,102,241,X)` |
| `rgba(0,255,204,X)` | Remove or use `rgba(16,185,129,X)` sparingly |
| `rgba(4,4,10,X)` | `rgba(9,9,15,X)` |

---

## Expected Result

A recruiter visits the site and sees:
1. **Immediately (0s):** Name, title, available badge, photo — no loading gimmick
2. **5s:** Scrolls to experience — clean timeline, readable, professional
3. **10s:** Skills — tag cloud, instantly scannable
4. **15s:** Projects — cards with images and links
5. **Action:** Downloads CV or clicks LinkedIn/GitHub

The site should look like it belongs on a shortlist next to candidates from top companies — not like a hacker's personal toy project.
