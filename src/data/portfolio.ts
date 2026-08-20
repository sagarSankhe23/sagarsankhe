import {
  Activity,
  Award,
  BadgeCheck,
  Boxes,
  Bug,
  CalendarClock,
  Database,
  FileCheck2,
  GitBranch,
  Layers,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Workflow,
} from "lucide-react";

export const person = {
  name: "Sagar Sankhe",
  role: "Deputy Manager — Quality Assurance",
  specialism: "Capital Markets & BFSI Fintech · 8+ Years",
  company: "JM Financial Services Limited",
  title: "Deputy Manager, Quality Assurance",
  location: "Mumbai, India",
  email: "sagarsankhe23@gmail.com",
  linkedin: "https://linkedin.com/in/sagarsankhe23",
  github: "https://qaforge.netlify.app",
  
  resumeSite: "https://sagarsankheportfolio.netlify.app",
  summary:
    "8+ years of QA expertise in BFSI and capital markets fintech, delivering zero-defect production releases across trading and non-trading platforms (Mobile, Web, EXE). Deep domain knowledge in Equity, F&O, Currency and Commodities — including OMS, RMS, BOD files and multi-exchange risk validation. ISTQB CTFL v4.0 certified and creator of QA Forge.",
};

export const typingLines = [
  "Zero critical defects across 25+ releases.",
  "880+ test cases for order lifecycle coverage.",
  "OMS · RMS · BOD/EOD · multi-exchange sync.",
  "Exchange-approval QA sign-off, end to end.",
];

export const stats = [
  { label: "Years Experience", value: 8, suffix: "+", icon: CalendarClock },
  { label: "Test Cases Executed", value: 12500, suffix: "+", icon: FileCheck2 },
  { label: "Bugs Reported", value: 2400, suffix: "+", icon: Bug },
  { label: "Successful Releases", value: 25, suffix: "+", icon: Rocket },
  { label: "Projects Delivered", value: 18, suffix: "", icon: Boxes },
  { label: "Capital Market Modules", value: 30, suffix: "+", icon: LineChart },
];

export const experience = [
  {
    company: "JM Financial Services Limited",
    logo: "JM",
    role: "Deputy Manager, Quality Assurance",
    period: "Feb 2025 — Aug 2026",
    location: "Andheri, Mumbai",
    current: false,
    responsibilities: [
      "Own end-to-end QA sign-off for the JM Pro Trading Platform across Mobile, Web and Blink Trade EXE.",
      "Author structured test coverage for order lifecycle matrices, Default Order Settings, IPO, Stock Pledge and MTF Pledge.",
      "Drive BOD sanity checklists and release readiness across Product, Business and Support.",
    ],
    achievements: [
      "25+ production releases with zero critical post-release defects.",
      "880+ structured test cases authored and maintained.",
      "QA sign-off contribution that secured exchange approval for Blink Trade EXE across all segments.",
    ],
    tech: ["JIRA", "Postman", "SQL", "Jenkins", "Admin-NEST", "JMeter", "Claude AI"],
  },
  {
    company: "Angel One Limited",
    logo: "AO",
    role: "Quality Engineer II",
    period: "Mar 2021 — Jan 2025",
    location: "Andheri, Mumbai",
    responsibilities: [
      "Owned QA strategy for the Spark Trading Platform — full OMS workflows for Equity and Derivatives.",
      "Designed and maintained regression suites covering 500+ critical trading workflows.",
      "Led QA for TWA applications across Android, iOS and Web.",
    ],
    achievements: [
      "Zero P1 incidents attributable to QA gaps.",
      "15–20 critical defects identified per release cycle.",
      "QA of the Month, League of Extraordinary Angelites and Outstanding Employee of the Month.",
    ],
    tech: ["Regression Suites", "Postman", "LambdaTest", "Agile/Scrum", "Android", "iOS"],
  },
  {
    company: "Rupeeseed Technologies Ventures Limited",
    logo: "RS",
    role: "Quality Analyst",
    period: "Jul 2018 — Mar 2021",
    location: "Mumbai, India",
    responsibilities: [
      "Verified OMS, RMS and Admin Terminal functionality across Web, Mobile and EXE for multiple brokers.",
      "Validated RMS margin calculations for Equity, Futures & Options.",
    ],
    achievements: [
      "Margin validation across VAR, ELM, SPAN and Exposure Margin models.",
      "Multi-broker release verification with audit-ready evidence.",
    ],
    tech: ["OMS", "RMS", "Admin Terminal", "SQL", "Excel Modelling"],
  },
];

export const skillGroups = [
  {
    name: "Testing",
    icon: ShieldCheck,
    skills: [
      { label: "Functional & Regression", level: 96 },
      { label: "System & Integration", level: 92 },
      { label: "Sanity / Smoke / UAT", level: 94 },
      { label: "Release Sign-off", level: 95 },
    ],
  },
  {
    name: "Databases",
    icon: Database,
    skills: [
      { label: "SQL Query & Validation", level: 88 },
      { label: "BOD/EOD Data Integrity", level: 93 },
      { label: "Backend Reconciliation", level: 90 },
    ],
  },
  {
    name: "API",
    icon: Workflow,
    skills: [
      { label: "Postman / REST Testing", level: 92 },
      { label: "Contract & Payload Validation", level: 88 },
      { label: "JMeter Performance", level: 80 },
    ],
  },
  {
    name: "Agile",
    icon: Activity,
    skills: [
      { label: "Scrum & Sprint QA", level: 95 },
      { label: "Defect Lifecycle Management", level: 94 },
      { label: "Test Strategy & Estimation", level: 90 },
    ],
  },
  {
    name: "Capital Markets",
    icon: LineChart,
    skills: [
      { label: "OMS Order Lifecycle", level: 97 },
      { label: "RMS & Margins (VAR/ELM/SPAN)", level: 93 },
      { label: "Equity · F&O · Currency · Commodities", level: 95 },
      { label: "Multi-exchange Sync", level: 90 },
    ],
  },
  {
    name: "Automation Basics",
    icon: GitBranch,
    skills: [
      { label: "Jenkins CI/CD Pipelines", level: 78 },
      { label: "LambdaTest Cloud Grid", level: 82 },
      { label: "AI-assisted Test Authoring", level: 88 },
    ],
  },
];

export const projects = [
  {
    name: "QA Forge",
    status: "Live",
    tagline: "AI-powered test case management platform",
    link: "https://qaforge.netlify.app",
    role: "Creator & Product QA Lead",
    responsibilities: [
      "Designed the sprint board, AI-generated test library and Share & Sign-off flows.",
      "Integrated the Claude API for requirement-to-test-case generation.",
    ],
    tech: ["Claude API", "Test Management", "Sprint Board", "Sign-off Workflows"],
    challenge:
      "Manual authoring of exchange-specific test cases consumed entire sprint days and drifted from BRD language.",
    impact: "Cuts test authoring time by ~40% while keeping traceability audit-ready.",
    accent: "primary" as const,
  },
  {
    name: "RISK–BULLET",
    status: "Production",
    tagline: "Multi-exchange risk management validation",
    role: "Backend QA Owner",
    responsibilities: [
      "Led BOD file generation validation across 5 trading platforms.",
      "Verified scheduler jobs, Holdings, Positions, Ledger and Client Blocking data integrity.",
    ],
    tech: ["SQL", "Scheduler Jobs", "UAT→Prod Checks", "RMS"],
    challenge:
      "A single malformed BOD file could distort risk limits for thousands of clients at market open.",
    impact: "Clean start-of-day risk state across all five platforms, release after release.",
    accent: "violet" as const,
  },
  {
    name: "Blink Trade EXE",
    status: "Shipped",
    tagline: "Exchange approval QA programme",
    role: "QA Sign-off Lead",
    responsibilities: [
      "Validated order flow, risk controls, compliance rules and performance benchmarks.",
      "Produced the evidence pack submitted for exchange certification.",
    ],
    tech: ["EXE Desktop", "Compliance", "Performance", "OMS"],
    challenge:
      "Exchange certification demanded evidence for every segment with no room for rework cycles.",
    impact: "Full exchange approval secured across all segments on the first submission.",
    accent: "primary" as const,
  },
  {
    name: "JM Pro Trading Platform",
    status: "Production",
    tagline: "Mobile, Web and desktop trading suite",
    role: "End-to-end QA Owner",
    responsibilities: [
      "Own release QA for Mobile, Web and EXE builds across all segments.",
      "Maintain order lifecycle matrices, IPO, Stock Pledge and MTF Pledge coverage.",
    ],
    tech: ["Android", "iOS", "Web", "EXE", "JIRA", "Postman"],
    challenge:
      "Three client platforms sharing one OMS backend meant defects surfaced asymmetrically.",
    impact: "25+ releases shipped with zero critical post-release defects.",
    accent: "violet" as const,
  },
];

export const certifications = [
  {
    name: "ISTQB Certified Tester Foundation Level (CTFL) v4.0",
    issuer: "ISTQB",
    date: "Oct 2024",
    status: "Certified",
    icon: BadgeCheck,
  },
  {
    name: "ISTQB CT-AI — AI Testing (Generative AI)",
    issuer: "ISTQB",
    date: "Expected Sept 2026",
    status: "In progress",
    icon: Sparkles,
  },
  {
    name: "Generative AI Tools",
    issuer: "Skill Nation",
    date: "Jun 2026",
    status: "Certified",
    icon: Layers,
  },
  {
    name: "AI Tools Workshop",
    issuer: "Be10x",
    date: "Mar 2026",
    status: "Certified",
    icon: Sparkles,
  },
];

export const awards = [
  {
    name: "QA of the Month",
    org: "Angel One",
    date: "Jul 2024",
    note: "Recognised for regression depth on the Spark Trading Platform.",
    icon: Trophy,
  },
  {
    name: "League of Extraordinary Angelites",
    org: "Angel One",
    date: "Jun 2023",
    note: "Company-wide recognition for sustained release quality.",
    icon: Award,
  },
  {
    name: "Outstanding Employee of the Month",
    org: "Angel One",
    date: "2022",
    note: "Awarded for zero-P1 delivery across derivative workflows.",
    icon: Trophy,
  },
  {
    name: "Exchange Approval Sign-off",
    org: "JM Financial",
    date: "2025",
    note: "QA lead on the certification pack for Blink Trade EXE.",
    icon: ShieldCheck,
  },
];

export const testimonials = [
  {
    quote:
      "Sagar treats a trading platform like a regulated system, not an app. His order-lifecycle matrices caught margin edge cases nobody else was looking for — releases became genuinely predictable.",
    name: "Product Manager",
    title: "Trading Platforms · JM Financial",
  },
  {
    quote:
      "In four years on Spark, we never had a P1 traced back to a QA gap. That is Sagar's regression discipline, not luck.",
    name: "Engineering Manager",
    title: "Retail Broking · Angel One",
  },
  {
    quote:
      "He walked our exchange certification evidence pack through review without a single rework cycle. Rare composure under audit pressure.",
    name: "Compliance Lead",
    title: "Capital Markets · BFSI",
  },
  {
    quote:
      "QA Forge started as his side project and became how our team writes test cases. He builds tools for the problems he refuses to keep solving manually.",
    name: "QA Peer",
    title: "Automation & Tooling",
  },
];

export const resumeEntries = [
  {
    section: "Profile",
    items: [
      "Senior QA engineer with 8+ years validating trading and risk systems for India's most active capital markets firms.",
      "Full order lifecycle coverage: placement, modification, cancellation, margin and risk checks, BOD/EOD processing, multi-exchange sync.",
      "Segments: Equity, F&O, Currency, Commodities. Systems: OMS, RMS, Admin Terminal.",
    ],
  },
  {
    section: "Experience — JM Financial Services (Feb 2025 — Aug 2026)",
    items: [
      "Deputy Manager, Quality Assurance — Andheri, Mumbai.",
      "End-to-end QA sign-off for JM Pro Trading Platform across Mobile, Web and Blink Trade EXE.",
      "880+ structured test cases covering order lifecycle matrices, Default Order Settings, IPO, Stock Pledge, MTF Pledge, BOD sanity.",
      "RISK–BULLET backend validation: BOD file generation across 5 trading platforms.",
      "25+ production releases with zero critical post-release defects.",
    ],
  },
  {
    section: "Experience — Angel One (Mar 2021 — Jan 2025)",
    items: [
      "Quality Engineer II — Andheri, Mumbai.",
      "QA strategy for Spark Trading Platform: OMS workflows for Equity and Derivatives on Android, iOS and Web.",
      "Regression suites of 500+ critical trading workflows; zero P1 incidents attributable to QA gaps.",
      "TWA application QA; 15–20 critical defects identified per release cycle.",
    ],
  },
  {
    section: "Experience — Rupeeseed Technologies (Jul 2018 — Mar 2021)",
    items: [
      "Quality Analyst — Mumbai, India.",
      "OMS, RMS and Admin Terminal verification across Web, Mobile and EXE for multiple brokers.",
      "RMS margin validation for Equity, Futures & Options using VAR, ELM, SPAN and Exposure Margin.",
    ],
  },
  {
    section: "Skills",
    items: [
      "Testing: functional, regression, system, sanity, smoke, UAT, release sign-off.",
      "API & DB: Postman, REST payload validation, SQL validation, JMeter performance.",
      "Tools: JIRA, Jenkins CI/CD, LambdaTest, Claude AI, QA Forge, Admin-NEST.",
      "Methodology: Agile/Scrum, sprint QA, defect lifecycle, test strategy.",
    ],
  },
  {
    section: "Certifications & Awards",
    items: [
      "ISTQB Certified Tester Foundation Level (CTFL) v4.0 — Oct 2024.",
      "ISTQB CT-AI — AI Testing (Generative AI) — expected Sept 2026.",
      "Generative AI Tools, Skill Nation — Jun 2026; AI Tools Workshop, Be10x — Mar 2026.",
      "QA of the Month (Angel One, Jul 2024); League of Extraordinary Angelites (Jun 2023); Outstanding Employee (Aug & Sep 2021).",
    ],
  },
  {
    section: "Education",
    items: [
      "Bachelor of Engineering — Information Technology, 2017.",
      "Vidyavardhini's College of Engineering & Technology, Vasai · Mumbai University.",
    ],
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Stats", href: "#stats" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];
