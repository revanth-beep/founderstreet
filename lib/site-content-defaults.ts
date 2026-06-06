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

export type ContactPageCms = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  details: ContactDetailCms[];
  socialLinks: { linkedin: string; twitter: string; instagram: string };
  responseBadge: { title: string; subtitle: string };
  faqQuestions: string[];
};

// ─── Main SiteContent type ─────────────────────────────────────────────────

export type SiteContent = {
  nav: {
    brandName: string;
    subsidiaryText: string;
    healthPromoTitle: string;
    healthPromoSubtitle: string;
    healthCtaShort: string;
    phone: string;
    whatsappUrl: string;
    logoUrl: string;
    /** Logo shown on transparent navbar (dark hero background). Falls back to logoUrl with white filter if not set. */
    logoUrlWhite: string;
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
  contactPage: ContactPageCms;
  servicePages: {
    validation: ServicePageCms;
    incorporation: ServicePageCms;
    accounting: ServicePageCms;
    marketing: ServicePageCms;
    webDevelopment: ServicePageCms;
    funding: ServicePageCms;
  };
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
    logoUrl: "/logos/logo-icon-color.png",
    logoUrlWhite: "/logos/logo-icon-mono.png",
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
    logoUrl: "/logos/logo-icon-color.png",
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
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
      { label: "Hours", value: "Monday–Saturday, 10 AM – 7 PM IST", href: "" },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    responseBadge: {
      title: "We respond within 24 hours",
      subtitle: "Every inquiry is reviewed by a senior team member. No automated responses, no gatekeeping.",
    },
    faqQuestions: [
      "How much does incorporation cost?",
      "How quickly can you build my pitch deck?",
      "Do you work with international founders?",
      "What's included in the free health check?",
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
          { value: "< 10 Days", label: "Avg. incorporation time" },
          { value: "500+", label: "Companies incorporated" },
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
    },
    accounting: {
      meta: {
        title: "Accounting & Taxation: Virtual CFO",
        description: "Institutional-grade financial plumbing. Virtual CFO services, bookkeeping, payroll, GST compliance, and strategic runway management.",
      },
      hero: {
        label: "Accounting & Virtual CFO",
        title: "Financial Plumbing",
        titleHighlight: "That Impresses Investors.",
        subtitle: "Institutional-grade accounting, GST compliance, and virtual CFO services so you can focus 100% on product and growth, not spreadsheets.",
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
        { question: "What is the pricing structure?", answer: "We offer three packages: Seed (bookkeeping + GST, from ₹8,000/month), Growth (adds payroll + TDS + investor reporting, from ₹18,000/month), and Scale (full Virtual CFO with fundraising support, from ₹35,000/month). Custom pricing for companies with more complex needs." },
      ],
      pricing: [
        { name: "Seed", price: "₹8,000", period: "/month", desc: "For pre-revenue startups", features: ["Monthly bookkeeping", "GST return filing", "Bank reconciliation", "Annual ITR filing", "Email support"], highlight: false, cta: "Get Started" },
        { name: "Growth", price: "₹18,000", period: "/month", desc: "For revenue-generating startups", features: ["Everything in Seed", "Payroll processing", "TDS deduction & filing", "Investor MIS reports", "Priority support", "Quarterly strategy call"], highlight: true, badge: "Most Popular", cta: "Get Started" },
        { name: "Scale", price: "₹35,000", period: "/month", desc: "For pre-Series A startups", features: ["Everything in Growth", "Virtual CFO services", "Fundraising model", "Board reporting", "Due diligence prep", "Dedicated CFO partner"], highlight: false, cta: "Get Started" },
      ],
      bottomCta: {
        title: "Get investor-grade financials from Day One",
        subtitle: "Stop managing spreadsheets. Get a dedicated finance team for less than the cost of a part-time accountant.",
        buttonLabel: "Start Financial Setup",
      },
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
          { value: "4.2x", label: "Average blended ROAS" },
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
        { name: "Digital Lean Start", price: "₹25,000", period: "/mo", desc: "For early-stage D2C and SaaS. SEO foundation + one paid channel (Google or Meta). Ideal for first 90 days of growth.", features: ["SEO & content setup", "1 paid ad channel", "Monthly performance report", "Creative production"], highlight: false, cta: "Start Lean" },
        { name: "Growth Retainer", price: "₹60,000", period: "/mo", desc: "Multi-channel performance marketing. SEO + Google + Meta + content. For startups with ₹10L+ MRR.", features: ["Everything in Lean", "Google + Meta Ads", "OOH strategy", "Bi-weekly strategy calls", "AI Creative Studio"], highlight: true, badge: "Most Popular", cta: "Start Growth" },
        { name: "Retail + Digital", price: "Custom", desc: "Full-funnel: digital performance + OOH + retail distribution. For consumer brands going offline.", features: ["Everything in Growth", "OOH placements", "Retail distribution", "Distributor management", "Sales team support"], highlight: false, cta: "Book a Call" },
      ],
      bottomCta: {
        title: "Ready to engineer your growth?",
        subtitle: "Book a free growth audit. We'll map out your acquisition channels and give you a 90-day action plan.",
        buttonLabel: "Get My Growth Audit",
      },
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
          { value: "35%", label: "Avg. checkout conversion increase" },
          { value: "< 2s", label: "Target page load time" },
          { value: "60+", label: "Products shipped" },
        ],
      },
      faq: [
        { question: "What technologies do you use?", answer: "Our frontend stack: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python (FastAPI), PostgreSQL, Redis. Cloud: AWS and Vercel for deployment. For e-commerce, we specialise in Shopify (plus custom themes) and WooCommerce." },
        { question: "How long does a typical e-commerce build take?", answer: "A standard Shopify build (custom theme, up to 5 collection pages, checkout customisation) takes 2–3 weeks. A fully custom e-commerce platform with advanced features takes 6–10 weeks. We work in 2-week sprints with demos at every stage." },
        { question: "Do you provide ongoing maintenance and support?", answer: "Yes. We offer monthly retainer packages for ongoing development, bug fixes, performance monitoring, and feature additions. Retainers start at ₹20,000/month for basic maintenance up to ₹80,000/month for dedicated development capacity." },
        { question: "Can you redesign our existing website?", answer: "Yes, and this is where we often see the biggest wins. We start with a conversion audit of your existing site, identify the biggest drop-off points, and redesign with a clear CRO strategy. Typical result: 30–60% improvement in lead generation." },
        { question: "Who owns the code after the project is complete?", answer: "You own 100% of the code, design assets, and intellectual property. We provide full source code handoff via GitHub. No lock-in, no licensing fees. You can take the code anywhere." },
      ],
      pricing: [
        { name: "Shopify Build", price: "₹24,999", period: "one-time", features: [], desc: "Custom Shopify theme, product pages, checkout, and payment gateway. Delivered in 2–3 weeks.", highlight: false, cta: "Start Shopify Project" },
        { name: "Custom Web App", price: "₹74,999+", period: "one-time", features: [], desc: "Bespoke SaaS or platform. Full-stack, cloud-deployed, handed off via GitHub. 6–10 week sprints.", highlight: true, badge: "Most Common", cta: "Scope My App" },
        { name: "Monthly Retainer", price: "₹20,000", period: "/month", features: [], desc: "Ongoing development, bug fixes, performance monitoring, and feature additions.", highlight: false, cta: "Start Retainer" },
      ],
      bottomCta: {
        title: "Let's build something exceptional.",
        subtitle: "Share your brief and we'll come back with a scoped proposal within 48 hours.",
        buttonLabel: "Start a Project",
      },
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
        subtitle: "We transform your raw data into the exact story institutional investors want to hear. Pitch deck creation, financial modelling, and warm introductions to our vetted network.",
        ctaText: "Build My Deck",
        stats: [
          { value: "₹40Cr+", label: "Funding facilitated" },
          { value: "200+", label: "Investor introductions" },
          { value: "73%", label: "Decks that secured term sheets" },
        ],
      },
      faq: [
        { question: "What does the pitch deck creation process look like?", answer: "Week 1: Discovery call + competitive analysis + narrative structure workshop. Week 2: First draft (8 slides). Week 3: Revisions + financial model integration. Week 4: Final deck + investor Q&A prep session. We also provide a 30-minute mock pitch before your first investor meeting." },
        { question: "What is the 12-slide master deck structure?", answer: "Our proven structure: 1) Cover + Hook, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Go-to-Market, 8) Traction, 9) Team, 10) Financials, 11) Competition, 12) The Ask. Each slide has a single, clear message." },
        { question: "How do you source investors for matchmaking?", answer: "We maintain a live network of 25+ vetted investor connects active in India. We only make warm introductions. Cold email blasting destroys reputation. Matching is based on sector fit, cheque size, and stage alignment." },
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
    },
  },
};
