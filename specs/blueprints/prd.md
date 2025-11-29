# Frontend Product Requirements Document (PRD)

> This document outlines the feature roadmap and requirements for the Sona frontend (Next.js). It evolves as the product grows and serves as a reference for prioritization and feature completeness.

---

## Phase 1: Foundation (Current - Q4 2025)

### Institutions Detail Page

**Objective:** Create dynamic institution detail pages fetched from Strapi via slug-based URLs.

**Requirements:**
- Dynamic route: `/institutions/[slug]`
- Fetch institution data from Strapi by slug (server-side rendering)
- Display institution name and metadata
- Render rich banner title with configurable prefix and highlight colors
- Generate dynamic metadata (title, description) for SEO
- Handle 404 cases when institution not found
- Mobile-first responsive design

**User Stories:**
1. As a visitor, I can navigate to `/institutions/example-slug` and see the institution's details
2. As a visitor, I see a proper 404 page if the institution slug doesn't exist
3. As a search engine, I see unique metadata (title, description) for each institution page

**Success Criteria:**
- Page renders in < 1s (TTFB)
- All data fetches are server-side (no client hydration delay)
- Mobile layout is responsive and accessible
- SEO metadata is unique per institution
- No console errors or warnings

**Status:** In Progress

---

## Phase 2: Enhanced Institutions (Q1 2026)

### Planned Features

- [ ] Institutions listing page `/institutions`
- [ ] Search functionality across institutions
- [ ] Filtering (by location, type, etc.)
- [ ] Related institutions recommendations
- [ ] Institution statistics and metrics display

### Planned Pages

- [ ] `/institutions` — List all institutions
- [ ] `/institutions/[slug]/courses` — Courses offered by institution
- [ ] `/institutions/[slug]/placements` — Placement data
- [ ] `/institutions/[slug]/about` — Detailed institution information

---

## Phase 3: Advanced Features (Q2 2026+)

### Planned Capabilities

- [ ] Favorites/bookmarking system
- [ ] Comparison tool (compare multiple institutions)
- [ ] User reviews and ratings
- [ ] Admin portal for institution management
- [ ] Analytics integration
- [ ] Social sharing components
- [ ] Accessibility audit & WCAG compliance

---

## Technical Requirements

### Performance
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Cache server responses for fast page transitions

### Reliability
- Graceful error handling for API failures
- Fallback UI when data is unavailable
- Proper error logging for monitoring

### Accessibility
- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

### Security
- Input validation and sanitization
- No sensitive data in client-side code
- Secure cookie handling
- CORS properly configured

### Developer Experience
- Type-safe API interactions
- Reusable service layers
- Clear naming conventions
- Comprehensive documentation

---

## Design System & Components

### Required Components
- Page header with institution name
- Metadata section (location, contact, etc.)
- Navigation menu for different sections
- Footer with related links
- Error boundary for graceful degradation

### Styling Approach
- Tailwind CSS v4 for utilities
- shadcn/ui components for primitives
- Mobile-first responsive design
- Dark mode support (optional)

---

## Integration Points

### Backend (Strapi)
- `GET /api/institutions?filters[slug][$eq]=example-slug` — Fetch by slug
- `GET /api/institutions` — List all (for future listing page)
- Error handling for 404 responses

### Frontend Stack
- Next.js 16 with App Router
- Axios for HTTP requests
- TanStack Query for client-side caching
- TypeScript for type safety

---

## Success Metrics

- Page load time < 1s (TTFB)
- Zero console errors in production
- 95+ Lighthouse score
- 100% Lighthouse SEO score
- Mobile responsiveness verified on all breakpoints
- Zero accessibility violations

