# Tech Stack Overview

This document lists the core technologies used across the `sona` project. Reference it to understand required tooling and their purposes.

## Frontend (`sona-ui`)
- **Framework:** Next.js 16 (App Router) with React 19 server-first architecture.
- **Styling:** Tailwind CSS v4 and shadcn/ui (Radix components) for accessible UI primitives.
- **Type System:** TypeScript 5 with path aliases (`@/*`).
- **Data Fetching:** Axios for HTTP requests; TanStack Query for client-side caching, mutations, and background revalidation.
- **State Management:** Jotai or React context for shared UI state per blueprint guidance.
- **Tooling:** ESLint 9, PostCSS, pnpm workspace scripts.

## Backend (`sona-be`)
- **CMS:** Strapi v5 OSS running on Node.js 22 with SQLite for local development.
- **Runtime:** Node.js 22 LTS managed via nvm.
- **API Layer:** REST endpoints exposed via Strapi with content types defined in `src/api`.
- **Authentication:** Managed through Strapi admin and API tokens.

## Cross-Cutting Concerns
- **Package Manager:** pnpm (workspace-aware).
- **Version Control:** Git with documentation under `specs/` (blueprints, ADRs, tech stack).
- **Environments:** `.env.local` for development secrets; use managed secret stores in production.

