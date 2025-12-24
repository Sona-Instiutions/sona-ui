# Architecture Decisions & Blueprint

> This document is the single source of truth for front-end architecture on the `sona` platform. It combines our accepted Architecture Decision Records (ADR) with the operating blueprint that guides day-to-day development.

---

## Architecture Decision Records

### ADR 001 — Adopt Next.js App Router With Server-First Components

- **Date:** 2025-11-05
- **Status:** Accepted
- **Context:** We need a React framework that supports streaming SSR, server actions, and the App Router patterns described in this blueprint.
- **Decision:** Use Next.js 16+ with the App Router. Default to server components for data access and rendering; introduce client components only for interactivity.
- **Consequences:** Enables efficient SSR, co-located routing layouts, and alignment with server-first best practices.

### ADR 002 — Service Layer For Remote Data Access

- **Date:** 2025-11-05
- **Status:** Accepted
- **Context:** Direct data fetching inside pages makes testing and reuse difficult. We require a consolidated location for Strapi integrations.
- **Decision:** Expose Strapi integrations through typed modules under `services/`. Each module exports server-safe helpers (for server components/actions) and client-safe TanStack Query hooks without splitting into server/client subfolders.
- **Consequences:** Simplifies dependency management, centralizes error handling, and keeps presentation components lightweight while avoiding duplicated directory structures.

### ADR 003 — Tailwind CSS v4 + shadcn/ui + Mobile-First Composition

- **Date:** 2025-11-05
- **Status:** Accepted
- **Context:** We want a composable design system that supports utility-first styling with accessible component primitives.
- **Decision:** Use Tailwind CSS v4 for styling and shadcn/ui (Radix-based) for component primitives, composing every view with a mobile-first approach. Store shared UI under `components/ui` and wrappers under `components/common`. All shared or reusable component files must follow the `ComponentName.component.tsx` naming convention without exception.
- **Consequences:** Ensures consistent styling tokens, accessible defaults, adherence to our design system guidance, and guarantees that responsive behavior is designed from the smallest breakpoint upward.

### ADR 004 — Axios + TanStack Query For Client Data Fetching

- **Date:** 2025-11-05
- **Status:** Accepted
- **Context:** Client-side mutations and revalidation need a composable caching layer and consistent HTTP tooling.
- **Decision:** Standardize on Axios for HTTP requests and TanStack Query for client-side data fetching, caching, and mutation management.
- **Consequences:** Provides typed API interactions, built-in caching/invalidations, and alignment with Strapi-backed APIs.

### ADR 005 — Shared Type Definitions

- **Date:** 2025-11-05
- **Status:** Accepted
- **Context:** Strapi content types and shared utilities require consistent typing across server and client boundaries.
- **Decision:** Author canonical TypeScript types under `types/` (or `app/(types)/` if colocated). File names must follow `<name>.types.ts`. Within these files, prefix enums with `E`, interfaces with `I`, and type aliases with `T`; keep interfaces and type aliases scoped to their distinct purposes (interfaces for structural contracts, type aliases for unions/utility compositions). Use code generation where possible (e.g., Strapi OpenAPI/GraphQL schemas) and re-export domain-specific types from feature modules.
- **Consequences:** Guarantees type safety across services/hooks, enforces consistent naming, reduces duplication, and clarifies where contributors should define or update shared interfaces.

### ADR 006 — Enforce Linting Discipline & Strict Type Safety

- **Date:** 2025-11-06
- **Status:** Accepted
- **Context:** Inconsistent linting and ad-hoc TypeScript overrides allow unsafe code paths and regressions to land unnoticed.
- **Decision:** Run `npm run lint` after every unit of work prior to review or merge, and forbid disabling TypeScript via `// @ts-nocheck`, `// @ts-ignore`, or similar directives except in vetted, documented edge cases approved through an ADR.
- **Consequences:** Keeps the codebase type-safe, prevents style regressions, and surfaces violations during development instead of production.

### ADR 008 — JSDoc Documentation Standards

- **Date:** 2025-11-08
- **Status:** Accepted
- **Context:** Consistent and concise documentation improves code readability and maintainability across the team.
- **Decision:** Every function, method, and exported entity must have JSDoc comments. JSDoc descriptions must not exceed 2 lines; use `@param`, `@returns`, and `@throws` tags for detailed specifications. Use `@example` tags for complex functions.
- **Consequences:** Ensures predictable documentation, reduces cognitive load when reading code, and enables IDE intellisense support.

### ADR 009 — Standardize On @phosphor-icons/react With Icon Suffix Naming

- **Date:** 2025-01-15
- **Status:** Accepted
- **Context:** The `phosphor-react` package referenced in ADR 007 is deprecated and no longer maintained. The project requires a single, consistent icon library with clear naming conventions to prevent confusion, ensure long-term maintainability, and enable reliable linting rules. Inconsistent icon naming makes code harder to scan and increases the risk of accidental misuse or incorrect imports.
- **Decision:** The project must use only `@phosphor-icons/react` for all icons. The deprecated `phosphor-react` package is forbidden and must not be used anywhere in the codebase. All icon components imported from `@phosphor-icons/react` must follow a strict naming convention: every icon component name must end with the `Icon` suffix (e.g., `ArrowRightIcon`, `InstagramIcon`, `FacebookIcon`). This rule applies to all new code and existing code must be migrated to comply.
- **Consequences:** Ensures linting consistency by enabling ESLint rules that can enforce the `Icon` suffix pattern, improves code clarity by making icon usage immediately identifiable, prevents accidental use of deprecated packages, and guarantees long-term maintenance through alignment with the actively maintained Phosphor icons ecosystem. Existing code using `phosphor-react` or icon names without the `Icon` suffix must be refactored to comply with this standard.

---

## Next.js Architecture Blueprint

### Goals & Non-Goals

- **Goals**
  - Deliver a modular, type-safe React application with server components by default and client components only when necessary.
  - Maintain predictable project structure, naming, and coding standards so contributors can navigate the codebase without friction.
  - Support repeatable environments and deployments with clear guidance on configuration, testing, and observability.
  - Treat accessibility, performance, and security as foundational requirements across all features.
- **Non-Goals**
  - Dictate backend technology choices or data sources; this blueprint covers the Next.js layer only.
  - Replace other blueprints (e.g., `tech-stack.md`, additional ADRs). Instead, it distills our Next.js-specific expectations.

### System Overview

- **Framework:** Next.js 16 (App Router) with React 19 features such as streaming SSR, server actions, and concurrent rendering.
- **Rendering Defaults:** Prefer server components for data-heavy or read-mostly experiences to minimize client bundles. Use client components when the UI requires browser APIs, interactive event handlers, or mutable state.
- **Data Access:** Strapi is the authoritative backend. Call its REST endpoints through typed modules under `services/` that expose server-safe helpers and client-safe TanStack Query hooks. Avoid fetching directly from pages or presentation components.
- **API Surface:** The Next.js app does not expose custom API routes; all domain data comes from Strapi.
- **Runtime Targets:** Local development runs on `pnpm dev` (port 3050). Production assumes deployment to a Node-compatible host (Vercel or equivalent) with CDN or edge caching available.
- **Environment Management:** `.env.local` powers development. Secrets never enter version control—use managed secret stores per environment.

### App Structure & Routing

- **App Router Layout**
  - `app/<segment>/page.tsx` defines route entries. Keep pages thin by delegating logic to services and feature components.
  - Use `layout.tsx` for shared shells, `loading.tsx` for streaming placeholders, and `error.tsx` for scoped error boundaries.
  - Co-locate feature assets (components, constants, services) under domain folders when scope is limited. Mirror global additions in `specs/blueprints/existing-files.md`.
- **Server Components First**
  - Omit `"use client"` unless a component needs browser-only behavior. Split interactive leaf components into dedicated client modules.
  - Prefer async server components with direct access to server services or server actions.
- **Routing Patterns**
  - Use nested layouts for hierarchical experiences (dashboards, wizards). Document intercepting routes and parallel routes to avoid surprises.
  - Centralize SEO metadata in `generateMetadata` helpers and reuse shared builders for consistent OG tags and canonical URLs.

### Data & State Management

- **Fetching Strategy**
  - Use the built-in `fetch` inside server components or server actions for first render, targeting Strapi endpoints. Opt into caching via `{ cache: 'force-cache' }`, ISR via `revalidate`, or tag-based revalidation with `revalidateTag`.
  - Expose client-safe wrappers in `services/client/` when hydration, optimistic updates, or browser APIs are required.
- **Axios Configuration**
  - Standardize on Axios for HTTP modules shared between server and client boundaries. Configure base URL, interceptors, and error normalization in a single helper to enforce consistency.
- **TanStack Query Guidelines**
  - Define query factories inside `services/<feature>.service.ts` (or equivalent) and export the ready-to-use hooks from there following `use<Entity><Operation>Query` / `use<Entity>Mutation` naming.
  - Provide sensible defaults (`staleTime`, `retry`, `select`) within these service-layer exports rather than in presentation components. Use query keys that align with Strapi collection/type names to simplify invalidation.
- **Local State**
  - Use Jotai or React context for UI state that spans multiple components. Keep atoms small and domain-specific.
  - Avoid prop drilling; favor composition and context providers scoped to layouts or feature boundaries.
- **Type & Validation Utilities**
  - Maintain shared TypeScript types in `types/` and re-export them from service modules. Each file follows the `<name>.types.ts` naming convention. Prefix enums with `E`, interfaces with `I`, and type aliases with `T`; avoid mixing interface and type use-cases.
  - Guard all external data with Zod schemas (shared under `utils/validation/`). Export typed helpers so both server and client can reuse the same validators.

### Styling & UI Composition

- **Tailwind CSS v4**
  - Favor utility classes and design tokens. Extract repetitive recipes into `@apply` layers when readability requires it.
  - Respect motion guidance: animate opacity/transform only, honor `prefers-reduced-motion`, and avoid long-running transitions.
- **shadcn/ui + Radix**
  - Maintain source components under `components/ui/`. Extend via wrappers in `components/common/` instead of mutating generated files.
  - Use `@phosphor-icons/react` for all icons with the `Icon` suffix naming convention (see ADR 009); avoid duotone weights to stay on-brand.
- **Component Boundaries**
  - Keep components ≤ ~200 lines. Move derived logic into hooks (`<name>.hook.ts`) or utilities.
  - Server components assemble data; client components manage interactivity (forms, modals, gestures).
- **Accessibility**
  - Use semantic HTML, proper ARIA attributes, and visible focus states. Include keyboard support for every interactive element and validate with `@axe-core/playwright` when flows change.

### Services & API Interaction

- **Strapi Service Modules**
  - Place Strapi integrations in `services/<domain>.service.ts` with clear names and ≥2 lines of JSDoc describing collections/endpoints and assumptions.
  - Export server-safe helpers (for server components/actions) alongside client-safe TanStack Query exports without duplicating directories.
  - Centralize Axios configuration (base URL, interceptors, error normalization) in a shared helper imported by these service modules.
- **Error Handling**
  - Normalize failures into `{ message, status, details? }` envelopes. Localize user-facing copy via constants or i18n utilities.
- **Caching & Revalidation**
  - Tag cacheable server requests with `revalidateTag` groups so background jobs or webhooks can invalidate precisely.
  - For client mutations, invalidate related TanStack Query keys and call server actions that trigger `revalidateTag` for consistent views.

### Naming Conventions

- **Files & Directories**
  - Type definitions: `<feature>.types.ts` inside `types/` or colocated with the feature.
  - Service modules: `services/<domain>.service.ts` encapsulating Strapi access and TanStack Query exports.
  - Hooks: `<feature>.hook.ts` for UI-specific hooks that compose services.
  - Components: `ComponentName.component.tsx` for every exported component; subcomponents still live under folders with `index.tsx` when more than one file is needed.
  - Constants: `<feature>.constants.ts` colocated with usage or under `constants/`.
  - Utilities: `<feature>.utils.ts` colocated with usage or under `utils/`.

### File Size Constraints

- **Components & Pages:** Maximum 220 lines (200 + 10% buffer). Split logic into hooks or utilities if approaching limit.
- **Services & Utilities:** Maximum 550 lines (500 + 10% buffer). Break into separate modules when exceeding threshold.
- **Rationale:** Keeps files focused and testable; improves readability and maintenance; encourages separation of concerns.
- **Symbols**
  - Enums use `E<Entity>` (e.g., `EUserRole`).
  - Interfaces use `IEntity` for structural contracts.
  - Type aliases use `TEntity` for unions or derived shapes.
  - Strapi collections mirror their UID in PascalCase types (e.g., `articles` → `TArticle`).

### Environment & Configuration

- Maintain `.env.example` documenting required variables and their usage.
- Provide local setup scripts under `scripts/` (seeding, fixtures, mocks) to standardize onboarding.
- In CI, inject environment variables via pipeline secrets and fail fast when required values are missing (runtime guards in `config/environment.ts`).

### Performance & Observability

- **Performance**
  - Monitor bundle size and TTFB with `next build` output and the React Profiler. Defer non-critical scripts using `next/script` with appropriate strategies.
  - Optimize assets with `<Image>` loaders, responsive breakpoints, and font subsets.
- **Metrics & Logging**
  - Propagate request IDs through server actions and API calls. Use structured logging (`pino`) for server handlers.
  - Expose health endpoints that return build metadata for monitoring systems.
- **Tracing**
  - Instrument key interactions (page transitions, form submissions) with OpenTelemetry when deeper observability is required.

### Security & Compliance

- Enforce HTTPS everywhere and redirect HTTP at the CDN/edge layer.
- Sanitize all user input before rendering; escape HTML in server components by default.
- Store session tokens in HTTP-only cookies. Use Next.js middleware to guard authenticated routes and enforce role-based access when applicable.
- Run dependency scans (Dependabot, Snyk) and address critical issues promptly. Keep ESLint security rules enabled (no `eval`, restricted imports).
- Document threat models for sensitive flows (signup, payments) and review them alongside major releases.

### Change Management & Documentation

- Record notable architectural decisions in this document using ADR format.
- Update `specs/blueprints/existing-files.md` whenever new shared modules, directories, or conventions are introduced.
- Keep README sections current (local setup, scripts, deployment runbooks).
- Before landing large features, outline their test plans within the relevant work item and link back to this blueprint to confirm alignment.

### Tooling & Scripts

- `pnpm dev` — run the Next.js development server (port 3050 by convention).
- `pnpm build && pnpm start` — production build verification.
- `pnpm lint` — ESLint rules (use `--fix` when appropriate).
