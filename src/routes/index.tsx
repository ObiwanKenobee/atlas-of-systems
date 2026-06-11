import { createFileRoute } from "@tanstack/react-router";
import orreryImage from "@/assets/orrery.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Command" },
      { name: "description", content: "Civilization operating system for structural resilience. Monitor fragility, cascades, and interventions in real time." },
      { property: "og:title", content: "Atlas Sanctum — Command" },
      { property: "og:description", content: "Civilization operating system for structural resilience." },
    ],
  }),
  component: CommandCenter,
});

const drivers = [
  { label: "Water Stress", value: 82, status: "CRITICAL", critical: true },
  { label: "Urban Growth", value: 64, status: "VOLATILE", critical: false },
  { label: "Infra Lag", value: 41, status: "STABLE", critical: false },
  { label: "Trust Decay", value: 56, status: "WATCH", critical: false },
];

const cascade = [
  { title: "Water Scarcity", note: "Aquifer depletion in Rift Valley triggers agricultural yield collapse.", tone: "brass" as const },
  { title: "Internal Migration", note: "Mass relocation to Nairobi exurbs strains informal infrastructure.", tone: "mid" as const },
  { title: "Fiscal Pressure", note: "Subsidy outflows accelerate sovereign debt revisions.", tone: "mid" as const },
  { title: "Civil Unrest", note: null, tone: "dim" as const },
];

const interventions = [
  { title: "Desalination Network", delta: "+12.4%", state: "ready" as const },
  { title: "Dense Zoning Policy", delta: "+8.1%", state: "ready" as const },
  { title: "Mobile Currency Buffer", delta: "+6.7%", state: "ready" as const },
  { title: "Modular Infra Grants", delta: "PENDING", state: "pending" as const },
];

const feed = [
  {
    time: "14:02 UTC",
    source: "Signal",
    body: "Satellite telemetry indicates unmapped groundwater extraction in Marsabit.",
    risk: "ELEVATED",
    traj: "DIVERGENT",
    trajTone: "brass" as const,
    dot: "brass" as const,
  },
  {
    time: "12:48 UTC",
    source: "Agent Orion",
    body: "Synthetic debate concludes: demographic bulge in Mombasa necessitates immediate education subsidy.",
    risk: "STABLE",
    traj: "CONVERGENT",
    trajTone: "jade" as const,
    dot: "mid" as const,
  },
  {
    time: "11:31 UTC",
    source: "Agent Lyra",
    body: "Capital flow contraction detected across East African development banks. Cross-correlated with 2009-K pattern.",
    risk: "ELEVATED",
    traj: "WATCH",
    trajTone: "brass" as const,
    dot: "brass" as const,
  },
  {
    time: "09:15 UTC",
    source: "Archive",
    body: "Reference historical pattern '1992-G' identified in current fiscal volatility.",
    risk: "—",
    traj: "REFERENCE",
    trajTone: "mid" as const,
    dot: "dim" as const,
  },
];

const timeMarks = [
  { label: "−5y", active: false },
  { label: "Now", active: true },
  { label: "+5y", active: false },
  { label: "+20y", active: false },
];

function CommandCenter() {
  return (
    <div className="min-h-screen bg-[--obsidian] text-zinc-300 selection:bg-[--brass]/30 pb-32">
      {/* Sanctum Identity Header */}
      <header className="border-b border-zinc-800/60 py-4 px-6">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-medium tracking-tight text-zinc-100">
                Atlas Sanctum
              </span>
              <span className="text-[10px] text-[--brass] uppercase tracking-widest px-1.5 py-0.5 border border-[--brass]/30 rounded-sm">
                Authenticated
              </span>
            </div>
            <nav className="hidden md:flex gap-6 text-zinc-500 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-zinc-200 transition-colors">Observatory</a>
              <a href="#" className="text-zinc-200 border-b border-[--brass]/60 pb-0.5">Command</a>
              <a href="#" className="hover:text-zinc-200 transition-colors">Archive</a>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 text-xs">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[--jade] animate-pulse" />
              SIGNAL_STABLE
            </span>
            <div className="w-px h-4 bg-zinc-800" />
            <span>AGENT_ORION: ACTIVE</span>
            <div className="w-px h-4 bg-zinc-800" />
            <span className="text-zinc-400">09:41:02 UTC</span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Left Rail: Nation Focus */}
        <aside className="col-span-3 flex flex-col gap-8">
          <section>
            <h2 className="text-zinc-500 uppercase tracking-widest text-[10px] mb-4">
              Current Subject
            </h2>
            <div className="space-y-1">
              <h1 className="font-serif text-5xl font-medium text-zinc-100 leading-none">
                Kenya
              </h1>
              <p className="text-zinc-500 text-xs mt-2">Equatorial Zone · 01.12.S 36.48.E</p>
            </div>
          </section>

          <section className="p-5 rounded-lg bg-zinc-900/40 ring-1 ring-white/5">
            <div className="flex justify-between items-end mb-6">
              <span className="text-zinc-400 text-xs uppercase tracking-widest">
                Fragility Index
              </span>
              <span className="font-serif text-zinc-100 text-5xl leading-none">
                78<span className="text-lg text-zinc-600">/100</span>
              </span>
            </div>
            <div className="space-y-4">
              {drivers.map((d) => (
                <div key={d.label} className="group">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {d.label}
                    </span>
                    <span className={d.critical ? "text-[--brass]" : "text-zinc-400"}>
                      {d.status}
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.critical ? "bg-[--brass]" : "bg-zinc-500"}`}
                      style={{ width: `${d.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] mb-4">
              Cascade Pathway
            </h3>
            <div className="relative pl-4 border-l border-zinc-800 space-y-6">
              {cascade.map((c) => (
                <div key={c.title} className="relative">
                  <span
                    className={`absolute -left-[21px] top-1 size-2 rounded-full ${
                      c.tone === "brass"
                        ? "bg-[--brass]"
                        : c.tone === "mid"
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    }`}
                  />
                  <p
                    className={
                      c.tone === "brass"
                        ? "text-zinc-200 font-medium"
                        : c.tone === "mid"
                          ? "text-zinc-400"
                          : "text-zinc-600"
                    }
                  >
                    {c.title}
                  </p>
                  {c.note && (
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed text-pretty">
                      {c.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Center: Living System Orrery + Intervention Console */}
        <section className="col-span-6 flex flex-col gap-6">
          <div className="relative aspect-square w-full grid place-items-center overflow-hidden rounded-full">
            <img
              src={orreryImage}
              alt="Living system orrery of Earth"
              width={1280}
              height={1280}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />
            <div
              className="absolute inset-6 rounded-full border border-zinc-800/40"
              style={{ animation: "spin 60s linear infinite" }}
            />
            <div
              className="absolute inset-20 rounded-full border border-zinc-800/30"
              style={{ animation: "spin 45s linear infinite reverse" }}
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">
              System Orrery · Real Time
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
              <span className="size-1 rounded-full bg-[--jade] animate-pulse" />
              Telemetry Live
            </div>
          </div>

          <div className="p-6 bg-zinc-900/60 ring-1 ring-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Intervention Console
                </h3>
                <p className="font-serif text-zinc-200 text-lg mt-1">
                  Possible futures, before action.
                </p>
              </div>
              <button
                type="button"
                className="py-2 px-3 bg-[--brass] text-zinc-950 font-medium text-xs uppercase tracking-widest flex items-center gap-2 rounded-sm hover:brightness-110 transition"
              >
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Simulate
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {interventions.map((i) => (
                <div
                  key={i.title}
                  className="p-3 border border-zinc-800 rounded bg-[--obsidian] hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <p className="text-[11px] text-zinc-400 mb-2 leading-tight">{i.title}</p>
                  <p
                    className={
                      i.state === "ready"
                        ? "text-[--jade] text-sm"
                        : "text-zinc-500 text-xs"
                    }
                  >
                    {i.state === "ready" ? `${i.delta} Stability` : i.delta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Rail: Sentinel Feed */}
        <aside className="col-span-3 border-l border-zinc-800/60 pl-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-500 uppercase tracking-widest text-[10px]">
              Sentinel Feed
            </h2>
            <span className="text-[10px] text-zinc-600">SIGNAL → RISK → TRAJ</span>
          </div>
          <div className="space-y-6">
            {feed.map((item, idx) => (
              <div key={item.time} className={idx > 0 ? "border-t border-zinc-900 pt-6" : ""}>
                <div className="flex gap-2 items-center mb-2">
                  <span
                    className={`size-1.5 rounded-full ${
                      item.dot === "brass"
                        ? "bg-[--brass]"
                        : item.dot === "mid"
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    }`}
                  />
                  <span className="text-[11px] text-zinc-500">
                    {item.time} · {item.source}
                  </span>
                </div>
                <p className="text-zinc-200 leading-snug mb-2 text-pretty text-[13px]">
                  {item.body}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>
                    RISK: <span className="text-zinc-300">{item.risk}</span>
                  </span>
                  <span>
                    TRAJ:{" "}
                    <span className={item.trajTone === "brass" ? "text-[--brass]" : item.trajTone === "jade" ? "text-[--jade]" : "text-zinc-400"}>
                      {item.traj}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Global Time Scrubber */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[--obsidian]/95 backdrop-blur border-t border-zinc-800 py-5 px-12 z-50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              Temporal Projection
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              Drag to navigate possible futures
            </span>
          </div>
          <div className="relative flex items-center h-6">
            <div className="absolute w-full h-px bg-zinc-800" />
            <div className="absolute left-1/4 w-1/2 h-px bg-[--brass]/40" />
            <div className="relative flex justify-between w-full">
              {timeMarks.map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-2">
                  <div
                    className={
                      m.active
                        ? "size-3 rounded-full bg-[--brass] ring-4 ring-[--brass]/20"
                        : "size-2 rounded-full bg-zinc-800 border border-zinc-700"
                    }
                  />
                  <span
                    className={
                      m.active
                        ? "text-zinc-200 text-[10px] font-medium"
                        : "text-zinc-600 text-[10px]"
                    }
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
