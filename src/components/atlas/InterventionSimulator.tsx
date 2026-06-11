import { useMemo, useState } from "react";
import { interventions, type Intervention } from "@/lib/atlas-data";

const baseFragility = 78;

type Kind = Intervention["kind"] | "all";

const kinds: { id: Kind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "capital", label: "Capital" },
  { id: "policy", label: "Policy" },
  { id: "infrastructure", label: "Infrastructure" },
];

export function InterventionSimulator({
  recommendedIds,
}: {
  recommendedIds?: string[];
}) {
  const [filter, setFilter] = useState<Kind>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => interventions.filter((i) => filter === "all" || i.kind === filter),
    [filter],
  );

  const chosen = interventions.filter((i) => selected.has(i.id));
  const fragilityDelta = chosen.reduce((sum, i) => sum + i.fragilityDelta, 0);
  const projected = Math.max(0, Math.round((baseFragility + fragilityDelta) * 10) / 10);

  const secondOrder = chosen.flatMap((i) =>
    i.secondOrder.map((s) => ({ ...s, source: i.title })),
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="rounded-xl bg-zinc-900/40 ring-1 ring-white/5 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500">
            Intervention Simulator
          </h3>
          <p className="font-serif text-zinc-100 text-2xl mt-1">
            Choose actions. Observe second-order effects.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Baseline</p>
            <p className="font-serif text-3xl text-zinc-400 line-through decoration-zinc-700">
              {baseFragility}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Projected</p>
            <p
              className={`font-serif text-5xl leading-none ${
                fragilityDelta < 0 ? "text-[--jade]" : "text-zinc-100"
              }`}
            >
              {projected}
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              {fragilityDelta === 0
                ? "Select interventions"
                : `${fragilityDelta.toFixed(1)} fragility`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {kinds.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setFilter(k.id)}
            className={`px-3 py-1 text-[10px] uppercase tracking-widest border rounded-sm transition-colors ${
              filter === k.id
                ? "border-[--brass] text-[--brass] bg-[--brass]/5"
                : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {filtered.map((i) => {
          const isSelected = selected.has(i.id);
          const recommended = recommendedIds?.includes(i.id);
          return (
            <button
              key={i.id}
              type="button"
              onClick={() => toggle(i.id)}
              className={`text-left p-4 border rounded transition-colors relative ${
                isSelected
                  ? "border-[--brass]/60 bg-[--brass]/5"
                  : "border-zinc-800 bg-[--obsidian] hover:border-zinc-700"
              }`}
            >
              {recommended && (
                <span className="absolute top-2 right-2 text-[9px] uppercase tracking-widest text-[--jade]">
                  Recommended
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] uppercase tracking-widest text-zinc-500">
                  {i.kind}
                </span>
                <span className="text-[9px] text-zinc-600">· {i.cost}</span>
              </div>
              <p className="text-zinc-100 text-sm mb-1">{i.title}</p>
              <p className="text-zinc-500 text-xs leading-relaxed text-pretty mb-3">
                {i.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[--jade] text-sm">
                  {i.fragilityDelta.toFixed(1)} fragility
                </span>
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
                  Horizon {i.horizon}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
          Second-Order Effects
        </h4>
        {secondOrder.length === 0 ? (
          <p className="text-zinc-600 text-xs italic">
            Select one or more interventions to project downstream consequences.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {secondOrder.map((s, idx) => (
              <div
                key={idx}
                className="border border-zinc-800 rounded p-3 bg-[--obsidian]"
              >
                <p className="text-[10px] text-zinc-600 mb-1">{s.source}</p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-200 text-xs">{s.label}</span>
                  <span
                    className={
                      s.tone === "good" ? "text-[--jade] text-sm" : "text-[--brass] text-sm"
                    }
                  >
                    {s.delta > 0 ? "+" : ""}
                    {s.delta}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}