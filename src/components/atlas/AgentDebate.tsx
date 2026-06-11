import { useState } from "react";
import { agents, debates } from "@/lib/atlas-data";
import { EvidenceDrawer } from "./EvidenceDrawer";

const agentById = Object.fromEntries(agents.map((a) => [a.id, a]));

export function AgentDebate() {
  const [activeId, setActiveId] = useState(debates[0].id);
  const [evidenceOpen, setEvidenceOpen] = useState<{
    title: string;
    subject: string;
    evidence: (typeof debates)[number]["turns"][number]["evidence"];
  } | null>(null);

  const active = debates.find((d) => d.id === activeId)!;

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 lg:col-span-3">
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
          Open Scenarios
        </h3>
        <div className="space-y-2">
          {debates.map((d) => {
            const active = d.id === activeId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  active
                    ? "border-[--brass]/60 bg-[--brass]/5"
                    : "border-zinc-800 bg-[--obsidian] hover:border-zinc-700"
                }`}
              >
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                  {d.id.replace("-", " · ")}
                </p>
                <p className="font-serif text-zinc-100 text-base leading-tight">
                  {d.title}
                </p>
              </button>
            );
          })}
        </div>

        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mt-8 mb-3">
          Agents in Session
        </h3>
        <div className="space-y-2">
          {agents.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-2 border border-zinc-900 rounded">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: a.color }}
              />
              <div>
                <p className="text-zinc-200 text-xs">{a.name}</p>
                <p className="text-zinc-600 text-[10px]">{a.school}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="col-span-12 lg:col-span-9 rounded-xl bg-zinc-900/40 ring-1 ring-white/5 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[--brass] mb-2">
              Live Debate
            </p>
            <h2 className="font-serif text-3xl text-zinc-100 leading-tight max-w-2xl">
              {active.question}
            </h2>
          </div>
          <button
            type="button"
            className="px-3 py-2 bg-[--brass] text-zinc-950 text-xs uppercase tracking-widest rounded-sm hover:brightness-110 transition"
          >
            Synthesize
          </button>
        </div>

        <div className="space-y-5">
          {active.turns.map((turn, idx) => {
            const agent = agentById[turn.agentId];
            return (
              <article
                key={idx}
                className="grid grid-cols-12 gap-4 p-4 border border-zinc-800 rounded"
              >
                <div className="col-span-12 md:col-span-3 flex md:flex-col gap-2 md:gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: agent.color }}
                    />
                    <span className="text-zinc-100 text-sm">{agent.name}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                    {agent.school}
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-auto">
                    Confidence {(turn.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-2">
                  <p className="text-zinc-100 leading-relaxed text-pretty">{turn.claim}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed text-pretty">
                    <span className="text-zinc-600 uppercase tracking-widest text-[10px] mr-2">
                      Warrant
                    </span>
                    {turn.warrant}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setEvidenceOpen({
                        title: agent.name,
                        subject: turn.claim,
                        evidence: turn.evidence,
                      })
                    }
                    className="text-[10px] uppercase tracking-widest text-[--brass] hover:text-[--brass]/80 transition-colors"
                  >
                    Inspect evidence →
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 p-4 border border-dashed border-zinc-800 rounded">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Provisional Synthesis
          </p>
          <p className="text-zinc-300 leading-relaxed text-pretty">
            Agents converge on a sequenced approach: debt restructuring (Q3) unlocks fiscal
            headroom for desalination capex, paired with trust-building grants to absorb
            displacement shock. Disagreement remains on the 24-month milestone weighting.
          </p>
        </div>
      </section>

      <EvidenceDrawer
        open={!!evidenceOpen}
        onOpenChange={(v) => !v && setEvidenceOpen(null)}
        title={evidenceOpen?.title ?? ""}
        subject={evidenceOpen?.subject}
        evidence={evidenceOpen?.evidence ?? null}
      />
    </div>
  );
}