# Work Item: Institution Detail Page Development

**ID:** WI-001-UI-INSTITUTIONS  
**Title:** Create Dynamic Institution Detail Pages (`/institutions/[slug]`)  
**Priority:** High  
**Status:** In Progress  
**Milestone:** Phase 1 Foundation  
**Owner:** Frontend Team  

---

## Overview

Build the foundational dynamic institution detail page with server-side rendering, slug-based routing, and SEO optimization. This page will fetch institution data from Strapi and display it to visitors.

---

## Requirements

### Functional Requirements

1. **Dynamic Routing**
   - Route: `/institutions/[slug]` accepting any institution slug
   - Navigate visitors to institution pages via dynamic URL

2. **Data Fetching**
   - Fetch institution by slug from Strapi backend
   - Support both server-side rendering (SSR) for initial load
   - Handle client-side refetching via TanStack Query hook

3. **Error Handling**
   - Display 404 page when institution not found
   - Gracefully handle API failures with user-friendly message
   - Log errors for debugging and monitoring

4. **SEO & Metadata**
   - Generate dynamic page title: `{Institution Name} | SONA`
   - Generate dynamic meta description from institution data
   - Include canonical URL for each page
   - Proper Open Graph tags for social sharing

5. **Page Content**
   - Display institution name prominently
   - Show relevant institution metadata
   - Future support for related sections (courses, placements, etc.)

### Non-Functional Requirements

1. **Performance**
   - Time to First Byte (TTFB) < 1s
   - First Contentful Paint (FCP) < 1.5s
   - Responsive on mobile, tablet, and desktop

2. **Accessibility**
   - Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
   - Proper heading hierarchy (h1, h2, etc.)
   - Keyboard navigation support
   - Screen reader friendly

3. **Code Quality**
   - 100% TypeScript type coverage
   - Follow architecture decisions from blueprints
   - ESLint passes without warnings
   - Proper error handling with typed responses

4. **Developer Experience**
   - Clear service layer abstraction
   - Reusable hooks and utilities
   - Comprehensive JSDoc comments
   - Well-documented code patterns

---

## Technical Specifications

### File Structure

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

### File Locations

- **Type Definitions:** `types/institution.types.ts`
- **Server Service Layer:** `services/server/institution.server.ts`
- **Client Service Layer:** `services/client/institution.client.ts`
- **Page Component:** `app/institutions/[slug]/page.tsx`
- **Environment Variables:** `.env.local`

---

## Implementation Steps

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
11. [ ] Run `npm run lint` and fix any errors
12. [ ] Get peer review and approval

---

## Definition of Done

- [ ] Page renders successfully at `/institutions/[slug]`
- [ ] Institution data fetched from Strapi by slug
- [ ] Server-side rendering works (no client hydration lag)
- [ ] Dynamic metadata generated correctly
- [ ] 404 page shown when institution not found
- [ ] Mobile-first responsive layout verified
- [ ] All TypeScript types properly defined
- [ ] Service layers have JSDoc comments
- [ ] No ESLint errors or warnings
- [ ] Code follows all architecture decisions (ADRs)
- [ ] TanStack Query hook available for client-side usage via `services/client`
- [ ] Error responses normalized to standard format
- [ ] Peer review approved

---

## Architecture Alignment

- **ADR 001:** Server-first component for SSR, client components only if interactivity needed
- **ADR 002:** Service layer with typed modules (server helpers + client hooks)
- **ADR 003:** Tailwind CSS v4 with mobile-first composition
- **ADR 004:** Axios + TanStack Query for data fetching
- **ADR 005:** Shared types in `types/institution.types.ts` with naming conventions
- **ADR 006:** ESLint passes without errors

---

## Dependencies

- Strapi backend running with institution content type
- Backend work item completed: `sona-be/specs/work-items/institution-development.md`
- Environment variables configured in `.env.local`

---

## Related Documents

- **Architecture Decisions (UI):** `specs/blueprints/architecture-decisions.md`
- **Product Requirements:** `specs/blueprints/prd.md`
- **Backend Work Item:** `sona-be/specs/work-items/institution-development.md`
- **Backend Architecture:** `sona-be/specs/blueprints/architecture-decisions.md`

---

## Notes

- **Mobile-First Design:** All components must follow a mobile-first design approach per ADR 003. Design and develop for mobile devices first, then progressively enhance for tablets and desktop. Use Tailwind CSS breakpoints (`sm`, `md`, `lg`, `xl`) to ensure responsive behavior across all screen sizes.
- Use `params.slug` from Next.js page component to access the URL slug
- Implement error boundary for graceful error display
- Consider caching strategy (ISR, revalidateTag) for performance
- Test with slugs containing special characters (though UID should handle this)
- Document any custom styling approaches for future contributors

