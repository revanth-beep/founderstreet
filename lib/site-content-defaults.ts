/**
 * Default marketing copy — merged with DB overrides in getSiteContent().
 * Edit here for code defaults; override any field in Admin → Site content.
 */
export type HeroCms = {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  subtitle: string;
  subtitleEmphasis: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  statsLabel: string;
  stats: { value: string; label: string }[];
};

export type ServicesHeaderCms = {
  label: string;
  title: string;
  titleGradient: string;
  subtitle: string;
};

export type ServiceCardCms = {
  n: string;
  tag: string;
  name: string;
  desc: string;
  href: string;
  price?: string;
};

export type ResourcesTeaserCms = {
  eyebrow: string;
  titleBefore: string;
  titleGradient: string;
  viewAllLabel: string;
  maxPosts: number;
};

export type PartnerPillCms = {
  name: string;
  cat: string;
};

export type PartnerMarqueeCms = {
  headline: string;
  partners: PartnerPillCms[];
};

export type FounderStoryCms = {
  name: string;
  role: string;
  sector: string;
  avatar: string;
  quote: string;
  result: string;
  /** 1–5 stars shown on the card */
  rating: number;
};

export type FounderStoriesCms = {
  eyebrow: string;
  title: string;
  stories: FounderStoryCms[];
};

export type AboutValueIcon = "target" | "zap" | "heart";

export type AboutValueCms = {
  icon: AboutValueIcon;
  title: string;
  desc: string;
};

export type AboutTeamMemberCms = {
  name: string;
  role: string;
  background: string;
  image: string;
  department?: string;
};

export type TeamPageMemberCms = {
  name: string;
  role: string;
  background: string;
  image: string;
  department: string;
};

export type TeamPageCms = {
  metadata: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  departments: string[];
  members: TeamPageMemberCms[];
};

export type AboutPageCms = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    lead: string;
  };
  story: {
    label: string;
    titleLine1: string;
    titleGradient: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  values: {
    label: string;
    title: string;
    items: AboutValueCms[];
  };
  team: {
    label: string;
    title: string;
    members: AboutTeamMemberCms[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

// ─── Nav / Footer link types ───────────────────────────────────────────────

export type NavServiceItem = { name: string; href: string; desc: string };
export type FooterLink = { name: string; href: string };

// ─── Home section types ────────────────────────────────────────────────────

export type WhyReason = { iconName: string; title: string; desc: string };
export type ComparisonRow = { label: string; them: string; us: string };
export type ProcessStep = { iconName: string; step: string; title: string; desc: string; duration: string };
export type HomeFaqItem = { q: string; a: string };

export type WhySectionCms = {
  eyebrow: string;
  title: string;
  titleGradient: string;
  subtitle: string;
  reasons: WhyReason[];
  comparison: ComparisonRow[];
};

export type ProcessSectionCms = {
  eyebrow: string;
  title: string;
  titleGradient: string;
  steps: ProcessStep[];
};

export type CtaSectionCms = {
  title: string;
  titleItalic: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  note: string;
};

export type HomeFaqCms = {
  eyebrow: string;
  title: string;
  titleGradient: string;
  items: HomeFaqItem[];
};

export type StyleworkCms = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type HealthCheckBlockCms = {
  eyebrow: string;
  badge: string;
  title: string;
  titleGradient: string;
  subtitle: string;
  bullets: string[];
  buttonLabel: string;
  buttonHref: string;
};

// ─── Service page extra content types ─────────────────────────────────────

export type ValidationDeliverable = { iconName: string; title: string; desc: string; points: string[] };
export type IncorporationStep = { step: string; title: string; desc: string; time: string };
export type IncorporationBundle = { iconName: string; title: string; items: string[] };
export type AccountingServiceCard = { iconName: string; title: string; desc: string; features: string[] };
export type MarketingServiceItem = { title: string; desc: string; metrics: string[] };
export type MarketingCategory = { category: string; iconName: string; items: MarketingServiceItem[] };
export type MarketingResult = { metric: string; context: string; detail: string };
export type AiStudioCard = { n: string; title: string; sub: string; tool: string; note: string };
export type WebDevServiceCard = { iconName: string; number: string; title: string; desc: string; features: string[] };
export type FundingCoreService = { iconName: string; title: string; desc: string; deliverables: string[] };
export type BeyondAlgorithmCard = { iconName: string; title: string; desc: string };

// ─── Service page types ────────────────────────────────────────────────────

export type ServicePagePricingTier = {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  cta: string;
};

export type ServicePageFaqItem = {
  question: string;
  answer: string;
};

export type ServicePageHeroCms = {
  label: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaText: string;
  stats: { value: string; label: string }[];
};

export type ServicePageCms = {
  meta: { title: string; description: string };
  hero: ServicePageHeroCms;
  faq: ServicePageFaqItem[];
  pricing: ServicePagePricingTier[];
  bottomCta: { title: string; subtitle: string; buttonLabel: string };
};

// ─── Contact page types ────────────────────────────────────────────────────

export type ContactDetailCms = {
  label: string;
  value: string;
  href: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type ContactPageCms = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  details: ContactDetailCms[];
  socialLinks: { linkedin: string; twitter: string; instagram: string };
  responseBadge: { title: string; subtitle: string };
  faqQuestions: FaqItem[];
};

// ─── Legal page types ─────────────────────────────────────────────────────

export type LegalSection = { heading: string; body: string };

export type LegalPageCms = {
  lastUpdated: string;
  sections: LegalSection[];
};

// ─── Main SiteContent type ─────────────────────────────────────────────────

export type SiteContent = {
  /** URL for the browser tab favicon. Leave empty to use the default /favicon.ico. */
  favicon: string;
  nav: {
    brandName: string;
    subsidiaryText: string;
    healthPromoTitle: string;
    healthPromoSubtitle: string;
    healthCtaShort: string;
    phone: string;
    whatsappUrl: string;
    logoUrl: string;
    logoSize: number;
    logoTagline: string;
    services: NavServiceItem[];
  };
  footer: {
    brandName: string;
    subsidiaryText: string;
    description: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    /** Full copyright line (include © and year is added in UI if you use {year} token) */
    copyrightTemplate: string;
    logoUrl: string;
    socialLinks: { linkedin: string; twitter: string; instagram: string };
    serviceLinks: FooterLink[];
    companyLinks: FooterLink[];
  };
  home: {
    hero: HeroCms;
    services: ServicesHeaderCms;
    serviceCards: ServiceCardCms[];
    resourcesTeaser: ResourcesTeaserCms;
    partnerMarquee: PartnerMarqueeCms;
    founderStories: FounderStoriesCms;
    why: WhySectionCms;
    process: ProcessSectionCms;
    cta: CtaSectionCms;
    faq: HomeFaqCms;
    stylework: StyleworkCms;
    healthCheckBlock: HealthCheckBlockCms;
  };
  aboutPage: AboutPageCms;
  resourcesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    statArticlesLabel: string;
    statCategoriesLabel: string;
    statReadersLabel: string;
    statReadersValue: string;
  };
  teamPage: TeamPageCms;
  contactPage: ContactPageCms;
  privacyPage: LegalPageCms;
  termsPage: LegalPageCms;
  servicePages: {
    validation: ServicePageCms & { deliverables: ValidationDeliverable[] };
    incorporation: ServicePageCms & { steps: IncorporationStep[]; bundles: IncorporationBundle[] };
    accounting: ServicePageCms & { serviceCards: AccountingServiceCard[] };
    marketing: ServicePageCms & { serviceCategories: MarketingCategory[]; results: MarketingResult[]; aiStudio: AiStudioCard[] };
    webDevelopment: ServicePageCms & { serviceCards: WebDevServiceCard[]; techStack: string[] };
    funding: ServicePageCms & { coreServices: FundingCoreService[]; beyondAlgorithm: BeyondAlgorithmCard[] };
  };
  /** Escape hatch: arbitrary JSON merged on top (advanced). */
  custom?: Record<string, unknown>;
};

export const defaultSiteContent: SiteContent = {
  favicon: "",
  nav: {
    brandName: "Founderstreet",
    subsidiaryText: "by Northville Consulting Group",
    healthPromoTitle: "Test Your Idea, Free",
    healthPromoSubtitle: "5 questions. Get a free SWOT report instantly.",
    healthCtaShort: "Test Your Idea",
    phone: "+91 98765 43210",
    whatsappUrl: "https://wa.me/919876543210",
    logoUrl: "/logos/logo-icon-color.png",
    logoSize: 44,
    logoTagline: "",
    services: [
      { name: "Test Your Idea", href: "/services/validation", desc: "Market sizing, SWOT & unit economics" },
      { name: "Incorporation & Compliance", href: "/services/incorporation", desc: "End-to-end company registration" },
      { name: "Accounting & Virtual CFO", href: "/services/accounting", desc: "Financial plumbing for founders" },
      { name: "Marketing & Retail", href: "/services/marketing", desc: "Full-funnel digital and offline growth" },
      { name: "Web & Tech Development", href: "/services/web-development", desc: "Scalable storefronts and platforms" },
      { name: "Investor Funding", href: "/services/funding", desc: "Pitch decks, projections & matchmaking" },
      { name: "Co-working Space", href: "/contact", desc: "Get access to 1200+ co-working spaces across India" },
    ],
  },
  footer: {
    brandName: "Founderstreet",
    subsidiaryText: "by Northville Consulting Group",
    description:
      "The unseen engine behind India's next great startups. From Day Zero to Pre-Seed.",
    newsletterTitle: "Get the Founder's Edge.",
    newsletterSubtitle:
      "Weekly breakdown on unit economics, pitch tear-downs, and growth tactics.",
    copyrightTemplate: "© {year} Founderstreet by Northville Consulting LLP. All rights reserved.",
    logoUrl: "/logos/logo-icon-color.png",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/founderstreet-in/",
      twitter: "",
      instagram: "https://www.instagram.com/founderstreet.in/",
    },
    serviceLinks: [
      { name: "Test Your Idea", href: "/services/validation" },
      { name: "Company Incorporation", href: "/services/incorporation" },
      { name: "Accounting & Virtual CFO", href: "/services/accounting" },
      { name: "Digital Marketing", href: "/services/marketing" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Investor Funding", href: "/services/funding" },
    ],
    companyLinks: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Resources", href: "/resources" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Locations", href: "/locations" },
      { name: "Startup Health Check", href: "/startup-health-check" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  home: {
    hero: {
      eyebrow: "India's Startup Infrastructure Platform",
      titleBefore: "The Unseen Engine\nBehind India's",
      titleAccent: "Next Great",
      titleAfter: "Startups.",
      subtitle:
        "From Day Zero to Series A, we provide elite expertise in Compliance, Accounting, Marketing, Strategy, and Investor funding support to help founders launch and scale.",
      subtitleEmphasis: "You build the vision; we handle the execution.",
      ctaPrimaryLabel: "Pitch Your Idea",
      ctaPrimaryHref: "/contact",
      ctaSecondaryLabel: "Test Your Idea, Free",
      ctaSecondaryHref: "/startup-health-check",
      statsLabel: "Trusted by founders across India",
      stats: [
        { value: "150+", label: "Startups Launched" },
        { value: "₹40Cr+", label: "Funding Facilitated" },
        { value: "25+", label: "Investor Connects" },
        { value: "10 Days", label: "Avg. Incorporation" },
      ],
    },
    services: {
      label: "What We Do",
      title: "Six Pillars of",
      titleGradient: "Startup Infrastructure",
      subtitle:
        "Every service eliminates an execution bottleneck so you move faster, raise smarter, and scale further.",
    },
    serviceCards: [
      {
        n: "01",
        tag: "Validation",
        name: "Test Your Idea",
        desc: "Stress-test the concept before capital is deployed. Market sizing, SWOT, and unit economics built from first principles.",
        href: "/services/validation",
        price: "Free SWOT report",
      },
      {
        n: "02",
        tag: "Legal & Compliance",
        name: "Incorporation",
        desc: "End-to-end company registration in under 10 days. DIN, DSC, MOA, AOA, trademark. Completely handled.",
        href: "/services/incorporation",
        price: "Starting at ₹6,999",
      },
      {
        n: "03",
        tag: "Finance",
        name: "Virtual CFO",
        desc: "Institutional-grade bookkeeping, GST compliance, payroll, and strategic financial forecasting.",
        href: "/services/accounting",
        price: "Starting at ₹4,999/mo",
      },
      {
        n: "04",
        tag: "Growth",
        name: "Marketing & Retail",
        desc: "Full-funnel performance marketing. SEO, Google Ads, Meta Ads, OOH billboards, and retail distribution.",
        href: "/services/marketing",
        price: "Starting at ₹9,999/mo",
      },
      {
        n: "05",
        tag: "Technology",
        name: "Web & App Dev",
        desc: "Shopify stores, custom SaaS platforms, and mobile apps engineered for conversion and scale.",
        href: "/services/web-development",
        price: "Starting at ₹24,999",
      },
      {
        n: "06",
        tag: "Fundraising",
        name: "Investor Funding",
        desc: "12-slide pitch decks, 5-year financial models, and warm introductions to 775+ vetted investors: VCs, Angels, Banks, Family Offices, and Grants.",
        href: "/services/funding",
        price: "Starting at ₹9,999",
      },
    ],
    resourcesTeaser: {
      eyebrow: "The Founder's Brief",
      titleBefore: "Thinking Built for",
      titleGradient: "Builders",
      viewAllLabel: "All articles",
      maxPosts: 3,
    },
    partnerMarquee: {
      headline: "Our Network: Clients, Investors and Institutional Partners",
      partners: [
        { name: "706 Pictures", cat: "Client" },
        { name: "ICICI Bank", cat: "Investor Connect" },
        { name: "IIM Kashipur", cat: "Academic Partner" },
      ],
    },
    founderStories: {
      eyebrow: "Client Stories",
      title: "What Our Clients Say",
      stories: [
        {
          name: "706 Pictures",
          role: "Film Production Company",
          sector: "Media & Entertainment",
          avatar: "/team/placeholder.svg",
          quote:
            "The team at Founderstreet has been incredibly professional and significantly helped us organise our accounting system. We now rely on them for comprehensive bookkeeping, financial analysis, and taxation including GST, TDS, and ITR filing. They've streamlined our operations and given us complete peace of mind.",
          result: "Full-service accounting partnership",
          rating: 5,
        },
      ],
    },
    why: {
      eyebrow: "Why Founderstreet",
      title: "The Infrastructure Layer",
      titleGradient: "Investors Expect",
      subtitle:
        "Most early-stage startups fail not because of bad ideas, but because of bad execution. We remove every operational, legal, and financial blocker before they slow you down.",
      reasons: [
        { iconName: "ShieldCheck", title: "Compliance-First", desc: "Every structure we build passes due diligence. Our playbooks are designed for investors, not just regulators." },
        { iconName: "Zap", title: "Startup Velocity", desc: "Incorporation in 10 working days. Website in 4 days. Pitch deck in 5 days. We move fast without sacrificing rigour." },
        { iconName: "Users2", title: "Embedded, Not Outsourced", desc: "We integrate directly with your team: Slack, Notion, weekly calls. You get a co-founder, not a vendor." },
        { iconName: "Target", title: "Outcome-Aligned", desc: "No retainers for mediocrity. Our model is built on milestone delivery: our incentives align with yours." },
      ],
      comparison: [
        { label: "Incorporation speed", them: "4–6 weeks", us: "< 10 days" },
        { label: "Financial reporting", them: "Quarterly PDFs", us: "Live dashboards" },
        { label: "Investor intro access", them: "None", us: "700+ vetted contacts" },
        { label: "Pitch deck quality", them: "Template-based", us: "Bespoke narrative" },
        { label: "Pricing model", them: "Monthly retainer", us: "Flexible pricing" },
      ],
    },
    process: {
      eyebrow: "Our Process",
      title: "From Idea to Investment-Ready",
      titleGradient: "in Under 6 Months",
      steps: [
        { iconName: "Lightbulb", step: "01", title: "Idea Validation", desc: "Market sizing, SWOT, and unit economics before a single rupee is spent. We stress-test the concept with investor-grade rigour.", duration: "Week 1–2" },
        { iconName: "Rocket", step: "02", title: "Foundation Build", desc: "Company incorporated, bank accounts open, IP registered, and accounting setup live: legally ready to operate.", duration: "Week 2–4" },
        { iconName: "BarChart3", step: "03", title: "Growth Execution", desc: "Full-stack marketing, e-commerce, and retail distribution activated simultaneously for maximum early momentum.", duration: "Month 2–6" },
        { iconName: "Users", step: "04", title: "Investor Readiness", desc: "Pitch deck, 5-year financial models, and direct warm introductions to our vetted angel and VC network.", duration: "Month 4–8" },
      ],
    },
    cta: {
      title: "Ready to Build Something",
      titleItalic: "Extraordinary?",
      subtitle: "Book a free 30-minute strategy call. We'll review your idea, identify your biggest execution gaps, and show you exactly how we can help.",
      primaryLabel: "Book a Free Strategy Call",
      primaryHref: "/contact",
      secondaryLabel: "Take the Health Check",
      secondaryHref: "/startup-health-check",
      note: "No commitment required · Response within 24 hours",
    },
    faq: {
      eyebrow: "Common Questions",
      title: "Answers for",
      titleGradient: "Founders",
      items: [
        { q: "How long does company incorporation take?", a: "We get your company live in under 10 working days. The timeline covers Director Identification Numbers (DIN), Digital Signature Certificates (DSC), name reservation via MCA, MOA and AOA drafting, SPICe+ filing, and PAN and TAN registration. All filings handled by us." },
        { q: "What does the Virtual CFO service include?", a: "Virtual CFO covers monthly bookkeeping, GST and TDS compliance, payroll management, statutory filing (ITR, ROC), and strategic financial forecasting. You also get a dedicated CA, live financial dashboards, and investor-ready reporting. Pricing starts at ₹4,999/month." },
        { q: "How does the investor matching work?", a: "We maintain a curated list of 775+ vetted investors across VCs, Angels, Banks, Family Offices, and Grants with active investment mandates. After understanding your stage, sector, and funding requirement, we make warm introductions to the right investors and support the conversation through term sheet stage." },
        { q: "Do you work with idea-stage founders?", a: "Yes. Many of our clients come to us at Day Zero: pre-product, pre-revenue, and sometimes pre-team. Our validation and incorporation services are specifically designed for early-stage founders who need a structured foundation before building." },
        { q: "What is your pricing model?", a: "Pricing varies by service. Company Incorporation starts at ₹6,999. Virtual CFO starts at ₹4,999/month. Web development starts at ₹24,999. For investor funding and marketing engagements, we work on milestone-based retainers. Book a discovery call for a custom quote." },
        { q: "Do you offer refunds?", a: "We stand behind our work with a delivery guarantee on all compliance and incorporation filings. If we miss a committed deadline due to our error, we refund the fee for that milestone. Service fees for completed deliverables are non-refundable." },
      ],
    },
    stylework: {
      eyebrow: "Exclusive Ecosystem Perk",
      title: "Priority co-working access for Founderstreet portfolio companies",
      description: "Because Founderstreet operates as your infrastructure layer, portfolio companies receive priority onboarding and discounted desk and cabin rates at Stylework co-working locations across India.",
      buttonLabel: "Explore Ecosystem Perks",
      href: "/contact",
    },
    healthCheckBlock: {
      eyebrow: "Start Here",
      badge: "Powered by AI",
      title: "Get a Free SWOT Snapshot",
      titleGradient: "of Your Idea",
      subtitle: "Before you commit time and capital, stress-test your concept. Answer 5 questions and get a personalised SWOT report instantly, free.",
      bullets: [
        "Identify your biggest risks before investors do",
        "Understand market sizing and competitive gaps",
        "Delivered to your inbox in under 60 seconds",
      ],
      buttonLabel: "Run Your Free SWOT Now",
      buttonHref: "/startup-health-check",
    },
  },
  aboutPage: {
    metadata: {
      title: "About Us",
      description:
        "Founderstreet is the unseen engine behind India's next great startups. Learn about our mission, team, and values.",
    },
    hero: {
      eyebrow: "About Founderstreet",
      titleLine1: "We're the team that builds the scaffolding",
      titleAccent: "while you build the skyscraper.",
      lead:
        "Founderstreet was born from frustration. Three ex-founders who had each wasted critical early months on company registration, CAC spreadsheets, and pitch deck revisions instead of building product and acquiring customers.",
    },
    story: {
      label: "Our Story",
      titleLine1: "Built by Founders,",
      titleGradient: "for Founders",
      paragraphs: [
        "In 2021, our founding team was building three separate startups across different sectors. Each of us hit the same wall: the operational overhead of building a company in India was eating into our time to build the actual product.",
        "Incorporation took 6 weeks instead of 10 days. The CA we hired didn't understand startup equity or ESOP accounting. Our pitch deck looked like a school project. And we had no idea who the right investors were for our stage.",
        "So we built Founderstreet: the infrastructure layer we wished existed. Today, we've helped 150+ startups across India launch, scale, and raise over ₹40Cr in funding.",
      ],
      stats: [
        { value: "2021", label: "Founded" },
        { value: "150+", label: "Startups Served" },
        { value: "₹40Cr+", label: "Funding Facilitated" },
        { value: "4", label: "Cities Present" },
      ],
    },
    values: {
      label: "Our Values",
      title: "What Drives Us",
      items: [
        {
          icon: "target",
          title: "Outcome-Obsessed",
          desc:
            "Every deliverable has a measurable objective. We don't track hours. We track milestones. Our incentives are permanently aligned with yours.",
        },
        {
          icon: "zap",
          title: "Speed as a Competitive Advantage",
          desc:
            "Startups die of slow execution. We've engineered every process to move at startup velocity without sacrificing quality or compliance.",
        },
        {
          icon: "heart",
          title: "Founder-First, Always",
          desc:
            "We've all been founders. We know what it feels like to build something from nothing. Every decision we make is filtered through that lens.",
        },
      ],
    },
    team: {
      label: "The Team",
      title: "The People Behind the Platform",
      members: [
        {
          name: "Asmeet Bhatia",
          role: "Managing Director",
          background: "CA, MBA (ISB), B.Com (H)",
          image: "/team/asmeet-bhatia.avif",
        },
        {
          name: "Achal Bhatt",
          role: "Director - Marketing",
          background: "CPA, MSc. in Accounting (UIUC), NYFA",
          image: "/team/achal-bhatt.avif",
        },
      ],
    },
    cta: {
      title: "Ready to work with us?",
      subtitle:
        "Book a free 30-minute discovery call and let's figure out exactly how we can help you move faster.",
      buttonLabel: "Book a Free Call",
      buttonHref: "/contact",
    },
  },
  resourcesPage: {
    eyebrow: "The Founder's Brief",
    title: "Frameworks, Not Fluff.",
    subtitle:
      "Deep-dive playbooks for Indian founders navigating unit economics, fundraising, legal, and everything in between.",
    statArticlesLabel: "Articles",
    statCategoriesLabel: "Categories",
    statReadersLabel: "Readers",
    statReadersValue: "10K+",
  },
  teamPage: {
    metadata: {
      title: "Our Team: Founderstreet by Northville Consulting Group",
      description:
        "Meet the consultants, strategists, and operators behind Founderstreet by Northville Consulting Group.",
    },
    hero: {
      eyebrow: "Founderstreet by Northville Consulting Group",
      title: "The People Behind the Platform",
      subtitle:
        "Chartered Accountants, MBAs, ex-bankers, and growth operators working as one team to build India's next great startups.",
    },
    departments: ["Leadership", "Senior Consultants", "Consultants", "Associates", "Interns"],
    members: [
      { name: "Asmeet Bhatia", role: "Managing Director", background: "CA, MBA (ISB), B.Com (H)", image: "/team/asmeet-bhatia.avif", department: "Leadership" },
      { name: "Achal Bhatt", role: "Director, Marketing", background: "CPA, MSc. in Accounting (UIUC), NYFA", image: "/team/achal-bhatt.avif", department: "Leadership" },
      { name: "Neha Agarwal", role: "Senior Consultant, Investment Banking", background: "CA AIR 27, Ex-IB, Ex-Infosys", image: "/team/neha-agarwal.avif", department: "Senior Consultants" },
      { name: "MS Rehsi", role: "Senior Strategy Consultant", background: "Ex-CMO, Aircel", image: "/team/ms-rehsi.avif", department: "Senior Consultants" },
      { name: "Kiran Surana", role: "Senior Consultant, FP&A", background: "Chartered Accountant", image: "/team/placeholder.svg", department: "Senior Consultants" },
      { name: "Vishi Agarwal", role: "Senior Marketing Consultant", background: "CA, MBA (S.P. Jain), MSc (Univ. of Houston)", image: "/team/vishi-agarwal.avif", department: "Senior Consultants" },
      { name: "Nidhi Srivastava", role: "Senior Consultant, FP&A", background: "US CPA", image: "/team/nidhi-srivastava.avif", department: "Senior Consultants" },
      { name: "CA Priya Arora", role: "Finance Consultant", background: "CA, B.Com Accounting & Finance", image: "/team/priya-arora.avif", department: "Consultants" },
      { name: "Revanth Rallabandi", role: "Product Management Consultant", background: "ISB", image: "/team/placeholder.svg", department: "Consultants" },
      { name: "Mohit S.", role: "Due Diligence Consultant", background: "Chartered Accountant", image: "/team/mohit-s.avif", department: "Consultants" },
      { name: "Thiruvenkat R", role: "Marketing Consultant", background: "B.E (AI & ML), MBA (Pursuing)", image: "/team/thiruvenkat-r.avif", department: "Consultants" },
      { name: "Chanpreet Singh Gujral", role: "Strategy Associate", background: "BMS, Delhi University", image: "/team/chanpreet-gujral.avif", department: "Associates" },
      { name: "Shruti Meharia", role: "FP&A Associate", background: "B.Com Hons. (SRCC), CA (Pursuing)", image: "/team/shruti-meharia.avif", department: "Associates" },
      { name: "Krupa Nagdeote", role: "Graphic Designer", background: "IPM, IIM Rohtak", image: "/team/krupa-nagdeote.avif", department: "Associates" },
      { name: "Tanupreet Kaur", role: "Finance Intern", background: "B.Com (PU, Chandigarh), US CPA (Pursuing)", image: "/team/tanupreet-kaur.avif", department: "Interns" },
      { name: "Saksham Nagpal", role: "Finance Intern", background: "B.A. (Hons) Economics", image: "/team/placeholder.svg", department: "Interns" },
    ],
  },
  contactPage: {
    meta: {
      title: "Contact Us",
      description: "Book a free 30-minute discovery call with Founderstreet. Talk to our team about your startup.",
    },
    hero: {
      eyebrow: "Get in Touch",
      title: "Let's Talk About Your Startup.",
      subtitle: "Book a free 30-minute discovery call. We'll understand your stage, identify your biggest gaps, and tell you exactly how we can help. No pitch. No pressure.",
    },
    details: [
      { label: "Email", value: "hello@founderstreet.in", href: "mailto:hello@founderstreet.in" },
      { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
      { label: "Office", value: "DLF Cyber City, Gurugram, Haryana 122002", href: "" },
      { label: "Hours", value: "Monday–Saturday, 10:30 AM – 6:30 PM IST", href: "" },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/founderstreet-in/",
      twitter: "",
      instagram: "https://www.instagram.com/founderstreet.in/",
    },
    responseBadge: {
      title: "We respond within 24 hours",
      subtitle: "Every inquiry is reviewed by a senior team member. No automated responses, no gatekeeping.",
    },
    faqQuestions: [
      { q: "How much does incorporation cost?", a: "Starting at ₹9,999. Our packages cover DIN, DSC, MOA, AOA, and SPICe+ filing. A senior consultant will share a detailed quote based on your company structure within 24 hours." },
      { q: "How quickly can you build my pitch deck?", a: "We deliver a complete 12-slide investor-ready deck in 24 hours for fast-track requests. Standard delivery with revisions takes 5 to 7 working days." },
      { q: "Do you work with international founders?", a: "Yes. We work with founders based outside India who want to incorporate or operate in India. We handle all filings remotely and guide you through FEMA and FDI compliance." },
    ],
  },
  privacyPage: {
    lastUpdated: "April 2025",
    sections: [
      {
        heading: "",
        body: "Founderstreet (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our services.",
      },
      {
        heading: "Information We Collect",
        body: "We collect information you provide directly to us, such as your name, email address, phone number, and startup details when you fill out our contact form, subscribe to our newsletter, or use our startup health check tool.",
      },
      {
        heading: "How We Use Your Information",
        body: "We use the information we collect to provide our services, communicate with you, send newsletters (with your consent), and improve our platform.",
      },
      {
        heading: "Contact Us",
        body: "For privacy-related inquiries, contact us at hello@northvilleconsultinggroup.com",
      },
    ],
  },
  termsPage: {
    lastUpdated: "April 2025",
    sections: [
      {
        heading: "",
        body: "By using Founderstreet's services, you agree to these Terms of Service. Please read them carefully before engaging our services.",
      },
      {
        heading: "Services",
        body: "Founderstreet provides startup infrastructure services including company incorporation, accounting, marketing, web development, and fundraising support. All services are subject to a separate engagement agreement.",
      },
      {
        heading: "Payment",
        body: "Payment terms are specified in individual service agreements. Refund policies vary by service type. Please refer to your engagement letter for specific terms.",
      },
      {
        heading: "Contact",
        body: "For queries, contact hello@northvilleconsultinggroup.com",
      },
    ],
  },
  servicePages: {
    validation: {
      meta: {
        title: "Startup Idea Validation & Strategy",
        description: "Stress-test your concept before capital is deployed. Market sizing, SWOT analysis, competitor benchmarking, and unit economics modelling.",
      },
      hero: {
        label: "Validation & Strategy",
        title: "Stress-Test Your Idea",
        titleHighlight: "Before Capital Is Deployed.",
        subtitle: "We audit the concept with the same rigour an institutional investor would. Market sizing, competitive intelligence, and unit economics before you spend a single rupee.",
        ctaText: "Start Validation",
        stats: [
          { value: "85%", label: "Of validated ideas pivot at least once" },
          { value: "3x", label: "Higher success rate post-validation" },
          { value: "14 days", label: "Turnaround time" },
        ],
      },
      faq: [
        { question: "How long does the validation process take?", answer: "Our standard validation sprint takes 10–14 working days. We deliver a full report with market sizing, SWOT, and unit economics model, plus a 60-minute walkthrough call." },
        { question: "What data sources do you use for market sizing?", answer: "We use a combination of primary research (founder interviews, consumer surveys), secondary data (Statista, IBEF, industry reports), and bottom-up modelling from existing comparable businesses." },
        { question: "Will this analysis work for a pre-revenue idea?", answer: "Absolutely. In fact, this is where it's most valuable. Pre-revenue validation prevents you from building the wrong thing. We've validated ideas from napkin-sketch stage all the way to Series A." },
        { question: "Do you provide the SWOT report as a downloadable template?", answer: "Yes. Every client receives a fully editable PowerPoint and Excel model. You own all the IP. We also provide a condensed investor-ready version of the market analysis." },
        { question: "Can this replace a formal market research firm?", answer: "For early-stage startups, yes. Traditional market research firms charge ₹5–15L for slower, more generic reports. We're purpose-built for Indian startup contexts and move at startup velocity." },
      ],
      pricing: [
        { name: "SWOT Snapshot", price: "Free", desc: "5-question health check. Instant SWOT report emailed to you. No commitment.", features: ["SWOT summary", "Top 3 risks identified", "Founderstreet follow-up within 48 hrs"], highlight: false, cta: "Start Free" },
        { name: "Full Validation Sprint", price: "₹14,999", period: "one-time", desc: "Complete market validation in 14 working days.", features: ["TAM/SAM/SOM model", "Competitor landscape", "Unit economics model", "60-min walkthrough call", "Editable PowerPoint + Excel"], highlight: true, badge: "Most Popular", cta: "Book Validation" },
        { name: "Strategy + Validation", price: "₹24,999", period: "one-time", desc: "Validation + GTM strategy + pitch-ready market slide.", features: ["Everything in Full Sprint", "Go-to-market strategy", "Investor-ready market slide", "Positioning recommendation"], highlight: false, cta: "Book Strategy Package" },
      ],
      bottomCta: {
        title: "Ready to validate your idea?",
        subtitle: "Book a free 30-minute discovery call and we'll scope out your validation project within 24 hours.",
        buttonLabel: "Start My Validation",
      },
      deliverables: [
        { iconName: "BarChart3", title: "Market Sizing & TAM/SAM/SOM Analysis", desc: "We model your total addressable market from first principles, not just copying a McKinsey slide. You'll know the true revenue ceiling and exactly what share is realistic.", points: ["Bottom-up market model", "Revenue potential by geography", "3-scenario sizing (conservative/base/bull)"] },
        { iconName: "Target", title: "SWOT & Competitor Benchmarking", desc: "We audit every incumbent in your space: their CAC, LTV, pricing, and the gaps in their product. You'll know exactly where they're failing and how to win.", points: ["Competitive landscape map", "Whitespace opportunity analysis", "Positioning recommendation"] },
        { iconName: "TrendingUp", title: "Unit Economics Modelling", desc: "The most important slide in your deck. We build the exact CAC vs LTV model investors will stress-test, including payback periods and contribution margin.", points: ["CAC by acquisition channel", "LTV by cohort", "Payback period & break-even model"] },
      ],
    },
    incorporation: {
      meta: {
        title: "Company Incorporation & Compliance",
        description: "End-to-end company incorporation in India. Pvt Ltd, LLP, and sole proprietorship registration with IP protection.",
      },
      hero: {
        label: "Company Incorporation",
        title: "Your Legal Foundation,",
        titleHighlight: "Built Right From Day Zero.",
        subtitle: "End-to-end company registration and regulatory compliance. We handle the paperwork so your first 10 days are spent building product, not filing forms.",
        ctaText: "Start Incorporation",
        stats: [
          { value: "< 10 Working Days", label: "Avg. incorporation time" },
          { value: "100%", label: "Compliance success rate" },
        ],
      },
      faq: [
        { question: "What is the minimum share capital required for a Pvt Ltd company?", answer: "There is no minimum paid-up capital requirement for a Private Limited Company as per the Companies (Amendment) Act, 2015. However, the authorised share capital (typically ₹1,00,000) is required for stamp duty calculation." },
        { question: "How many directors and shareholders are needed?", answer: "A minimum of 2 directors and 2 shareholders are required for a Private Limited Company. The same person can act as both director and shareholder. Maximum directors allowed: 15 (can be increased by special resolution)." },
        { question: "What documents do I need to provide?", answer: "For each director: PAN card, Aadhaar card, passport-size photograph, current bank statement (utility bill for address proof), email ID, and mobile number. For the registered office: rental agreement and NOC from landlord." },
        { question: "Can I incorporate a company as a non-resident Indian (NRI)?", answer: "Yes. NRIs can be directors and shareholders in an Indian company. At least one director must be a resident of India (stayed in India for at least 182 days in the previous calendar year)." },
        { question: "What happens after incorporation?", answer: "Post-incorporation, we handle: commencement of business declaration, opening of bank accounts, registration for GST (if applicable), Startup India registration, and first-year annual compliance calendar setup." },
      ],
      pricing: [
        { name: "Private Limited", price: "₹6,999", features: [], desc: "Full Pvt Ltd registration. DIN, DSC, name reservation, MOA/AOA, SPICe+ filing, CIN, PAN, TAN.", highlight: false, cta: "Start Pvt Ltd" },
        { name: "Private Ltd + IP Bundle", price: "₹12,999", features: [], desc: "Everything in Pvt Ltd plus trademark search and filing, brand name legal clearance, and NDA templates.", highlight: true, badge: "Most Popular", cta: "Start with IP" },
        { name: "LLP Registration", price: "₹5,999", features: [], desc: "LLP incorporation for professional services firms. LLP Agreement, DPIN, DSC, and Certificate of Registration.", highlight: false, cta: "Start LLP" },
      ],
      bottomCta: {
        title: "Start your incorporation today",
        subtitle: "Get your company live in 10 working days. We handle every filing; you focus on building your product.",
        buttonLabel: "Start Incorporation",
      },
      steps: [
        { step: "01", title: "Director Identification Number (DIN)", desc: "We apply for DINs for all proposed directors. This is the first regulatory step in the incorporation process.", time: "Day 1–2" },
        { step: "02", title: "Digital Signature Certificate (DSC)", desc: "We obtain Class-3 DSCs for all directors, required for signing e-forms on the MCA portal.", time: "Day 1–3" },
        { step: "03", title: "Name Reservation via RUN", desc: "We file a name reservation request with MCA and get your company name approved. We send 3 alternatives.", time: "Day 3–5" },
        { step: "04", title: "MOA & AOA Drafting", desc: "We draft bespoke Memorandum and Articles of Association tailored to your business and investor needs.", time: "Day 4–6" },
        { step: "05", title: "SPICe+ Filing & CIN Issuance", desc: "We file the SPICe+ form with MCA. On approval, you receive your Certificate of Incorporation and CIN.", time: "Day 6–10" },
        { step: "06", title: "PAN, TAN & Bank Account", desc: "We immediately file for PAN and TAN, and assist in opening your company's current bank account.", time: "Day 10–14" },
      ],
      bundles: [
        { iconName: "FileText", title: "Complete Incorporation Bundle", items: ["Certificate of Incorporation", "PAN & TAN registration", "MOA & AOA documents", "Share certificates", "First board resolution", "Commencement certificate"] },
        { iconName: "Shield", title: "IP & Brand Protection", items: ["Trademark search & filing", "Class identification", "Domain registration", "Brand name legal clearance", "Logo copyright registration", "NDA templates"] },
        { iconName: "Award", title: "Post-Incorporation Setup", items: ["Startup India recognition", "GST registration (if needed)", "Bank account assistance", "Company letterhead & seal", "Annual compliance calendar", "CA introduction"] },
      ],
    },
    accounting: {
      meta: {
        title: "Accounting & Taxation: Virtual CFO",
        description: "Institutional-grade financial plumbing. Virtual CFO services, bookkeeping, payroll, GST compliance, and strategic runway management.",
      },
      hero: {
        label: "Accounting & Virtual CFO",
        title: "Accounting Built for",
        titleHighlight: "Founders, Not Accountants.",
        subtitle: "GST compliance, bookkeeping, payroll, and virtual CFO services built for early-stage startups. Focus 100% on product and growth: we handle the numbers.",
        ctaText: "Get Started",
        stats: [
          { value: "₹0", label: "Penalties across all clients" },
          { value: "48hr", label: "Monthly close cycle" },
          { value: "3x", label: "Faster due diligence" },
        ],
      },
      faq: [
        { question: "How is a Virtual CFO different from a regular CA?", answer: "A CA handles compliance: taxes, audits, and filings. A Virtual CFO handles strategy: financial modelling, fundraising preparation, runway management, and board reporting. We provide both under one roof, so you don't need to manage two separate relationships." },
        { question: "What accounting software do you use?", answer: "We primarily work with Zoho Books, QuickBooks, and Tally depending on client preference. We also integrate with Razorpay, Stripe, and other payment platforms for automated reconciliation. All clients get read-only access to their accounts in real time." },
        { question: "Can you help us prepare for a due diligence audit?", answer: "Absolutely. We maintain your accounts in investor-ready condition from Day 1. When due diligence begins, we provide a complete data room with audited financials, tax returns, GST filings, payroll records, and cap table documentation." },
        { question: "How do you handle startups with foreign investment?", answer: "We manage all FEMA compliance, RBI reporting requirements (FC-GPR, FC-TRS), and transfer pricing documentation required when a company receives foreign direct investment or has foreign directors." },
        { question: "What is the pricing structure?", answer: "Our packages start at ₹3,000/month for pre-seed founders. Pricing scales with your team size, transaction volume, and service needs. Book a free call and we will scope a custom package for your stage." },
      ],
      pricing: [
        { name: "Pre-Seed", price: "₹3,000", period: "/month", desc: "For idea-stage and pre-revenue founders", features: ["Monthly bookkeeping", "Bank reconciliation", "Email support"], highlight: false, cta: "Get Started" },
        { name: "Seed", price: "Contact Us", period: "", desc: "For pre-revenue startups", features: ["Monthly bookkeeping", "GST return filing", "Bank reconciliation", "Annual ITR filing", "Email support"], highlight: false, cta: "Get a Quote" },
        { name: "Growth", price: "Contact Us", period: "", desc: "For revenue-generating startups", features: ["Everything in Seed", "Payroll processing", "TDS deduction & filing", "Investor MIS reports", "Priority support", "Quarterly strategy call"], highlight: true, badge: "Most Popular", cta: "Get a Quote" },
        { name: "Scale", price: "Contact Us", period: "", desc: "For pre-Series A startups", features: ["Everything in Growth", "Virtual CFO services", "Fundraising model", "Board reporting", "Due diligence prep", "Dedicated CFO partner"], highlight: false, cta: "Get a Quote" },
      ],
      bottomCta: {
        title: "Get investor-grade financials from Day One",
        subtitle: "Stop managing spreadsheets. Get a dedicated finance team for less than the cost of a part-time accountant.",
        buttonLabel: "Start Financial Setup",
      },
      serviceCards: [
        { iconName: "TrendingUp", title: "Virtual CFO Services", desc: "High-level financial forecasting and runway management for early-stage startups. You get the strategic clarity of a ₹40L/yr CFO at a fraction of the cost.", features: ["Monthly financial health reports", "12-month cash flow forecasting", "Fundraising financial modelling", "Board-ready P&L presentations", "Burn rate optimisation", "Scenario planning (3 cases)"] },
        { iconName: "FileText", title: "Bookkeeping & Payroll", desc: "Automated, accurate, and on time. We use cloud accounting tools to give you real-time visibility into your finances without any manual reconciliation.", features: ["Monthly bookkeeping & reconciliation", "Payroll processing & payslips", "Vendor payment management", "Bank statement reconciliation", "TDS deduction & filing", "Expense management"] },
        { iconName: "Receipt", title: "GST & Taxation", desc: "Zero penalties. Optimised tax structures. We ensure every filing is on time and your tax structure is designed to minimise liability legally.", features: ["GST registration & filing (GSTR-1, 3B)", "Advance tax computation", "Annual income tax filing", "Tax audit support", "Transfer pricing advisory", "Startup tax exemptions (80-IAC)"] },
        { iconName: "PieChart", title: "Investor Reporting", desc: "Institutional-grade reporting for your angel investors, lead funds, and board. Structured exactly as institutional investors expect to see it.", features: ["Monthly MIS reports", "Investor deck financials", "KPI dashboards", "Cohort analysis", "Due diligence data room", "ESOP accounting"] },
      ],
    },
    marketing: {
      meta: {
        title: "Marketing & Retail Expansion",
        description: "Full-funnel growth engineering. SEO, Google Ads, Meta Ads, OOH billboards, retail distribution. Digital and offline marketing for Indian startups.",
      },
      hero: {
        label: "Marketing & Retail Expansion",
        title: "Full-Funnel Growth,",
        titleHighlight: "Online and Offline.",
        subtitle: "We engineer demand across every customer touchpoint: from Google search to highway billboards to retail shelf space. Integrated digital performance and high-impact offline activations.",
        ctaText: "Plan My Growth",
        stats: [
          { value: "15+", label: "States in distributor network" },
          { value: "50+", label: "D2C brands scaled" },
        ],
      },
      faq: [
        { question: "What kind of ROAS can we expect from Meta/Google Ads?", answer: "For D2C brands, we typically target a blended ROAS of 3–5x within the first 60–90 days. Performance varies by category, price point, and creative quality. We set realistic benchmarks in a discovery call before committing to targets." },
        { question: "Do you handle the creative/ad design as well?", answer: "Yes. Our performance marketing retainer includes ad creative production: static images, short-form video (reels), and carousel ads. We A/B test creatives continuously and only scale winning formats." },
        { question: "What's the minimum OOH advertising budget?", answer: "For a single billboard in a Tier-1 city (prime location), expect ₹1.5–4L per month. We recommend a minimum 3-month campaign for brand recall. We can help with a ₹5–10L activation budget across multiple formats." },
        { question: "How long does it take to set up retail distribution?", answer: "Initial distributor conversations begin in Week 1. First purchase orders typically come in by Week 4–6. We manage the relationship, credit terms negotiation, and supply chain coordination throughout." },
        { question: "Do you work with early-stage startups with limited budgets?", answer: "Yes. We have a lean-start option for D2C brands at ₹25,000/month for digital-only (SEO + 1 paid channel). We grow the scope as your revenue scales. Our model is outcome-aligned. We grow when you grow." },
      ],
      pricing: [
        { name: "Digital Lean Start", price: "Contact Us", period: "", desc: "For early-stage D2C and SaaS. SEO foundation + one paid channel (Google or Meta). Ideal for first 90 days of growth.", features: ["SEO & content setup", "1 paid ad channel", "Monthly performance report", "Creative production"], highlight: false, cta: "Get a Quote" },
        { name: "Growth Retainer", price: "Contact Us", period: "", desc: "Multi-channel performance marketing. SEO + Google + Meta + content. For startups with ₹10L+ MRR.", features: ["Everything in Lean", "Google + Meta Ads", "OOH strategy", "Bi-weekly strategy calls", "AI Creative Studio"], highlight: true, badge: "Most Popular", cta: "Get a Quote" },
        { name: "Retail + Digital", price: "Custom", desc: "Full-funnel: digital performance + OOH + retail distribution. For consumer brands going offline.", features: ["Everything in Growth", "OOH placements", "Retail distribution", "Distributor management", "Sales team support"], highlight: false, cta: "Book a Call" },
      ],
      bottomCta: {
        title: "Ready to engineer your growth?",
        subtitle: "Book a free growth audit. We'll map out your acquisition channels and give you a 90-day action plan.",
        buttonLabel: "Get My Growth Audit",
      },
      serviceCategories: [
        {
          category: "Digital & Performance",
          iconName: "Monitor",
          items: [
            { title: "SEO & Content Marketing", desc: "Dominate organic search for your category. We build topical authority through long-form content, technical SEO, and link building that compounds traffic over time.", metrics: ["3–6 month to page 1", "Evergreen traffic asset"] },
            { title: "Google Ads (Search & Display)", desc: "High-intent leads at the exact moment of need. We manage campaigns with surgical precision: Quality Score optimisation, negative keyword management, and bid strategies.", metrics: ["Target ROAS: 3–5x", "Cost per lead optimisation"] },
            { title: "Meta Ads (Facebook & Instagram)", desc: "Full-funnel social campaigns from cold audience prospecting to warm retargeting. Creative strategy, A/B testing, and dynamic product ads for e-commerce brands.", metrics: ["Creative-led strategy", "Full-funnel attribution"] },
          ],
        },
        {
          category: "Offline OOH & BTL",
          iconName: "MapPin",
          items: [
            { title: "Billboard & Outdoor Advertising", desc: "Prime billboard locations in Tier-1 and Tier-2 cities. We have direct partnerships with Times OOH, Laqshya Media, and Metro Ads for competitive rates.", metrics: ["Pan-India network", "Geo-targeted placement"] },
            { title: "Mall Kiosks & Pop-Up Activations", desc: "High-footfall retail experiences at Phoenix Malls, Select Citywalk, and Inorbit. From kiosk design to staffing and sales training.", metrics: ["10+ premium malls", "D2C brand launches"] },
            { title: "BTL & Sampling Campaigns", desc: "Product sampling, roadshows, and brand activation events that put your product directly in consumers' hands for direct feedback and conversion.", metrics: ["Measurable footfall", "CRM data capture"] },
          ],
        },
        {
          category: "Retail Distribution",
          iconName: "Store",
          items: [
            { title: "Super-Stockist Network", desc: "Connect directly with our vetted network of regional distributors and super-stockists across 15+ states. From general trade to modern trade.", metrics: ["15+ states covered", "Vetted distributor network"] },
            { title: "Modern Trade & E-Commerce Marketplaces", desc: "End-to-end listing management on Amazon, Flipkart, Blinkit, Zepto, and Swiggy Instamart. Plus modern trade tie-ups with Big Bazaar and DMart.", metrics: ["Top marketplace coverage", "Listing optimisation"] },
          ],
        },
      ],
      results: [
        { metric: "₹40L MRR", context: "in 90 days", detail: "D2C nutrition brand via Meta Ads + retail distribution" },
        { metric: "3 states", context: "in 45 days", detail: "FMCG launch via super-stockist network expansion" },
      ],
      aiStudio: [
        { n: "01", title: "Social Content", sub: "LinkedIn, Instagram, YouTube Shorts", tool: "Predis.ai", note: "India-optimised. Generates image, video, caption, and hashtags from one prompt." },
        { n: "02", title: "Paid Ad Creatives", sub: "Meta, Google, LinkedIn", tool: "AdCreative.ai", note: "Pre-scores every creative for predicted click-through rate before you spend a rupee." },
        { n: "03", title: "Bulk Branded Content", sub: "Certificates, campaign variants, localised posts", tool: "Robolly via n8n", note: "Template-based bulk image and PDF generation. Native n8n integration for scale." },
        { n: "04", title: "Dynamic PDFs & Images", sub: "Personalised reports, invoices, proposals", tool: "RenderForm", note: "Pixel-perfect dynamic image and PDF API. Output in under 2 seconds." },
      ],
    },
    webDevelopment: {
      meta: {
        title: "Web & Tech Development",
        description: "Shopify stores, custom web apps, SaaS platforms, and UI/UX design. Scalable digital storefronts built for high conversion.",
      },
      hero: {
        label: "Web & Tech Development",
        title: "Scalable Digital Storefronts",
        titleHighlight: "Built to Convert.",
        subtitle: "From Shopify builds to custom SaaS platforms, we engineer every digital experience with one obsession: conversion. Beautiful design meets technical rigour.",
        ctaText: "Start a Project",
        stats: [
          { value: "20+", label: "Projects delivered" },
          { value: "4 Days", label: "Typical website delivery" },
          { value: "100%", label: "Source code ownership" },
        ],
      },
      faq: [
        { question: "What technologies do you use?", answer: "Our frontend stack: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python (FastAPI), PostgreSQL, Redis. Cloud: AWS and Vercel for deployment. For e-commerce, we specialise in Shopify (plus custom themes) and WooCommerce." },
        { question: "How long does a typical e-commerce build take?", answer: "A standard website build takes 4 working days. For custom e-commerce platforms with advanced features, timelines are scoped during discovery and typically range from 2 to 8 weeks depending on complexity." },
        { question: "Do you provide ongoing maintenance and support?", answer: "Yes. We offer monthly retainer packages for ongoing development, bug fixes, performance monitoring, and feature additions. Contact us for a quote based on your maintenance needs." },
        { question: "Can you redesign our existing website?", answer: "Yes, and this is where we often see the biggest wins. We start with a conversion audit of your existing site, identify the biggest drop-off points, and redesign with a clear CRO strategy. Typical result: 30–60% improvement in lead generation." },
        { question: "Who owns the code after the project is complete?", answer: "You own 100% of the code, design assets, and intellectual property. We provide full source code handoff via GitHub. No lock-in, no licensing fees. You can take the code anywhere." },
      ],
      pricing: [
        { name: "Shopify Build", price: "₹10,999", period: "one-time", features: [], desc: "Custom Shopify theme, product pages, checkout, and payment gateway. Delivered in 4 working days.", highlight: false, cta: "Start Shopify Project" },
        { name: "Custom Web App", price: "Contact Us", period: "", features: [], desc: "Bespoke SaaS or platform. Full-stack, cloud-deployed, handed off via GitHub. 2-8 week sprints.", highlight: true, badge: "Most Common", cta: "Scope My App" },
        { name: "Monthly Retainer", price: "Contact Us", period: "", features: [], desc: "Ongoing development, bug fixes, performance monitoring, and feature additions.", highlight: false, cta: "Get a Quote" },
      ],
      bottomCta: {
        title: "Let's build something exceptional.",
        subtitle: "Share your brief and we'll come back with a scoped proposal within 48 hours.",
        buttonLabel: "Start a Project",
      },
      serviceCards: [
        { iconName: "MapPin", number: "01", title: "Out-of-Home & Print Advertising", desc: "High-impact offline campaigns that put your brand in front of the right people in the real world. Billboards, transit, print, and on-ground placements that build trust at scale.", features: ["Billboard & hoarding placements", "Transit & metro advertising", "Newspaper & magazine print ads", "Flyers, brochures & collateral", "Point-of-sale & retail branding", "Location-based campaign planning"] },
        { iconName: "Newspaper", number: "02", title: "Public Relations & Media Outreach", desc: "Earned media that builds credibility money can't buy. We craft your story and place it with the journalists and publications that matter to your audience.", features: ["Press release writing & distribution", "Journalist & media relationships", "Founder & brand storytelling", "Feature & interview placements", "Crisis & reputation management", "Media monitoring & coverage reports"] },
        { iconName: "Megaphone", number: "03", title: "Events, Activations & Brand Experiences", desc: "Memorable on-ground moments that turn audiences into advocates. From product launches to experiential activations, we make your brand impossible to ignore.", features: ["Product launch events", "Experiential brand activations", "Trade shows & exhibition stalls", "Sponsorships & partnerships", "Influencer & community meetups", "End-to-end event management"] },
      ],
      techStack: ["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Shopify", "Tailwind CSS", "AWS", "Vercel", "Figma", "Flutter", "React Native", "GraphQL", "Stripe"],
    },
    funding: {
      meta: {
        title: "Investor Funding & Pitch Deck Services",
        description: "Pitch deck creation, financial projections, and investor matchmaking. Connect with India's leading angels, VCs, and accelerators.",
      },
      hero: {
        label: "Investor Funding & Pitch Decks",
        title: "Turn Metrics Into",
        titleHighlight: "a Compelling Narrative.",
        subtitle: "We transform your raw data into the exact story institutional investors want to hear. Pitch deck creation, financial modelling, and warm introductions to 775+ vetted investors: VCs, Angels, Banks, Family Offices, and Grants.",
        ctaText: "Build My Deck",
        stats: [
          { value: "58+", label: "Startups served" },
          { value: "775+", label: "Vetted investor contacts" },
          { value: "73%", label: "Decks that secured term sheets" },
        ],
      },
      faq: [
        { question: "What does the pitch deck creation process look like?", answer: "Week 1: Discovery call + competitive analysis + narrative structure workshop. Week 2: First draft (8 slides). Week 3: Revisions + financial model integration. Week 4: Final deck + investor Q&A prep session. We also provide a 30-minute mock pitch before your first investor meeting." },
        { question: "What is the 12-slide master deck structure?", answer: "Our proven structure: 1) Cover + Hook, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Go-to-Market, 8) Traction, 9) Team, 10) Financials, 11) Competition, 12) The Ask. Each slide has a single, clear message." },
        { question: "How do you source investors for matchmaking?", answer: "We maintain a live network of 775+ vetted investor contacts across VCs, Angels, Banks, Family Offices, and Grants active in India. We only make warm introductions based on sector fit, cheque size, and stage alignment." },
        { question: "What does the n8n automation process mean for investor outreach?", answer: "We use n8n (a workflow automation tool) to systematise investor pipeline management. This includes automated follow-up sequences, CRM tracking, meeting scheduling, and data room access management. No warm lead falls through the cracks." },
        { question: "Do you take equity for your fundraising services?", answer: "No equity for pitch deck creation or financial modelling. For investor matchmaking and warm introductions, we charge a fixed project fee upfront. We do not take success fees or equity percentages. This keeps our incentives clean and conflict-free." },
      ],
      pricing: [
        { name: "Pitch Deck Creation", price: "₹9,999+", features: [], desc: "12-slide investor deck. Narrative, design, Q&A prep, and 3 revision rounds.", highlight: false, cta: "Book Pitch Deck" },
        { name: "Financial Projections", price: "₹14,999+", features: [], desc: "5-year Excel model with 3 scenarios, cohort analysis, and fundraise utilisation plan.", highlight: true, badge: "Most Popular", cta: "Book Projections" },
        { name: "Full Fundraising Package", price: "Custom", features: [], desc: "Deck + projections + investor matchmaking + warm introductions. Custom scope.", highlight: false, cta: "Book a Call" },
      ],
      bottomCta: {
        title: "Your funding round starts with one deck.",
        subtitle: "Let's build the narrative that gets you in the room and gets the room to say yes.",
        buttonLabel: "Build My Pitch Deck",
      },
      coreServices: [
        { iconName: "FileText", title: "Pitch Deck Creation", desc: "The 12-slide master deck designed to make investors lean forward. We combine data storytelling with visual design excellence.", deliverables: ["12-slide investor deck", "Narrative storyboarding", "Visual design (Figma/PowerPoint)", "Investor Q&A script", "Mock pitch session", "3 revision rounds"] },
        { iconName: "BarChart3", title: "Financial Projections", desc: "5-year Excel models that withstand investor scrutiny. Built bottom-up with clear assumptions, scenario analysis, and key driver sensitivity.", deliverables: ["5-year P&L projection", "Revenue & cost model", "3 scenarios (bear/base/bull)", "Cohort analysis", "Fundraise utilisation plan", "Cap table modelling"] },
        { iconName: "Users", title: "Investor Matchmaking", desc: "Warm introductions to the right investors at the right stage. No cold emails. We only connect you with investors who've pre-indicated interest.", deliverables: ["Investor database scan", "Stage & sector matching", "Warm email introductions", "Meeting preparation brief", "Pipeline CRM setup (n8n)", "Post-meeting follow-up"] },
      ],
      beyondAlgorithm: [
        { iconName: "Search", title: "Portfolio Conflict Checks", desc: "We analyse the fund's active portfolio to ensure they have not quietly invested in your direct competitor in the past 6 months." },
        { iconName: "Zap", title: "Dry Powder & Deployment Velocity", desc: "We track exactly where a fund is in its lifecycle: actively deploying or just taking coffee chats with no capital to deploy." },
        { iconName: "Users", title: "Partner-Level Profiling", desc: "Funds do not write cheques. Partners do. We identify exactly which General Partner holds the mandate for your specific sector and stage." },
        { iconName: "Target", title: "Follow-On Capacity & Strategic Fit", desc: "We analyse past deals to assess the investor's track record of participating in subsequent rounds (Series A/B)." },
      ],
    },
  },
};
