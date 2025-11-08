# Work Item: Institution Detail & Banner Development

**IDs:**

- WI-001-UI-INSTITUTIONS — Create Dynamic Institution Detail Pages (`/institutions/[slug]`) _(Status: In Progress)_
- WI-002-UI-INSTITUTION-BANNER — Create Institution Banner Component and API Integration _(Status: Completed)_  
  **Priority:** High  
  **Milestone:** Phase 1 Foundation  
  **Owner:** Frontend Team

---

## Overview

Develop the end-to-end institution detail experience, including server-side rendering, typed service layers, and the reusable hero banner module. The page consumes Strapi-powered data, renders metadata for SEO, and showcases the banner system with responsive design and accessibility baked in.

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

- **Performance:** TTFB < 1s, FCP < 1.5s, responsive on mobile/tablet/desktop.
- **Accessibility:** Semantic structure (`<header>`, `<main>`, `<footer>`), proper heading hierarchy, keyboard navigation, and screen reader support.
- **Code Quality:** 100% TypeScript coverage, architecture decision adherence, ESLint clean, robust typed error handling.
- **Developer Experience:** Clear service abstractions, reusable hooks/utilities, comprehensive JSDoc, and documented patterns.

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
├── lib/
│   └── axios.config.ts
└── .env.example (updated)
```

#### File Locations

- `types/institution.types.ts`
- `services/server/institution.server.ts`
- `services/client/institution.client.ts`
- `app/institutions/[slug]/page.tsx`
- `.env.local`

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

- Strapi backend with enhanced institution schema and banner fields.
- Backend work item `sona-be/specs/work-items/institution-development.md`.
- Environment variables configured in `.env.local`.
- Next.js 16 with React 19 server components, Tailwind CSS v4, TypeScript, TanStack Query.

---

## Related Documents

- `specs/blueprints/architecture-decisions.md` (UI)
- `specs/blueprints/prd.md`
- `sona-be/specs/work-items/institution-development.md`
- `sona-be/specs/work-items/institution-banner-development.md`
- `sona-be/specs/work-items/institution-banner-api-development.md`
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
