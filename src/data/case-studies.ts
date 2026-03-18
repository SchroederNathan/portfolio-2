import { projects } from "@/data/projects";

export interface CaseStudySection {
  title: string;
  body: string;
}

export interface CaseStudyScreenshot {
  title: string;
  caption: string;
  image: string;
  objectPosition?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  eyebrow: string;
  headline: string;
  summary: string;
  role: string;
  timeline: string;
  outcome: string;
  challenge: string[];
  process: CaseStudySection[];
  techStack: string[];
  screenshots: CaseStudyScreenshot[];
  metrics: CaseStudyMetric[];
  nextProjectSlug?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "movati",
    eyebrow: "Consumer fitness platform",
    headline: "Rebuilding the Movati member experience for 130K+ users.",
    summary:
      "I led the rebuild of Movati's mobile experience so members could book classes, manage memberships, and stay connected to their club without fighting legacy apps.",
    role: "Lead mobile developer · Product-minded engineer",
    timeline: "Multi-phase product rebuild",
    outcome:
      "The rebuilt experience now supports more than 130,000 members with a faster booking flow, cleaner account management, and a single codebase that ships to iOS, Android, and web.",
    challenge: [
      "Replace underperforming iOS and Android apps without disrupting active gym members.",
      "Handle real-time class inventory, booking changes, waitlists, and account data across multiple club locations.",
      "Keep the product maintainable enough to ship fast across three platforms from one codebase.",
    ],
    process: [
      {
        title: "Product reset",
        body:
          "I mapped the high-friction member journeys first: booking a class, managing a membership, and checking club-specific schedules. That let the new IA stay focused on what members actually open the app to do.",
      },
      {
        title: "Cross-platform architecture",
        body:
          "React Native and Expo became the front-end foundation, with Laravel powering scheduling, auth, and account APIs. That split kept the mobile app lean while preserving the business logic on the server side.",
      },
      {
        title: "Operational polish",
        body:
          "I also set up release automation with EAS and GitHub Actions so the team could ship updates to the App Store, Play Store, and web with less manual overhead and fewer risky release days.",
      },
    ],
    techStack: ["React Native", "Expo", "Laravel", "REST API", "EAS", "GitHub Actions"],
    screenshots: [
      {
        title: "Class discovery",
        caption: "A schedule view built around fast scanning, real-time availability, and location context.",
        image: "/images/movati.jpg",
        objectPosition: "center top",
      },
      {
        title: "Booking flow",
        caption: "Booking, cancellation, and waitlist interactions were simplified so members could make changes in seconds.",
        image: "/images/movati.jpg",
        objectPosition: "center center",
      },
      {
        title: "Account management",
        caption: "Membership details and billing actions moved into a cleaner, more self-serve account surface.",
        image: "/images/movati.jpg",
        objectPosition: "center bottom",
      },
    ],
    metrics: [
      { label: "Users served", value: "130K+" },
      { label: "Platforms", value: "iOS · Android · Web" },
      { label: "Core win", value: "Faster class booking" },
    ],
    nextProjectSlug: "focusgrid",
  },
  {
    slug: "focusgrid",
    eyebrow: "Habit & productivity app",
    headline: "Designing a habit tracker that feels rewarding instead of nagging.",
    summary:
      "FocusGrid started as a simple idea: make consistency visible. I built a grid-first habit tracker that keeps the daily action lightweight while making streaks and progress feel tangible.",
    role: "Founder · Designer · Full-stack mobile builder",
    timeline: "Zero-to-launch product build",
    outcome:
      "The app grew to more than 1,000 users by focusing on one strong interaction model: quick logging, visual streak feedback, and optional social accountability without the noise of a feed.",
    challenge: [
      "Most habit trackers either overload users with options or reduce the experience to a boring checkbox.",
      "The product needed to make daily logging feel nearly instant while still giving users a sense of momentum over time.",
      "Social features had to help with accountability without turning the product into another distracting timeline.",
    ],
    process: [
      {
        title: "Interaction-first design",
        body:
          "I made the grid the product. Each cell represents progress, so the main screen doubles as both navigation and motivation. That kept the mental model dead simple.",
      },
      {
        title: "Fast daily loops",
        body:
          "The app was tuned around short sessions: open, log, leave. I kept habit creation flexible, but the day-to-day flow intentionally low friction so building consistency never felt like admin work.",
      },
      {
        title: "Selective social features",
        body:
          "Social sharing and accountability were layered in as optional enhancements, not the main event. The product still works perfectly as a solo tool, which keeps it calm and sustainable.",
      },
    ],
    techStack: ["React Native", "Expo", "Push Notifications", "Mobile UX", "Product Design"],
    screenshots: [
      {
        title: "Grid overview",
        caption: "The main interface turns streaks into something users can read at a glance.",
        image: "/images/focusgrid.png",
        objectPosition: "center top",
      },
      {
        title: "Habit logging",
        caption: "Tapping into a habit is deliberately lightweight to support daily repeat use.",
        image: "/images/focusgrid.png",
        objectPosition: "center center",
      },
      {
        title: "Progress feedback",
        caption: "Progress visuals reinforce consistency without relying on noisy gamification patterns.",
        image: "/images/focusgrid.png",
        objectPosition: "center bottom",
      },
    ],
    metrics: [
      { label: "Users", value: "1,000+" },
      { label: "Goal", value: "<5 second logging" },
      { label: "Core pattern", value: "Grid-based streaks" },
    ],
    nextProjectSlug: "themegen",
  },
  {
    slug: "themegen",
    eyebrow: "Developer tool",
    headline: "Turning color exploration into production-ready theme output.",
    summary:
      "ThemeGen helps designers and developers create accessible palettes quickly, audit contrast, and export code they can actually ship. The goal was to make accessibility and polish feel built-in, not bolted on.",
    role: "Solo builder · Front-end engineer",
    timeline: "Rapid product iteration",
    outcome:
      "The final workflow balances play and precision: users can shuffle, lock, preview, audit, share, and export themes without leaving the browser.",
    challenge: [
      "Color tools often split the fun part of exploration from the practical part of implementation.",
      "Accessibility checks are usually treated as an afterthought instead of a core design constraint.",
      "Developers need export formats that fit directly into production systems, not just pretty previews.",
    ],
    process: [
      {
        title: "Exploration without chaos",
        body:
          "I designed the interface so users could experiment quickly with shuffling and locking colors while still feeling grounded by clear previews and system structure.",
      },
      {
        title: "Accessibility in the loop",
        body:
          "WCAG contrast feedback is part of the main flow, which nudges users toward stronger decisions while they're still exploring rather than after they've committed.",
      },
      {
        title: "Exportable output",
        body:
          "I focused on practical outputs like CSS variables, Tailwind config, and SCSS so the tool earns its place in a real workflow, not just a design playground.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG", "URL State"],
    screenshots: [
      {
        title: "Palette builder",
        caption: "An editing surface built for fast iteration, theme locking, and immediate visual feedback.",
        image: "/images/themegen.png",
        objectPosition: "center top",
      },
      {
        title: "Accessibility audit",
        caption: "Contrast results stay visible while users iterate so accessibility stays part of the creative loop.",
        image: "/images/themegen.png",
        objectPosition: "center center",
      },
      {
        title: "Code export",
        caption: "Finished themes can be exported into formats that drop directly into product codebases.",
        image: "/images/themegen.png",
        objectPosition: "center bottom",
      },
    ],
    metrics: [
      { label: "Exports", value: "CSS · Tailwind · SCSS" },
      { label: "Primary win", value: "Accessibility-first" },
      { label: "Experience", value: "Shareable in-browser" },
    ],
    nextProjectSlug: "favicon-gen",
  },
  {
    slug: "favicon-gen",
    eyebrow: "Frontend utility",
    headline: "A no-backend favicon generator that gets users to finished assets fast.",
    summary:
      "Favicon Gen was built to remove the annoying parts of a common task: generating every icon size, packaging assets cleanly, and giving developers the exact snippets they need to ship.",
    role: "Solo builder",
    timeline: "Small tool, sharp scope",
    outcome:
      "The finished product generates all primary favicon sizes, outputs a ready-to-use ZIP bundle, and works entirely in the browser from an image, emoji, or flat color.",
    challenge: [
      "Developers often waste time bouncing between image tools, online generators, and manual file organization.",
      "The experience needed to feel instant and trustworthy without requiring uploads or accounts.",
      "Outputs had to cover practical edge cases like Apple-style treatment and manifest-ready assets.",
    ],
    process: [
      {
        title: "Tight scope",
        body:
          "I kept the product intentionally narrow: upload or generate a source, preview the result, and download a complete asset pack. That restraint makes the tool feel fast and obvious.",
      },
      {
        title: "Browser-only generation",
        body:
          "Everything runs client-side, which improves privacy and eliminates backend complexity. It also means the feedback loop is immediate.",
      },
      {
        title: "Developer-ready output",
        body:
          "The generator includes the files and snippets people actually need, so it bridges the gap between design assets and implementation.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Canvas API", "ZIP generation", "Client-side processing"],
    screenshots: [
      {
        title: "Input modes",
        caption: "Users can start from an uploaded image, typed emoji, or a flat brand color.",
        image: "/images/favicon-gen.png",
        objectPosition: "center top",
      },
      {
        title: "Asset preview",
        caption: "The interface makes it easy to verify the generated icon set before export.",
        image: "/images/favicon-gen.png",
        objectPosition: "center center",
      },
      {
        title: "Export package",
        caption: "Finished output includes the favicon sizes, manifest-ready files, and snippets needed to ship.",
        image: "/images/favicon-gen.png",
        objectPosition: "center bottom",
      },
    ],
    metrics: [
      { label: "Output sizes", value: "7 PNG variants" },
      { label: "Input types", value: "Image · Emoji · Color" },
      { label: "Infra", value: "No backend" },
    ],
    nextProjectSlug: "og-checker",
  },
  {
    slug: "og-checker",
    eyebrow: "SEO / social sharing tool",
    headline: "Previewing and auditing how links actually appear before they ship.",
    summary:
      "OG Checker helps developers and marketers catch metadata issues early by combining platform-specific previews with a practical audit workflow.",
    role: "Solo builder",
    timeline: "Fast utility product build",
    outcome:
      "The tool gives users a realistic preview across major platforms, scores missing or weak metadata, and exposes the raw tags for debugging when something looks off.",
    challenge: [
      "Open Graph debugging is usually split across multiple tools and social platforms with inconsistent previews.",
      "CORS and relative image URLs make simple client-side validation unreliable.",
      "Users need both a quick visual answer and detailed metadata visibility when debugging edge cases.",
    ],
    process: [
      {
        title: "Faithful previews",
        body:
          "I focused on platform-specific card previews first because users need a fast yes-or-no answer: does this link look right when shared?",
      },
      {
        title: "Audit + raw inspection",
        body:
          "From there, I paired the preview layer with a scored checklist and raw metadata table so the tool helps both quick validation and deeper debugging.",
      },
      {
        title: "Server-side fetch strategy",
        body:
          "Fetching metadata server-side avoids the usual browser limitations and allows the tool to resolve relative OG image paths more reliably.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Server-side fetching", "Open Graph", "SEO tooling"],
    screenshots: [
      {
        title: "Share preview",
        caption: "Users can compare how the same URL will render across major social platforms.",
        image: "/images/og-checker.png",
        objectPosition: "center top",
      },
      {
        title: "Audit checklist",
        caption: "The audit layer highlights missing tags and weak metadata before a link goes live.",
        image: "/images/og-checker.png",
        objectPosition: "center center",
      },
      {
        title: "Raw metadata",
        caption: "When something breaks, the raw tag view makes the debugging path a lot shorter.",
        image: "/images/og-checker.png",
        objectPosition: "center bottom",
      },
    ],
    metrics: [
      { label: "Preview targets", value: "X · Facebook · LinkedIn" },
      { label: "Debug aid", value: "Raw tag table" },
      { label: "Fetch mode", value: "Server-side" },
    ],
    nextProjectSlug: "movati",
  },
];

export function getCaseStudyBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!project || !caseStudy) {
    return null;
  }

  return {
    ...project,
    ...caseStudy,
  };
}

export function getAllCaseStudies() {
  return caseStudies
    .map((caseStudy) => getCaseStudyBySlug(caseStudy.slug))
    .filter((item) => item !== null);
}
