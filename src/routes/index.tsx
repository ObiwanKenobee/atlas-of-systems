import { createFileRoute } from "@tanstack/react-router";
import orreryImage from "@/assets/orrery.jpg";
import { useState } from "react";
import { SanctumHeader } from "@/components/atlas/SanctumHeader";
import { SentinelFeed } from "@/components/atlas/SentinelFeed";
import { TimeScrubber } from "@/components/atlas/TimeScrubber";
import { InterventionSimulator } from "@/components/atlas/InterventionSimulator";
import { EvidenceDrawer } from "@/components/atlas/EvidenceDrawer";
import { useRole } from "@/lib/atlas-context";
import { drivers, roleProfiles, type Driver } from "@/lib/atlas-data";

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

const cascade = [
  { title: "Water Scarcity", note: "Aquifer depletion in Rift Valley triggers agricultural yield collapse.", tone: "brass" as const },
  { title: "Internal Migration", note: "Mass relocation to Nairobi exurbs strains informal infrastructure.", tone: "mid" as const },
  { title: "Fiscal Pressure", note: "Subsidy outflows accelerate sovereign debt revisions.", tone: "mid" as const },
  { title: "Civil Unrest", note: null, tone: "dim" as const },
];

function CommandCenter() {
  const { role } = useRole();
  const profile = roleProfiles[role];
  const [driverEvidence, setDriverEvidence] = useState<Driver | null>(null);

  return (
    <div className="min-h-screen bg-[--obsidian] text-zinc-300 selection:bg-[--brass]/30 pb-32">
      <SanctumHeader />

      <div className="max-w-screen-2xl mx-auto px-6 pt-6">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex-1 min-w-[280px]">
            <p className="text-[10px] uppercase tracking-widest text-[--brass] mb-1">
              {role} view
            </p>
            <p className="font-serif text-zinc-100 text-xl leading-tight text-pretty">
              {profile.headline}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              {profile.primaryMetric.label}
            </p>
            <p className="font-serif text-3xl text-zinc-100 leading-none mt-1">
              {profile.primaryMetric.value}
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">{profile.primaryMetric.sub}</p>
          </div>
          <div className="max-w-[260px]">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              Watchlist
            </p>
            <div className="flex flex-wrap gap-1">
              {profile.watchlist.map((w) => (
                <span
                  key={w}
                  className="text-[10px] text-zinc-400 border border-zinc-800 rounded-sm px-1.5 py-0.5"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDriverEvidence(d)}
                  className="w-full text-left group"
                >
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {d.label}
                    </span>
                    <span className={d.status === "CRITICAL" ? "text-[--brass]" : "text-zinc-400"}>
                      {d.status}
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.status === "CRITICAL" ? "bg-[--brass]" : "bg-zinc-500"}`}
                      style={{ width: `${d.value}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-4">
              Click a driver to inspect evidence
            </p>
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

          <InterventionSimulator recommendedIds={profile.recommendedInterventionIds} />
        </section>

        {/* Right Rail: Sentinel Feed */}
        <aside className="col-span-3 border-l border-zinc-800/60 pl-6 flex flex-col gap-6">
          <SentinelFeed />
        </aside>
      </main>

      <TimeScrubber />

      <EvidenceDrawer
        open={!!driverEvidence}
        onOpenChange={(v) => !v && setDriverEvidence(null)}
        title={driverEvidence?.label ?? ""}
        subject={driverEvidence ? `${driverEvidence.status} · ${driverEvidence.value}/100` : undefined}
        evidence={driverEvidence?.evidence ?? null}
      />
    </div>
  );
}
