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
    healthPromoTitle: string;
    healthPromoSubtitle: string;
    healthCtaShort: string;
  };
  footer: {
    brandName: string;
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
  /** Escape hatch: arbitrary JSON merged on top (advanced). */
  custom?: Record<string, unknown>;
};

export const defaultSiteContent: SiteContent = {
  nav: {
    brandName: "Founderstreet",
    healthPromoTitle: "Free Startup Health Check",
    healthPromoSubtitle: "5 questions. Get a free SWOT report instantly.",
    healthCtaShort: "Free Health Check",
  },
  footer: {
    brandName: "Founderstreet",
    description:
      "The unseen engine behind India's next great startups. From Day Zero to Pre-Seed.",
    newsletterTitle: "Get the Founder's Edge.",
    newsletterSubtitle:
      "Weekly breakdown on unit economics, pitch tear-downs, and growth tactics.",
    copyrightTemplate: "© {year} Founderstreet Consulting Pvt. Ltd. All rights reserved.",
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
      ctaSecondaryLabel: "Free Startup Health Check",
      ctaSecondaryHref: "/startup-health-check",
      statsLabel: "Trusted by founders across India",
      stats: [
        { value: "150+", label: "Startups Launched" },
        { value: "₹40Cr+", label: "Funding Facilitated" },
        { value: "98%", label: "Compliance Rate" },
        { value: "< 10 Days", label: "Avg. Incorporation" },
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
      },
      {
        n: "02",
        tag: "Legal & Compliance",
        name: "Incorporation",
        desc: "End-to-end company registration in under 10 days. DIN, DSC, MOA, AOA, trademark — completely handled.",
        href: "/services/incorporation",
      },
      {
        n: "03",
        tag: "Finance",
        name: "Virtual CFO",
        desc: "Institutional-grade bookkeeping, GST compliance, payroll, and strategic financial forecasting.",
        href: "/services/accounting",
      },
      {
        n: "04",
        tag: "Growth",
        name: "Marketing & Retail",
        desc: "Full-funnel performance marketing. SEO, Google Ads, Meta Ads, OOH billboards, and retail distribution.",
        href: "/services/marketing",
      },
      {
        n: "05",
        tag: "Technology",
        name: "Web & App Dev",
        desc: "Shopify stores, custom SaaS platforms, and mobile apps engineered for conversion and scale.",
        href: "/services/web-development",
      },
      {
        n: "06",
        tag: "Fundraising",
        name: "Investor Funding",
        desc: "12-slide pitch decks, 5-year financial models, and warm introductions to 200+ vetted angels and VCs.",
        href: "/services/funding",
      },
    ],
    resourcesTeaser: {
      eyebrow: "The Founder's Brief",
      titleBefore: "Thinking Built for",
      titleGradient: "Builders",
      viewAllLabel: "All articles",
    },
    partnerMarquee: {
      headline: "Our Partner Network — Billboards · Distribution · Digital · Retail",
      partners: [
        { name: "Times OOH", cat: "Billboard" },
        { name: "StartupIndia", cat: "Ecosystem" },
        { name: "AWS Activate", cat: "Cloud" },
        { name: "PhoenixMalls", cat: "Retail" },
        { name: "Razorpay", cat: "Payments" },
        { name: "Meta Business", cat: "Social Ads" },
        { name: "Google Ads", cat: "Performance" },
        { name: "NASSCOM", cat: "Tech Body" },
        { name: "IndiaMart", cat: "B2B Platform" },
        { name: "Metro Ads", cat: "Transit OOH" },
        { name: "BigTrade", cat: "Distribution" },
        { name: "Laqshya Media", cat: "OOH" },
      ],
    },
    founderStories: {
      eyebrow: "Founder Stories",
      title: "Results That Speak for Themselves",
      stories: [
        {
          name: "Rohan Mehta",
          role: "Founder, AgriConnect",
          sector: "B2B AgriTech",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          quote:
            "Founderstreet handled everything from our Pvt Ltd incorporation to building our MVP in just 6 weeks. We closed our pre-seed round of ₹1.2Cr within 4 months of launch.",
          result: "₹1.2Cr Pre-Seed",
          rating: 5,
        },
        {
          name: "Priya Sharma",
          role: "Co-founder, NourishKart",
          sector: "D2C Nutrition",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=100&h=100&fit=crop&crop=face",
          quote:
            "The Virtual CFO service was a game-changer. Our burn rate clarity and unit economics model convinced investors we had a tight grip on our business.",
          result: "₹75L Angel Round",
          rating: 5,
        },
        {
          name: "Arjun Kapoor",
          role: "Founder, ZippyLogistics",
          sector: "Last-Mile Delivery",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
          quote:
            "Our Shopify store went from 0 to ₹40L monthly GMV in 3 months. The marketing team's ROAS on Meta Ads alone was 4.2x. Worth every paisa.",
          result: "₹40L MRR in 90 days",
          rating: 5,
        },
        {
          name: "Kavya Reddy",
          role: "Founder, LearnIQ",
          sector: "EdTech SaaS",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          quote:
            "The pitch deck they built was the sharpest 12 slides I've ever seen. Every VC we presented to mentioned it. We ended up oversubscribed.",
          result: "₹3Cr Seed (Oversubscribed)",
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
        "Founderstreet was born from frustration. Three ex-founders who had each wasted critical early months on company registration, CAC spreadsheets, and pitch deck revisions — instead of building product and acquiring customers.",
    },
    story: {
      label: "Our Story",
      titleLine1: "Built by Founders,",
      titleGradient: "for Founders",
      paragraphs: [
        "In 2021, our founding team was building three separate startups across different sectors. Each of us hit the same wall: the operational overhead of building a company in India was eating into our time to build the actual product.",
        "Incorporation took 6 weeks instead of 10 days. The CA we hired didn't understand startup equity or ESOP accounting. Our pitch deck looked like a school project. And we had no idea who the right investors were for our stage.",
        "So we built Founderstreet — the infrastructure layer we wished existed. Today, we've helped 150+ startups across India launch, scale, and raise over ₹40Cr in funding.",
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
            "Every deliverable has a measurable objective. We don't track hours — we track milestones. Our incentives are permanently aligned with yours.",
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
          image: "/team/asmeet-bhatia.jpg",
        },
        {
          name: "Achal Bhatt",
          role: "Director - Marketing",
          background: "CPA, MSc. in Accounting (UIUC), NYFA",
          image: "/team/achal-bhatt.jpg",
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
};
