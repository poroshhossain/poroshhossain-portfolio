import type { Project } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Featured projects. Add one object per project — cards, detail pages, the
 * sitemap and 404 handling all derive from this list.
 *
 * The three entries below are self-directed DEMO projects (isDemo: true,
 * shown with a visible Demo badge). Replace them with real client work as it
 * comes in (drop screenshots in /public/images/projects/, set real links,
 * then remove the flag). Never invent metrics or URLs.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    slug: "shopmate-e-commerce",
    title: "ShopMate — e-commerce storefront",
    isDemo: true,
    summary:
      "A demo storefront built end to end: product catalog and cart on Next.js, REST API with auth and a role-based admin panel on Express + MongoDB.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    thumbnail: {
      src: "/images/projects/shopmate-e-commerce.svg",
      alt: "ShopMate demo storefront: browser window with a product grid",
    },
    screenshots: [
      {
        src: "/images/projects/shopmate-e-commerce.svg",
        alt: "ShopMate demo storefront: product grid with prices and category chips",
      },
    ],
    overview:
      "ShopMate is a self-directed demo project that shows how I build full-stack apps: a typed Next.js frontend over a clean REST API, with an admin panel for catalog management. It is deliberately scoped to what a small shop actually needs — catalog, cart, admin — with no bloat beyond that.",
    problem:
      "Small shops often juggle spreadsheets and ad-hoc catalogs that are slow to update and easy to break. The goal was a storefront where the owner manages products themselves and customers get a fast, predictable buying flow.",
    role: "Sole developer — data model, API, UI. I scoped the MVP down to what small shops actually use day to day instead of building a general platform.",
    features: [
      "Product catalog with search, filtering and pagination",
      "Cart and checkout flow with server-side validation",
      "Role-based admin panel for catalog management",
      "JWT authentication with clean session handling",
      "Typed REST endpoints with a consistent error envelope",
    ],
    challenges: [
      {
        challenge: "Keeping cart state consistent between client and server.",
        solution:
          "The server is the single source of truth for the cart; the client renders optimistically and reconciles after each mutation, so a refresh never loses or doubles items.",
      },
      {
        challenge: "Keeping a product-image-heavy grid fast.",
        solution:
          "next/image with responsive sizes and lazy loading below the fold, plus pagination so first paint stays small.",
      },
    ],
    improvements: [
      "Payment provider integration for the checkout step",
      "Order confirmation emails",
      "Integration tests running in CI",
    ],
  },
  {
    slug: "insightly-dashboard",
    title: "Insightly — analytics dashboard",
    isDemo: true,
    summary:
      "A demo dashboard covering the pattern most businesses need: token-based login, server-side aggregation and clean data tables with honest empty states.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    thumbnail: {
      src: "/images/projects/insightly-dashboard.svg",
      alt: "Insightly demo dashboard: sidebar, stat cards and a line chart",
    },
    screenshots: [
      {
        src: "/images/projects/insightly-dashboard.svg",
        alt: "Insightly demo dashboard: stat cards above a trend chart",
      },
    ],
    overview:
      "Insightly is a demo built to sharpen the dashboard pattern: one permissioned screen that answers 'how are we doing' at a glance. Aggregation happens on the server so the client stays snappy; the UI is deliberately plain so the data is the interface.",
    problem:
      "Business data usually ends up scattered across spreadsheets and stale exports. The goal was one clear, permissioned view that people can trust at a glance.",
    role: "Sole developer — API design, aggregation logic and the UI.",
    features: [
      "Token-based login with protected routes",
      "Server-side aggregation for stats (no heavy client math)",
      "Tables and charts with clear empty and error states",
      "Responsive layout for desktop and mobile",
      "Paginated, filterable API endpoints",
    ],
    challenges: [
      {
        challenge: "Aggregations over large collections were slow at first.",
        solution:
          "Indexed the fields used for grouping and pushed most computation into a single aggregation pipeline with pagination — response times stayed flat as data grew.",
      },
    ],
    improvements: [
      "Exportable reports (CSV/PDF)",
      "Scheduled email digests",
      "Role-specific views instead of one shared layout",
    ],
  },
  {
    slug: "taskflow-api",
    title: "TaskFlow — task manager REST API",
    isDemo: true,
    summary:
      "A demo REST API with a small React client: CRUD with schema validation, JWT access + refresh flow and a predictable error envelope.",
    tech: ["Node.js", "Express", "MongoDB", "JWT auth", "React"],
    thumbnail: {
      src: "/images/projects/taskflow-api.svg",
      alt: "TaskFlow demo: editor window showing request code and a submit action",
    },
    screenshots: [
      {
        src: "/images/projects/taskflow-api.svg",
        alt: "TaskFlow demo: request code in an editor window",
      },
    ],
    overview:
      "TaskFlow documents the backend foundation I would bring to any client build: predictable REST endpoints, validation at the edge and a consistent error envelope, paired with a small React client that consumes it. It exists to show the API patterns in isolation, without UI complexity hiding them.",
    problem:
      "Task state shared across devices needs one source of truth with predictable validation — and most tutorials skip the hard edges, like expired tokens and conflicting updates. This demo covers those edges on purpose.",
    role: "Sole developer — API design, auth flow and the demo client.",
    features: [
      "CRUD endpoints with schema validation",
      "JWT access tokens with a refresh flow",
      "Pagination, sorting and filtering on list endpoints",
      "Consistent error envelope so clients handle failures uniformly",
    ],
    challenges: [
      {
        challenge:
          "Access-token expiry kept interrupting sessions in the client.",
        solution:
          "Added a refresh flow with a single retry wrapper that transparently rotates the access token before retrying the original request.",
      },
    ],
    links: undefined, // public links can be added here when published: { client: "...", server: "..." }
    improvements: [
      "Per-client rate limiting",
      "Integration tests in CI",
      "OpenAPI documentation generated from the route definitions",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
