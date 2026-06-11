export type Role = "government" | "investor" | "ngo" | "city";

export const roles: { id: Role; label: string; subtitle: string }[] = [
  { id: "government", label: "Government", subtitle: "Sovereign capacity & stability" },
  { id: "investor", label: "Investor", subtitle: "Allocation & systemic exposure" },
  { id: "ngo", label: "NGO", subtitle: "Vulnerable population outcomes" },
  { id: "city", label: "City", subtitle: "Urban resilience & services" },
];

export type Driver = {
  id: string;
  label: string;
  value: number;
  status: "CRITICAL" | "VOLATILE" | "STABLE" | "WATCH";
  evidence: Evidence;
};

export type Evidence = {
  source: string;
  updated: string;
  confidence: number;
  assumptions: string[];
  citations: { label: string; org: string }[];
};

export const drivers: Driver[] = [
  {
    id: "water",
    label: "Water Stress",
    value: 82,
    status: "CRITICAL",
    evidence: {
      source: "WRI Aqueduct · MODIS satellite",
      updated: "14:02 UTC · 11.06.2026",
      confidence: 0.91,
      assumptions: [
        "Aquifer recharge models calibrated to 2020-2024 rainfall.",
        "Rift Valley extraction reported within 8% margin.",
      ],
      citations: [
        { label: "Aqueduct 4.0 baseline", org: "World Resources Institute" },
        { label: "MODIS NDVI Q2 2026", org: "NASA EOSDIS" },
      ],
    },
  },
  {
    id: "urban",
    label: "Urban Growth",
    value: 64,
    status: "VOLATILE",
    evidence: {
      source: "UN-Habitat · Sentinel-2 nightlights",
      updated: "09:11 UTC · 11.06.2026",
      confidence: 0.78,
      assumptions: ["Informal settlements counted via radiance threshold."],
      citations: [{ label: "World Urbanization Prospects", org: "UN DESA" }],
    },
  },
  {
    id: "infra",
    label: "Infra Lag",
    value: 41,
    status: "STABLE",
    evidence: {
      source: "Global Infrastructure Hub",
      updated: "06:48 UTC · 11.06.2026",
      confidence: 0.82,
      assumptions: ["Capex/GDP ratio assumed constant through 2027."],
      citations: [{ label: "GIH Outlook 2025", org: "G20 GIH" }],
    },
  },
  {
    id: "trust",
    label: "Trust Decay",
    value: 56,
    status: "WATCH",
    evidence: {
      source: "Edelman · Afrobarometer",
      updated: "Yesterday",
      confidence: 0.71,
      assumptions: ["Survey N=2,400 across 12 counties."],
      citations: [{ label: "Trust Barometer 2026", org: "Edelman" }],
    },
  },
];

export type CascadeNode = {
  id: string;
  title: string;
  layer: number;
  threshold: number;
  triggersAt: number;
  note: string;
  evidence: Evidence;
};

export const cascadeNodes: CascadeNode[] = [
  {
    id: "drought",
    title: "Drought Severity",
    layer: 0,
    threshold: 50,
    triggersAt: 35,
    note: "Sustained rainfall deficit across Rift Valley.",
    evidence: drivers[0].evidence,
  },
  {
    id: "yield",
    title: "Agricultural Yield Collapse",
    layer: 1,
    threshold: 60,
    triggersAt: 45,
    note: "Maize and tea yields drop below subsistence threshold.",
    evidence: drivers[0].evidence,
  },
  {
    id: "inflation",
    title: "Food Inflation",
    layer: 2,
    threshold: 55,
    triggersAt: 50,
    note: "Staple basket index rises beyond CPI smoothing range.",
    evidence: drivers[3].evidence,
  },
  {
    id: "migration",
    title: "Internal Migration",
    layer: 2,
    threshold: 65,
    triggersAt: 55,
    note: "Mass relocation to Nairobi exurbs strains informal infra.",
    evidence: drivers[1].evidence,
  },
  {
    id: "fiscal",
    title: "Fiscal Pressure",
    layer: 3,
    threshold: 70,
    triggersAt: 60,
    note: "Subsidy outflows accelerate sovereign debt revisions.",
    evidence: drivers[2].evidence,
  },
  {
    id: "unrest",
    title: "Civil Unrest",
    layer: 4,
    threshold: 75,
    triggersAt: 65,
    note: "Trust collapse triggers coordinated protest activity.",
    evidence: drivers[3].evidence,
  },
];

export const cascadeEdges: [string, string][] = [
  ["drought", "yield"],
  ["yield", "inflation"],
  ["yield", "migration"],
  ["inflation", "fiscal"],
  ["migration", "fiscal"],
  ["fiscal", "unrest"],
  ["inflation", "unrest"],
];

export type Intervention = {
  id: string;
  title: string;
  kind: "capital" | "policy" | "infrastructure";
  fragilityDelta: number;
  cost: string;
  horizon: string;
  secondOrder: { label: string; delta: number; tone: "good" | "bad" }[];
  description: string;
};

export const interventions: Intervention[] = [
  {
    id: "desal",
    title: "Desalination Network · Phase I",
    kind: "infrastructure",
    fragilityDelta: -12.4,
    cost: "$2.1B · 36mo",
    horizon: "5y",
    description: "Modular coastal desalination feeding agricultural corridor pipelines.",
    secondOrder: [
      { label: "Coastal energy demand", delta: 8, tone: "bad" },
      { label: "Yield stability", delta: 14, tone: "good" },
      { label: "Marine salinity stress", delta: 4, tone: "bad" },
    ],
  },
  {
    id: "zoning",
    title: "Dense Zoning Policy",
    kind: "policy",
    fragilityDelta: -8.1,
    cost: "$40M · 12mo",
    horizon: "10y",
    description: "Floor-area incentives unlocking transit-oriented housing in Nairobi exurbs.",
    secondOrder: [
      { label: "Informal settlement growth", delta: -11, tone: "good" },
      { label: "Property tax base", delta: 7, tone: "good" },
      { label: "Short-term displacement", delta: 5, tone: "bad" },
    ],
  },
  {
    id: "currency",
    title: "Mobile Currency Buffer",
    kind: "capital",
    fragilityDelta: -6.7,
    cost: "$680M · 6mo",
    horizon: "3y",
    description: "Sovereign-backed M-PESA float guaranteeing shock-period liquidity.",
    secondOrder: [
      { label: "Trust index", delta: 9, tone: "good" },
      { label: "FX reserves", delta: -3, tone: "bad" },
    ],
  },
  {
    id: "grants",
    title: "Modular Infra Grants",
    kind: "infrastructure",
    fragilityDelta: -4.2,
    cost: "$320M · 24mo",
    horizon: "5y",
    description: "Block grants to county governments for prefab clinics and substations.",
    secondOrder: [
      { label: "Service availability", delta: 6, tone: "good" },
      { label: "Procurement leakage", delta: 4, tone: "bad" },
    ],
  },
  {
    id: "debt",
    title: "Sovereign Debt Restructure",
    kind: "capital",
    fragilityDelta: -9.3,
    cost: "Negotiated",
    horizon: "10y",
    description: "Paris Club extension of debt maturities with climate-linked clauses.",
    secondOrder: [
      { label: "Fiscal pressure", delta: -12, tone: "good" },
      { label: "Credit spread", delta: 6, tone: "bad" },
    ],
  },
];

export type Agent = {
  id: string;
  name: string;
  school: string;
  color: string;
};

export const agents: Agent[] = [
  { id: "orion", name: "Agent Orion", school: "Structural Macro", color: "var(--brass)" },
  { id: "lyra", name: "Agent Lyra", school: "Social Resilience", color: "var(--jade)" },
  { id: "vega", name: "Agent Vega", school: "Capital Flows", color: "#60a5fa" },
];

export type DebateTurn = {
  agentId: string;
  claim: string;
  warrant: string;
  confidence: number;
  evidence: Evidence;
};

export const debates: { id: string; title: string; question: string; turns: DebateTurn[] }[] = [
  {
    id: "scenario-a",
    title: "Scenario A · Aggressive Desalination",
    question: "Should Kenya prioritize coastal desalination over upstream conservation?",
    turns: [
      {
        agentId: "orion",
        claim: "Desalination is the only intervention that breaks the water → yield → unrest chain within five years.",
        warrant: "Aquifer recharge lags policy by 9–14y. Coastal capex is the shortest dependency to break.",
        confidence: 0.74,
        evidence: drivers[0].evidence,
      },
      {
        agentId: "lyra",
        claim: "Capital-heavy infrastructure displaces 40k coastal residents and accelerates trust decay.",
        warrant: "Past Mombasa megaprojects show a 6-point trust drop within 18 months of groundbreaking.",
        confidence: 0.68,
        evidence: drivers[3].evidence,
      },
      {
        agentId: "vega",
        claim: "Sovereign credit absorbs the desalination capex only if debt restructuring lands first.",
        warrant: "Coverage ratio falls below 1.1 without Paris Club concession in Q3.",
        confidence: 0.81,
        evidence: drivers[2].evidence,
      },
    ],
  },
  {
    id: "scenario-b",
    title: "Scenario B · Trust-First Coalition",
    question: "Can a trust-rebuilding program outperform capital interventions in 24 months?",
    turns: [
      {
        agentId: "lyra",
        claim: "Trust dividends compound: a 6-point gain prevents 14% of projected unrest.",
        warrant: "Afrobarometer 2018-2024 panel shows non-linear protest decay above 60% trust.",
        confidence: 0.7,
        evidence: drivers[3].evidence,
      },
      {
        agentId: "orion",
        claim: "Trust gains decay without service delivery. Coalition must ship visible infra within 9 months.",
        warrant: "Modular grants outperform symbolic policy in regions with infra lag > 35.",
        confidence: 0.65,
        evidence: drivers[2].evidence,
      },
    ],
  },
];

export type Signal = {
  id: string;
  time: string;
  source: string;
  body: string;
  risk: string;
  traj: "CONVERGENT" | "DIVERGENT" | "WATCH" | "REFERENCE";
  evidence: Evidence;
};

export const signals: Signal[] = [
  {
    id: "s1",
    time: "14:02 UTC",
    source: "Signal",
    body: "Satellite telemetry indicates unmapped groundwater extraction in Marsabit.",
    risk: "ELEVATED",
    traj: "DIVERGENT",
    evidence: drivers[0].evidence,
  },
  {
    id: "s2",
    time: "12:48 UTC",
    source: "Agent Orion",
    body: "Synthetic debate concludes: demographic bulge in Mombasa necessitates immediate education subsidy.",
    risk: "STABLE",
    traj: "CONVERGENT",
    evidence: drivers[1].evidence,
  },
  {
    id: "s3",
    time: "11:31 UTC",
    source: "Agent Lyra",
    body: "Capital flow contraction across East African development banks. Pattern matches 2009-K.",
    risk: "ELEVATED",
    traj: "WATCH",
    evidence: drivers[2].evidence,
  },
  {
    id: "s4",
    time: "09:15 UTC",
    source: "Archive",
    body: "Reference historical pattern '1992-G' identified in current fiscal volatility.",
    risk: "—",
    traj: "REFERENCE",
    evidence: drivers[3].evidence,
  },
];

export const roleProfiles: Record<
  Role,
  {
    headline: string;
    primaryMetric: { label: string; value: string; sub: string };
    recommendedInterventionIds: string[];
    watchlist: string[];
  }
> = {
  government: {
    headline: "Sovereign capacity holds — but fiscal headroom is closing.",
    primaryMetric: { label: "Sovereign Stability", value: "B+", sub: "Outlook: Negative" },
    recommendedInterventionIds: ["debt", "desal", "zoning"],
    watchlist: ["Debt-service ratio", "Subsidy outflow", "Tax base elasticity"],
  },
  investor: {
    headline: "Structural fragility outpaces market pricing. Reprice exposure.",
    primaryMetric: { label: "Portfolio at Risk", value: "$1.4B", sub: "12-mo VaR @ 95%" },
    recommendedInterventionIds: ["desal", "currency", "debt"],
    watchlist: ["FX volatility", "Infra concession yields", "Sovereign CDS"],
  },
  ngo: {
    headline: "Vulnerable population exposure accelerates in Q3.",
    primaryMetric: { label: "Population at Risk", value: "4.2M", sub: "Acute food insecurity" },
    recommendedInterventionIds: ["currency", "grants", "zoning"],
    watchlist: ["Acute malnutrition", "Displacement camps", "Service access gap"],
  },
  city: {
    headline: "Nairobi service load approaches infrastructure ceiling.",
    primaryMetric: { label: "Service Headroom", value: "11%", sub: "Water · Power · Transit" },
    recommendedInterventionIds: ["zoning", "grants", "desal"],
    watchlist: ["Substation load", "Water pressure", "Transit dwell time"],
  },
};