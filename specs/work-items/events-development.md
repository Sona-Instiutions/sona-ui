# Work Item: Events Module - Frontend Development

**IDs:**

- WI-004-UI-EVENTS — Create Events Listing Page (`/events`) _(Status: Not Started)_
- WI-005-UI-EVENT-DETAIL — Create Event Detail Page (`/events/[slug]`) _(Status: Not Started)_
- WI-006-UI-EVENT-SEARCH — Implement Event Search Functionality _(Status: Not Started)_
- WI-007-UI-EVENT-COMMENTS — Implement Comment Submission & Display _(Status: Not Started)_
  **Priority:** High  
  **Milestone:** Phase 2 - Content & Engagement  
  **Owner:** Frontend Team

---

## Overview

Build a comprehensive Events module in the Next.js frontend that includes an events listing page with filtering/search, a detailed event page with rich content display, category/tag navigation, and comment functionality. The module will consume the Strapi Events API and provide an engaging user experience for browsing and interacting with SCALE's events.

**Important Note:** This work item focuses exclusively on **Events**. While the design references a blog details page layout (shared during development for visual reference), we are **only implementing Events functionality**, not blogs.

---

## Requirements

### Events Listing Page (WI-004)

#### Functional Requirements

- Route `/events` displays all published events with filtering and search capabilities
- Implement three filter tabs:
  - **All Events** — Shows all event types
  - **Student Events** — Filters `eventType=student`
  - **Industry Events** — Filters `eventType=industry`
- Display event cards in a responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Each event card shows:
  - Thumbnail/featured image
  - Event category badge(s) with color coding
  - Event date (formatted: "March 15, 2025")
  - Event title
  - Excerpt (truncated to ~150 characters)
  - "Read More" button/link
- Implement search bar at the top of the page
  - Real-time search across event titles, excerpts, and content
  - Display search results count
  - Clear search button
- Implement "Load More" pagination or infinite scroll
- Display empty state when no events match filters/search
- Show loading skeleton during data fetch
- Generate SEO metadata (title: "Events & News | SCALE", description, OG tags)
- Server-side render initial page load for SEO
- Support client-side refetching via TanStack Query

#### Non-Functional Requirements

- **Performance:** TTFB < 1s, FCP < 1.5s, responsive on all devices
- **Accessibility:** Keyboard navigation, screen reader support, ARIA labels, sufficient contrast
- **Code Quality:** 100% TypeScript, ESLint clean, typed service layer, zero lint warnings
- **Mobile First:** Stack cards vertically on mobile, expand to grid on larger screens
- **SEO:** Server-rendered HTML, semantic markup, meta tags, canonical URLs

### Event Detail Page (WI-005)

#### Functional Requirements

- Route `/events/[slug]` displays full event details
- Hero section with:
  - Full-width featured image with dark overlay
  - Event category badge(s)
  - Event date
  - Event title (large, prominent)
  - Author name (if available)
  - View count display
  - Social share buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- Main content area with:
  - Rich text content rendered from Strapi (markdown/HTML)
  - Proper typography and spacing
  - Responsive images within content
- Sidebar (desktop) / bottom section (mobile) with:
  - Search widget
  - "Recent Articles" section (5 most recent events)
  - "Popular Tags" cloud (linked to tag filter pages)
  - "Categories" list (linked to category filter pages)
- Related events section at bottom:
  - Display 3-4 related events based on shared categories/tags
  - Same card layout as listing page
- Comment section:
  - Display approved comments with author name and timestamp
  - Support nested replies (1 level deep)
  - Comment submission form (name, email, comment text)
  - Form validation and error handling
  - Success message after submission
  - Pending moderation notice
- Increment view count on page load (fire-and-forget API call)
- Generate dynamic SEO metadata:
  - Title: `{Event Title} | SCALE`
  - Description: Event excerpt or metaDescription
  - OG image: Featured image
  - Canonical URL
  - Published date structured data
- Display 404 page when event not found
- Server-side render for initial load

#### Non-Functional Requirements

- **Performance:** TTFB < 1s, FCP < 1.5s, lazy load images, optimize bundle size
- **Accessibility:** Semantic HTML, heading hierarchy, keyboard navigation, screen reader support
- **Code Quality:** TypeScript coverage, typed responses, reusable components, zero lint warnings
- **Mobile First:** Responsive layout, sidebar moves to bottom on mobile, touch-friendly interactions
- **SEO:** Rich snippets, structured data, social sharing meta tags

### Search Functionality (WI-006)

#### Functional Requirements

- Search input component reusable across listing page and detail page sidebar
- Real-time search with debouncing (300ms delay)
- Search across event title, excerpt, and content fields
- Display search results count
- Highlight search term in results (optional enhancement)
- Clear search button (X icon)
- Loading indicator during search
- Empty state when no results found
- Preserve search query in URL query parameters (`?search=innovation`)
- Support browser back/forward navigation with search state

#### Non-Functional Requirements

- **Performance:** Debounced API calls, cancel in-flight requests on new input
- **Accessibility:** Keyboard navigation, ARIA live region for results count
- **UX:** Instant feedback, clear affordances, responsive design

### Comment Functionality (WI-007)

#### Functional Requirements

- Display approved comments in chronological order (oldest first or newest first)
- Each comment shows:
  - Author name
  - Timestamp (relative: "2 hours ago" or absolute: "March 15, 2025")
  - Comment text
  - Reply button (for nested replies)
- Nested replies indented and visually distinct
- Comment submission form with fields:
  - Name (required, max 100 characters)
  - Email (required, validated format, not displayed publicly)
  - Comment (required, max 2000 characters, textarea)
  - Submit button
- Form validation:
  - Required field validation
  - Email format validation
  - Character count display for comment field
  - Error messages displayed inline
- Success state after submission:
  - Clear form fields
  - Display success message: "Thank you! Your comment is awaiting moderation."
  - Scroll to success message
- Error handling for API failures
- Loading state during submission (disable form, show spinner)
- Optional: Honeypot field for spam prevention
- Optional: Client-side rate limiting (prevent multiple rapid submissions)

#### Non-Functional Requirements

- **Accessibility:** Form labels, error announcements, keyboard navigation
- **Security:** Client-side validation, sanitize user input display, CSRF protection
- **UX:** Clear feedback, inline validation, responsive form layout

---

## Technical Specifications

### File Structure

```
/sona-ui/
├── app/
│   └── events/
│       ├── page.tsx                          # Events listing page
│       ├── [slug]/
│       │   └── page.tsx                      # Event detail page
│       └── category/
│           └── [slug]/
│               └── page.tsx                  # Category filter page (optional)
├── components/
│   ├── events/
│   │   ├── EventCard.component.tsx           # Event card for listing
│   │   ├── EventHero.component.tsx           # Hero section for detail page
│   │   ├── EventContent.component.tsx        # Rich content renderer
│   │   ├── EventSidebar.component.tsx        # Sidebar with search/tags/categories
│   │   ├── RelatedEvents.component.tsx       # Related events section
│   │   ├── CommentList.component.tsx         # Display comments
│   │   ├── CommentForm.component.tsx         # Submit comment form
│   │   ├── EventSearch.component.tsx         # Search input widget
│   │   ├── EventFilters.component.tsx        # Filter tabs (All/Student/Industry)
│   │   ├── CategoryBadge.component.tsx       # Category badge component
│   │   ├── TagCloud.component.tsx            # Popular tags cloud
│   │   └── EventCardSkeleton.component.tsx   # Loading skeleton
│   └── common/
│       ├── ShareButtons.component.tsx        # Social share buttons
│       └── RichTextRenderer.component.tsx    # Markdown/HTML renderer
├── services/
│   ├── server/
│   │   └── events.server.ts                  # Server-side event fetching
│   └── client/
│       ├── events.client.ts                  # Client-side TanStack Query hooks
│       └── comments.client.ts                # Comment submission hooks
├── types/
│   ├── events.types.ts                       # Event-related types
│   └── comments.types.ts                     # Comment-related types
├── utils/
│   ├── events.utils.ts                       # Event normalization, query builders
│   ├── date.utils.ts                         # Date formatting utilities
│   └── text.utils.ts                         # Text truncation, sanitization
└── constants/
    └── events.constants.ts                   # Event-related constants
```

### Type Definitions

#### Event Types (`types/events.types.ts`)

- `EEventType` enum: student, industry, all
- `IEventCategory` interface: id, name, slug, description, color, icon, order
- `IEventTag` interface: id, name, slug
- `IEvent` interface: All event fields including relations
- `IEventResponse` interface: Strapi response wrapper
- `INormalizedEvent` interface: Normalized event with null-safe media fields

#### Comment Types (`types/comments.types.ts`)

- `ECommentStatus` enum: pending, approved, rejected, spam
- `IEventComment` interface: All comment fields including nested replies
- `ICommentSubmission` interface: Data for submitting new comments
- `ICommentResponse` interface: Strapi response wrapper

### Service Layer

#### Server Service (`services/server/events.server.ts`)

Functions to implement:

- `getEvents()` — Fetch events with filtering, search, pagination
- `getEventBySlug()` — Fetch single event by slug with all relations
- `getEventCategories()` — Fetch all categories with icons
- `getEventTags()` — Fetch all tags sorted alphabetically

#### Client Service (`services/client/events.client.ts`)

Hooks to implement:

- `useEvents()` — TanStack Query hook for fetching events with filters
- `useIncrementViewCount()` — Mutation hook for incrementing view count

#### Comment Service (`services/client/comments.client.ts`)

Hooks to implement:

- `useEventComments()` — Query hook for fetching approved comments
- `useSubmitComment()` — Mutation hook for submitting new comments

### Component Structure

#### Events Listing Page Components

- **EventCard**: Displays event thumbnail, title, excerpt, categories, date
- **EventCardSkeleton**: Loading placeholder for event cards
- **EventFilters**: Tab navigation for All/Student/Industry events
- **EventSearch**: Search input with debouncing and clear button
- **CategoryBadge**: Colored badge for event categories

#### Event Detail Page Components

- **EventHero**: Full-width hero with featured image, title, metadata
- **EventContent**: Rich text renderer for event content
- **EventSidebar**: Contains search widget, recent events, tags, categories
- **RelatedEvents**: Grid of related event cards
- **CommentList**: Displays approved comments with nested replies
- **CommentForm**: Form for submitting new comments
- **ViewCountTracker**: Client component to increment view count
- **ShareButtons**: Social media share buttons

---

## Implementation Steps

### Phase 1: Setup & Core Types (WI-004 Foundation)

1. [ ] Create type definitions in `types/events.types.ts`
2. [ ] Create type definitions in `types/comments.types.ts`
3. [ ] Create utility functions in `utils/events.utils.ts` (normalization, query builders)
4. [ ] Create utility functions in `utils/date.utils.ts` (date formatting)
5. [ ] Create utility functions in `utils/text.utils.ts` (truncation, sanitization)
6. [ ] Create constants in `constants/events.constants.ts`
7. [ ] Update axios config if needed for event endpoints

### Phase 2: Events Listing Page (WI-004)

1. [ ] Create server service in `services/server/events.server.ts`
2. [ ] Create client service in `services/client/events.client.ts`
3. [ ] Create EventCard component
4. [ ] Create EventCardSkeleton component
5. [ ] Create CategoryBadge component
6. [ ] Create EventFilters component (All/Student/Industry tabs)
7. [ ] Create EventSearch component
8. [ ] Create events listing page at `app/events/page.tsx`
9. [ ] Implement server-side rendering with initial data
10. [ ] Implement filter tabs functionality
11. [ ] Implement search functionality with debouncing
12. [ ] Implement pagination/load more
13. [ ] Implement empty state
14. [ ] Implement loading states
15. [ ] Generate SEO metadata
16. [ ] Test responsive layout (mobile, tablet, desktop)
17. [ ] Test filtering and search
18. [ ] Verify accessibility (keyboard nav, screen readers)

### Phase 3: Event Detail Page (WI-005)

1. [ ] Create EventHero component
2. [ ] Create EventContent component (rich text renderer)
3. [ ] Create EventSidebar component
4. [ ] Create RelatedEvents component
5. [ ] Create ShareButtons component
6. [ ] Create TagCloud component
7. [ ] Create ViewCountTracker component
8. [ ] Create event detail page at `app/events/[slug]/page.tsx`
9. [ ] Implement `generateMetadata` for dynamic SEO
10. [ ] Implement server-side rendering
11. [ ] Implement view count increment (fire-and-forget)
12. [ ] Implement social share buttons
13. [ ] Implement sidebar widgets (search, recent, tags, categories)
14. [ ] Implement related events section
15. [ ] Test 404 handling for invalid slugs
16. [ ] Test responsive layout
17. [ ] Verify SEO meta tags and OG images
18. [ ] Verify accessibility

### Phase 4: Search Functionality (WI-006)

1. [ ] Enhance EventSearch component with debouncing
2. [ ] Implement URL query parameter sync
3. [ ] Implement clear search button
4. [ ] Implement loading indicator
5. [ ] Implement results count display
6. [ ] Test search across title/excerpt/content
7. [ ] Test browser back/forward navigation
8. [ ] Test search performance with debouncing
9. [ ] Verify accessibility (ARIA live regions)

### Phase 5: Comment Functionality (WI-007)

1. [ ] Create comment service in `services/client/comments.client.ts`
2. [ ] Create CommentList component
3. [ ] Create CommentForm component
4. [ ] Create CommentSection component (combines list + form)
5. [ ] Implement comment display with nested replies
6. [ ] Implement comment submission form
7. [ ] Implement form validation (client-side)
8. [ ] Implement success/error states
9. [ ] Implement loading states during submission
10. [ ] Test comment submission flow
11. [ ] Test nested reply functionality
12. [ ] Test form validation
13. [ ] Test error handling
14. [ ] Verify accessibility (form labels, error announcements)
15. [ ] Optional: Implement honeypot spam prevention
16. [ ] Optional: Implement client-side rate limiting

### Phase 6: Testing & Optimization

1. [ ] Performance audit (Lighthouse, Core Web Vitals)
2. [ ] Accessibility audit (axe, WAVE)
3. [ ] SEO audit (meta tags, structured data)
4. [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
5. [ ] Mobile device testing (iOS, Android)
6. [ ] Test all user flows end-to-end
7. [ ] Optimize images (lazy loading, responsive sizes)
8. [ ] Optimize bundle size (code splitting, tree shaking)
9. [ ] Test error boundaries and fallbacks
10. [ ] Document component APIs and usage
11. [ ] Create user guide for content editors
12. [ ] Run ESLint and fix all warnings
13. [ ] Run TypeScript compiler and fix all errors

---

## Definition of Done

### Events Listing Page (WI-004)

- [ ] Page renders at `/events` with server-side data
- [ ] Filter tabs (All/Student/Industry) functional
- [ ] Search functionality working with debouncing
- [ ] Event cards display correctly with images, categories, dates, excerpts
- [ ] Pagination/load more working
- [ ] Empty state displays when no results
- [ ] Loading skeletons display during fetch
- [ ] SEO metadata generated correctly
- [ ] Responsive layout verified on mobile/tablet/desktop
- [ ] Accessibility validated (keyboard nav, screen readers)
- [ ] TypeScript types complete and accurate
- [ ] ESLint passes with no warnings
- [ ] Performance targets met (TTFB < 1s, FCP < 1.5s)

### Event Detail Page (WI-005)

- [ ] Page renders at `/events/[slug]` with full event data
- [ ] Hero section displays featured image, title, date, categories
- [ ] Rich content renders correctly (markdown/HTML)
- [ ] Sidebar displays search, recent events, tags, categories
- [ ] Related events section displays correctly
- [ ] Social share buttons functional
- [ ] View count increments on page load
- [ ] 404 page displays for invalid slugs
- [ ] Dynamic SEO metadata generated (title, description, OG tags)
- [ ] Responsive layout verified
- [ ] Accessibility validated
- [ ] TypeScript and ESLint clean
- [ ] Performance targets met

### Search Functionality (WI-006)

- [ ] Search input accepts text and triggers API call
- [ ] Debouncing prevents excessive API calls (300ms delay)
- [ ] Search results display correctly
- [ ] Results count displayed
- [ ] Clear search button functional
- [ ] URL query parameters sync with search state
- [ ] Browser back/forward navigation works
- [ ] Loading indicator displays during search
- [ ] Empty state displays when no results
- [ ] Accessibility validated (ARIA live regions)

### Comment Functionality (WI-007)

- [ ] Approved comments display in chronological order
- [ ] Nested replies display correctly (indented)
- [ ] Comment form validates all fields
- [ ] Email validation working
- [ ] Character count display functional
- [ ] Form submission creates pending comment
- [ ] Success message displays after submission
- [ ] Form clears after successful submission
- [ ] Error handling for API failures
- [ ] Loading state during submission
- [ ] Accessibility validated (form labels, error announcements)
- [ ] TypeScript and ESLint clean

---

## Testing Checklist

### Events Listing Page

- [ ] Load `/events` and verify initial render
- [ ] Click "All Events" tab and verify all events display
- [ ] Click "Student Events" tab and verify filtering
- [ ] Click "Industry Events" tab and verify filtering
- [ ] Enter search term and verify results
- [ ] Clear search and verify all events return
- [ ] Click "Load More" and verify pagination
- [ ] Test responsive layout on mobile (320px, 375px, 414px)
- [ ] Test responsive layout on tablet (768px, 1024px)
- [ ] Test responsive layout on desktop (1280px, 1920px)
- [ ] Test keyboard navigation (tab through cards, enter to open)
- [ ] Test screen reader announcements
- [ ] Verify meta tags in page source
- [ ] Test browser back/forward with filters/search

### Event Detail Page

- [ ] Load `/events/[valid-slug]` and verify full render
- [ ] Load `/events/invalid-slug` and verify 404 page
- [ ] Verify hero image displays correctly
- [ ] Verify event title, date, categories display
- [ ] Verify rich content renders (headings, paragraphs, lists, images)
- [ ] Click social share buttons and verify functionality
- [ ] Verify view count increments (check network tab)
- [ ] Verify sidebar search widget functional
- [ ] Verify recent events display in sidebar
- [ ] Verify tags and categories display in sidebar
- [ ] Verify related events section displays
- [ ] Click related event card and verify navigation
- [ ] Test responsive layout (hero, content, sidebar reflow)
- [ ] Test keyboard navigation
- [ ] Test screen reader experience
- [ ] Verify OG image in social share preview
- [ ] Test performance (Lighthouse score > 90)

### Comment Functionality

- [ ] Verify approved comments display
- [ ] Verify nested replies display correctly
- [ ] Submit comment with valid data and verify success message
- [ ] Submit comment with empty name and verify error
- [ ] Submit comment with invalid email and verify error
- [ ] Submit comment with empty content and verify error
- [ ] Submit comment exceeding character limit and verify error
- [ ] Verify form clears after successful submission
- [ ] Verify loading state during submission
- [ ] Test nested reply submission
- [ ] Test keyboard navigation in form
- [ ] Test screen reader announcements for errors
- [ ] Verify comment does not appear immediately (pending moderation)

---

## Architecture Alignment

- ADR 001: Server-first rendering with Next.js App Router
- ADR 002: Typed service layer for Strapi integration
- ADR 003: Tailwind CSS v4 with mobile-first composition
- ADR 004: Axios + TanStack Query for client data fetching
- ADR 005: Shared TypeScript types with naming conventions
- ADR 006: ESLint discipline and strict type safety
- ADR 008: JSDoc documentation standards

---

## Dependencies

- Strapi backend with Events API (see `sona-be/specs/work-items/events-development.md`)
- Next.js 16 with React 19
- TanStack Query v5
- Axios configured with Strapi endpoints
- Tailwind CSS v4
- TypeScript 5+
- Environment variables configured in `.env.local`

---

## Related Documents

- `specs/blueprints/architecture-decisions.md`
- `specs/blueprints/prd.md`
- `sona-be/specs/work-items/events-development.md` (Backend counterpart)

---

## Notes

- **Design Reference:** During development, a blog details page image will be shared as a visual reference for the event detail page layout. However, **we are only implementing Events functionality**, not blogs.
- Event types (student/industry/all) align with the three filter tabs in the design
- Comment moderation happens on the backend; frontend only displays approved comments
- View count increment should be fire-and-forget to avoid blocking page render
- Consider implementing infinite scroll instead of "Load More" button for better UX
- Social share buttons should use native share APIs on mobile devices when available
- Rich text content should be sanitized to prevent XSS attacks
- Consider implementing reading time estimate based on content length
- Consider implementing breadcrumb navigation (Home > Events > Event Title)
- Consider implementing print stylesheet for event detail pages
- Tag cloud should limit to top 20-30 most used tags
- Recent events in sidebar should exclude current event on detail page
- Consider implementing event calendar view in future iterations
- Consider implementing email subscription for new events
- Image optimization should use Next.js Image component with proper sizing
