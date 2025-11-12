# Work Item: Institution Detail Pages & Components Development

**IDs:**

- WI-001-UI-INSTITUTIONS — Create Dynamic Institution Detail Pages (`/institutions/[slug]`) _(Status: In Progress)_
- WI-002-UI-INSTITUTION-BANNER — Create Institution Banner Component and API Integration _(Status: Completed)_  
- WI-003-UI-INSTITUTIONS — Build value proposition hero section and hybrid rendering _(Status: In Progress)_
  **Priority:** High  
  **Milestone:** Phase 1 Foundation  
  **Owner:** Frontend Team

---

## Overview

Develop the comprehensive end-to-end institution detail experience, including server-side rendering, typed service layers, reusable hero banner module, and value proposition section. The page consumes Strapi-powered data, renders metadata for SEO, showcases the banner system with responsive design and accessibility baked in, and displays institution value propositions using customizable colors and responsive grids. All components support server-first rendering with optional client-side refetching.

---

## Requirements

### Institution Detail Page

#### Functional Requirements

- Route `/institutions/[slug]` accepts any institution slug and navigates visitors to the appropriate page.
- Fetch institution data by slug from the Strapi backend with server-side rendering for the initial load.
- Support client-side refetching via the TanStack Query hook.
- Display a 404 page when an institution is not found.
- Handle API failures with user-friendly messaging and error logging.
- Generate dynamic metadata: page title `{Institution Name} | SONA`, meta description, canonical URL, and Open Graph tags.
- Render institution name and metadata prominently, with room for future sections (courses, placements, etc.).

#### Non-Functional Requirements

- **Performance:** TTFB < 1s, FCP < 1.5s, responsive on mobile/tablet/desktop, server-render initial HTML, limit client bundle size.
- **Accessibility:** Semantic structure (`<header>`, `<main>`, `<footer>`), proper heading hierarchy, keyboard navigation, screen reader support, and sufficient color contrast.
- **Code Quality:** 100% TypeScript coverage, architecture decision adherence, ESLint clean, robust typed error handling, zero lint warnings.
- **Developer Experience:** Clear service abstractions, reusable hooks/utilities, comprehensive JSDoc, documented patterns, and normalized Strapi responses.

### Banner Module

#### Functional Requirements

- Display the banner image as a full-width responsive background with a dark overlay for contrast.
- Present the banner title prominently and render the optional subtitle gracefully.
- Fetch banner image, title, and subtitle from Strapi, constructing absolute media URLs.
- Provide proper alt text from Strapi metadata and semantic HTML structure.

#### Non-Functional Requirements

- **Performance:** Background image loading must not block page render, leverage optimization/caching, and avoid layout shift.
- **Accessibility:** Maintain sufficient text contrast, follow heading hierarchy, include alt text, and ensure semantic markup.
- **Code Quality:** TypeScript-safe props and responses, JSDoc coverage, Tailwind mobile-first approach per ADR 003, and extensible component design.
- **Developer Experience:** Reusable banner component API, type-safe media handling, and readiness for future enhancements.

### Value Proposition Section

#### Functional Requirements

- Fetch value proposition data server-side via `getValuePropositionByInstitution`.
- Render section with:
  - Background image + dark overlay (optional when image missing).
  - Split title (`titlePrefix`, `titleHighlight`) with color overrides.
  - Subtitle text.
  - N proposition cards (1–6+) each with icon, colored title, markdown description.
- Support hybrid rendering:
  - Server component fetch wrapped in `Suspense` with skeleton fallback.
  - Client utilities available for future refresh scenarios.
- Integrate section after Programs on the institution page.
- Gracefully handle missing data (null returns hide section).

#### Non-Functional Requirements

- **Performance:** Server-render initial HTML, limit client bundle size (cards remain server components).
- **Mobile First:** Stack cards vertically on small screens, expand to responsive grids at ≥640px, ≥1024px, and beyond.
- **Accessibility:** Maintain color contrast; provide ARIA labels for icons; proper heading hierarchy.
- **Code Quality:** Typed responses, reusable color utilities, zero lint warnings, no new TypeScript errors.

#### Developer Experience

- New utilities (`applyColorStyle`, `getColorClassName`) to reuse color logic across sections.
- Normalization helpers to keep Strapi responses strongly typed.
- Work item documentation for onboarding.

---

## Technical Specifications

### Institution Detail Page

#### File Structure

```
/sona-ui/
├── app/
│   └── institutions/
│       └── [slug]/
│           └── page.tsx
├── services/
│   ├── server/
│   │   └── institution.server.ts
│   └── client/
│       └── institution.client.ts
├── types/
│   └── institution.types.ts
├── utils/
│   ├── institution.utils.ts
│   └── common.utils.ts
├── lib/
│   └── axios.config.ts
└── .env.example (updated)
```

#### File Locations

- `types/institution.types.ts` — Shared types for institutions, banners, value propositions
- `services/server/institution.server.ts` — Server-side service for fetching institution, banner, and value proposition data
- `services/client/institution.client.ts` — Client-side TanStack Query hooks for refetching
- `utils/institution.utils.ts` — Institution-specific normalization and query builders
- `utils/common.utils.ts` — Color utilities and shared helpers
- `app/institutions/[slug]/page.tsx` — Main page component
- `.env.local` — Environment variables

### Banner Module

#### Backend Changes

- `sona-be` Strapi schema adds `bannerImage` (required media), `bannerTitle` (string, required, 255 char max), and `bannerSubtitle` (optional text, 500 char max).
- API queries populate `bannerImage` via `&populate=bannerImage`, ensuring full media payload availability.

#### Frontend Changes

- **Type Definitions:** `IStrapiMedia` models Strapi media objects; `IInstitution` includes banner fields.
- **Banner Component:** `components/common/InstitutionBanner.component.tsx` accepts `{ image, title, subtitle }`, renders hero section with overlay, constructs absolute image URLs, and uses Tailwind for responsive typography.
- **Page Integration:** `app/institutions/[slug]/page.tsx` imports the banner component, passes fetched data, and removes legacy hero implementations.
- **Server Service:** `services/server/institution.server.ts` includes banner population, validates presence, and raises explicit errors when missing.

#### Component Usage

```typescript
<InstitutionBanner
  image={institution.bannerImage}
  title={institution.bannerTitle}
  subtitle={institution.bannerSubtitle}
/>
```

### Value Proposition Section

#### Key Files

```
sona-ui/components/common/DecoratorLine.component.tsx
sona-ui/components/common/SplitTitle.component.tsx
sona-ui/components/institute/AchievementCard.component.tsx
sona-ui/components/institute/InstitutionAchievements.component.tsx
sona-ui/components/institute/RecognitionCard.component.tsx
sona-ui/components/institute/InstitutionRecognitions.component.tsx
sona-ui/components/institute/ValuePropositionCard.component.tsx
sona-ui/components/institute/InstitutionValueProposition.component.tsx
sona-ui/services/server/institution.server.ts
sona-ui/services/client/institution.client.ts
sona-ui/utils/institution.utils.ts
sona-ui/utils/common.utils.ts
```

#### Data Flow

- Server component awaits `getValuePropositionByInstitution`.
- Normalization sorts propositions by `order` (falling back to title).
- Optional client hook `useValueProposition` mirrors server fetch for future interactivity.

#### Styling

- Tailwind classes ensure mobile-first layout, overlay styling, and card design.
- Cards use glassmorphism effect (`bg-black/20`, backdrop blur) for readability.

#### Color Handling

- Supports raw CSS colors (hex, rgba) and Tailwind `text-*` tokens.
- Default fallback colors applied when values are empty or invalid.
- Utilities: `applyColorStyle`, `getColorClassName` in `common.utils.ts`.

#### Component Usage

```typescript
<Suspense fallback={<ValuePropositionSkeleton />}>
  <InstitutionValueProposition
    institution={institution}
  />
</Suspense>
```

### Achievements Section

#### Data Flow

- Server component `InstitutionAchievements` awaits `getAchievementsByInstitution`.
- Normalization ensures statistic cards are sorted by `order` and provides defaults.
- Client hook `useAchievementsByInstitution` mirrors the server fetch when interactive refresh is required.

#### Styling

- Mobile-first layout with responsive grid (1 → 2 → 4 columns).
- Uses `DecoratorLine` and `SplitTitle` for consistent heading treatment.
- `AchievementCard` emphasizes statistics with amber accents and subtle elevation.

#### Content Handling

- Section description rendered via `react-markdown` with GFM support.
- Cards accept plain text descriptions with optional ordering.
- Skeleton state mirrors final layout for smooth Suspense transitions.

### Recognition Section

#### Data Flow

- Server component `InstitutionRecognitions` awaits `getRecognitionsByInstitution` and handles background color overrides.
- Client hook `useRecognitionsByInstitution` supports future client-side refresh scenarios.

#### Styling

- Section background color derived from Strapi (`bg-*` tokens or raw CSS colors).
- Decorative overlay ensures text contrast on dark backgrounds.
- `RecognitionCard` uses `IconBadge` for consistent iconography and glassmorphism.

#### Content Handling

- Icons leverage badge metadata (`iconName`, optional colors, display name for aria labels).
- Grid adapts from single column on mobile to three columns on desktop.
- Skeleton variant mirrors card layout with translucent placeholders.

---

## Implementation Steps

### Institution Detail Page

1. [ ] Create types in `types/institution.types.ts`
2. [ ] Create axios config in `lib/axios.config.ts`
3. [ ] Create server service layer in `services/server/institution.server.ts`
4. [ ] Create client service layer in `services/client/institution.client.ts`
5. [ ] Update `.env.example` with Strapi URLs
6. [ ] Create page component at `app/institutions/[slug]/page.tsx`
7. [ ] Implement `generateMetadata` for SEO
8. [ ] Test server-side rendering with various slugs
9. [ ] Test error handling (404, network failures)
10. [ ] Verify responsive design on mobile/tablet/desktop
11. [ ] Run `npm run lint` and remediate issues
12. [ ] Secure peer review and approval

### Banner Module

1. [x] Enhance Strapi institution schema with banner fields.
2. [x] Update institution service to populate and validate banner data.
3. [x] Extend shared types with banner-specific fields.
4. [x] Implement `InstitutionBanner.component.tsx` with responsive design and accessibility.
5. [x] Integrate banner into the institution page and remove legacy hero.
6. [x] Verify responsive layout, contrast, and error handling for missing data.

### Value Proposition Section

1. [ ] Extend shared types with value proposition interfaces and normalized variants.
2. [ ] Add query/normalization helpers (`buildValuePropositionQuery`, `normalizeValuePropositionRecord`).
3. [ ] Create color utilities in `common.utils.ts` (`applyColorStyle`, `getColorClassName`).
4. [ ] Build `ValuePropositionCard` with markdown support and icon badge integration.
5. [ ] Implement server-first `InstitutionValueProposition` component with Suspense skeleton.
6. [ ] Wire section into `app/institutions/[slug]/page.tsx` after programs.
7. [ ] Test with 1–6+ propositions across responsive breakpoints.
8. [ ] Validate color contrast and accessibility.
9. [ ] Run `npm run lint` and remediate issues.
10. [ ] Update documentation (this file + backend counterpart).

### Achievements Section

1. [ ] Extend shared types and normalizers for achievements (`normalizeAchievementRecord`).
2. [ ] Implement server fetch (`getAchievementsByInstitution`) and client hook.
3. [ ] Build `AchievementCard` and `InstitutionAchievements` with Suspense skeleton.
4. [ ] Leverage `DecoratorLine` and `SplitTitle` for heading treatment.
5. [ ] Test responsive grid layouts (1–4 cards) and markdown description rendering.

### Recognition Section

1. [ ] Extend shared types and normalizers for recognition sections (`normalizeRecognitionSectionRecord`).
2. [ ] Implement server fetch (`getRecognitionsByInstitution`) and client hook.
3. [ ] Build `RecognitionCard` and `InstitutionRecognitions` with Suspense skeleton.
4. [ ] Support background color overrides (Tailwind tokens + raw CSS colors).
5. [ ] Validate icon badge rendering and responsive grid (1–3 cards).

### Shared Components

1. [ ] Extract `DecoratorLine.component.tsx` for reusable section decoration.
2. [ ] Introduce `SplitTitle.component.tsx` for color-aware heading splits.
3. [ ] Refactor `SectionHeader` to consume `DecoratorLine`.

---

## Definition of Done

### Institution Detail Page

- [ ] Page renders successfully at `/institutions/[slug]`.
- [ ] Institution data fetched from Strapi by slug.
- [ ] Server-side rendering works without hydration lag.
- [ ] Dynamic metadata generated correctly.
- [ ] 404 page shown when institution not found.
- [ ] Mobile-first responsive layout verified.
- [ ] TypeScript types complete and accurate.
- [ ] Service layers include JSDoc coverage.
- [ ] ESLint passes with no warnings.
- [ ] Code adheres to all relevant ADRs.
- [ ] TanStack Query hook available via `services/client`.
- [ ] Error responses normalized to standard format.
- [ ] Peer review approved.

### Banner Module (Completed)

- [x] Banner image renders with overlay and responsive typography.
- [x] Title and optional subtitle display correctly.
- [x] Missing subtitle handled gracefully.
- [x] Missing banner image surfaces clear error messaging.
- [x] Component props and media handling fully typed.
- [x] Accessibility (contrast, alt text, semantics) validated.

### Value Proposition Section

- [ ] `/institutions/[slug]` renders the value proposition section with server-rendered HTML.
- [ ] Section gracefully handles 1–6+ propositions without layout breakage.
- [ ] Color overrides reflect Strapi inputs (validated fallback to defaults).
- [ ] Skeleton fallback appears when Suspense delays resolution.
- [ ] No new TypeScript or ESLint errors.
- [ ] Documentation updated with setup, usage, and testing guidance.

### Achievements Section

- [ ] `/institutions/[slug]` renders the achievements section with statistic cards.
- [ ] Markdown description renders with typography utilities.
- [ ] Cards handle 1–4 statistics without layout issues.
- [ ] Suspense skeleton matches final layout and a11y requirements.
- [ ] Documentation updated with usage guidance and service references.

### Recognition Section

- [ ] `/institutions/[slug]` renders the recognition section with icon badges.
- [ ] Custom background colors apply via Tailwind tokens or raw CSS values.
- [ ] Grid adapts across breakpoints (mobile, tablet, desktop) without overflow.
- [ ] Icon badges surface aria labels from icon metadata.
- [ ] Documentation updated with usage guidance and service references.

---

## Testing Checklist

### Institution Detail Page

- Validate SSR and client refetch across sample slugs (`happy path`, `404`, network failure).
- Confirm metadata output via `generateMetadata` and inspect rendered head tags.
- Exercise responsive layout across 320px, 640px, 1024px breakpoints.
- Ensure error boundaries render fallback messaging gracefully.

### Banner Module

- Banner image displays correctly on page load with dark overlay.
- Title and subtitle render with appropriate spacing and typography.
- Responsive layout verified on mobile, tablet, and desktop.
- Missing subtitle does not break layout or spacing.
- Missing banner image raises actionable error messaging.
- Absolute image URL construction validated for various Strapi deployments.

### Value Proposition Section

- [ ] Populate value propositions in Strapi (varied colors and proposition counts).
- [ ] Verify server-rendered HTML includes proposition content.
- [ ] Confirm responsive layout across 320px, 640px, 1024px, 1440px breakpoints.
- [ ] Validate color contrast manually for custom values.
- [ ] Test scenario with >4 propositions (e.g., 6 items) to ensure wrapping.
- [ ] Confirm fallback behavior when background image missing.
- [ ] Inspect skeleton fallback by introducing artificial delay (e.g., throttling).

### Achievements Section

- [ ] Seed achievement cards (1–4 items) and verify server-rendered HTML.
- [ ] Confirm markdown description renders with expected typography.
- [ ] Validate statistic typography and spacing across breakpoints.
- [ ] Test Suspense skeleton while throttling network responses.
- [ ] Ensure statistic text remains accessible with sufficient contrast.

### Recognition Section

- [ ] Seed recognition items with varied icon badges and background colors.
- [ ] Validate responsive grid across 320px, 640px, 1024px breakpoints.
- [ ] Confirm custom background colors render correctly for Tailwind tokens and raw hex values.
- [ ] Verify icon badges expose aria labels sourced from badge metadata.
- [ ] Test Suspense skeleton for layout stability.

---

## Architecture Alignment

- ADR 001: Server-first rendering with server components for data fetching.
- ADR 002: Typed service layer modules for Strapi access.
- ADR 003: Tailwind CSS v4 with mobile-first responsive composition.
- ADR 004: Axios + TanStack Query for data fetching patterns.
- ADR 005: Shared types (`IStrapiMedia`, `IInstitution`) with JSDoc coverage.
- ADR 006: ESLint compliance with zero warnings.
- ADR 008: JSDoc documentation on components and service functions.

---

## Dependencies

- Strapi backend with enhanced institution schema, banner fields, and value proposition data model.
- Backend work items:
  - `sona-be/specs/work-items/institution-development.md`
  - `sona-be/specs/work-items/institution-banner-development.md`
  - `sona-be/specs/work-items/value-proposition-development.md`
- Environment variables configured in `.env.local`.
- Next.js 16 with React 19 server components, Tailwind CSS v4, TypeScript, TanStack Query.

---

## Related Documents

- `specs/blueprints/architecture-decisions.md` (UI)
- `specs/blueprints/prd.md`
- `sona-be/specs/work-items/institution-development.md`
- `sona-be/specs/work-items/institution-banner-development.md`
- `sona-be/specs/work-items/institution-banner-api-development.md`
- `sona-be/specs/work-items/value-proposition-development.md`
- `sona-be/specs/blueprints/institution-api-reference.md`

---

## Notes

- Maintain mobile-first design, progressively enhancing for larger breakpoints.
- Use `params.slug` in the Next.js page component to resolve the institution slug.
- Implement error boundaries for graceful fallback rendering.
- Evaluate caching (ISR, `revalidateTag`) for performance improvements.
- Test with slugs containing special characters (UID should sanitize but verify).
- Document custom styling or media handling decisions for future contributors.
- Future banner enhancements could include animations, additional variants, or image optimization strategies.
- Value propositions section integrates seamlessly after the programs section on the institution page.
- Color handling should support both raw CSS colors and Tailwind tokens for maximum flexibility.
