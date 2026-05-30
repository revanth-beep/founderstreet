/**
 * Default marketing copy — merged with DB overrides in getSiteContent().
 * Edit here for code defaults; override any field in Admin → Site content (JSON).
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

export type SiteContent = {
  nav: {
    brandName: string;
    subsidiaryText: string;
    healthPromoTitle: string;
    healthPromoSubtitle: string;
    healthCtaShort: string;
    phone: string;
    whatsappUrl: string;
  };
  footer: {
    brandName: string;
    subsidiaryText: string;
    description: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    /** Full copyright line (include © and year is added in UI if you use {year} token) */
    copyrightTemplate: string;
  };
  home: {
    hero: HeroCms;
    services: ServicesHeaderCms;
    serviceCards: ServiceCardCms[];
    resourcesTeaser: ResourcesTeaserCms;
    partnerMarquee: PartnerMarqueeCms;
    founderStories: FounderStoriesCms;
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
  /** Escape hatch: arbitrary JSON merged on top (advanced). */
  custom?: Record<string, unknown>;
};

export const defaultSiteContent: SiteContent = {
  nav: {
    brandName: "Founderstreet",
    subsidiaryText: "by Northville Consulting Group",
    healthPromoTitle: "Test Your Idea, Free",
    healthPromoSubtitle: "5 questions. Get a free SWOT report instantly.",
    healthCtaShort: "Test Your Idea",
    phone: "+91 98765 43210",
    whatsappUrl: "https://wa.me/919876543210",
  },
  footer: {
    brandName: "Founderstreet",
    subsidiaryText: "by Northville Consulting Group",
    description:
      "The unseen engine behind India's next great startups. From Day Zero to Pre-Seed.",
    newsletterTitle: "Get the Founder's Edge.",
    newsletterSubtitle:
      "Weekly breakdown on unit economics, pitch tear-downs, and growth tactics.",
    copyrightTemplate: "© {year} Founderstreet · Northville Consulting Group. All rights reserved.",
  },
  home: {
    hero: {
      eyebrow: "India's Startup Infrastructure Platform",
      titleBefore: "The Unseen Engine\nBehind India's",
      titleAccent: "Next Great",
      titleAfter: "Startups.",
      subtitle:
        "From Day Zero to Pre-Seed, we provide the elite operational, financial, and digital infrastructure founders need to launch, scale, and secure funding.",
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
        desc: "12-slide pitch decks, 5-year financial models, and warm introductions to 200+ vetted angels and VCs.",
        href: "/services/funding",
        price: "Starting at ₹9,999",
      },
    ],
    resourcesTeaser: {
      eyebrow: "The Founder's Brief",
      titleBefore: "Thinking Built for",
      titleGradient: "Builders",
      viewAllLabel: "All articles",
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
};
