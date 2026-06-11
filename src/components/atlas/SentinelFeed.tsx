import { useState } from "react";
import { signals, type Signal } from "@/lib/atlas-data";
import { EvidenceDrawer } from "./EvidenceDrawer";

export function SentinelFeed() {
  const [active, setActive] = useState<Signal | null>(null);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-zinc-500 uppercase tracking-widest text-[10px]">Sentinel Feed</h2>
        <span className="text-[10px] text-zinc-600">SIGNAL → RISK → TRAJ</span>
      </div>
      <div className="space-y-6 mt-6">
        {signals.map((item, idx) => {
          const dot =
            item.traj === "DIVERGENT"
              ? "bg-[--brass]"
              : item.traj === "CONVERGENT"
                ? "bg-[--jade]"
                : item.traj === "WATCH"
                  ? "bg-zinc-500"
                  : "bg-zinc-800";
          const trajColor =
            item.traj === "DIVERGENT"
              ? "text-[--brass]"
              : item.traj === "CONVERGENT"
                ? "text-[--jade]"
                : "text-zinc-400";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className={`w-full text-left group ${idx > 0 ? "border-t border-zinc-900 pt-6" : ""}`}
            >
              <div className="flex gap-2 items-center mb-2">
                <span className={`size-1.5 rounded-full ${dot}`} />
                <span className="text-[11px] text-zinc-500">
                  {item.time} · {item.source}
                </span>
              </div>
              <p className="text-zinc-200 leading-snug mb-2 text-pretty text-[13px] group-hover:text-zinc-100">
                {item.body}
              </p>
              <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>
                  RISK: <span className="text-zinc-300">{item.risk}</span>
                </span>
                <span>
                  TRAJ: <span className={trajColor}>{item.traj}</span>
                </span>
                <span className="ml-auto text-[--brass] opacity-0 group-hover:opacity-100 transition-opacity">
                  Evidence →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <EvidenceDrawer
        open={!!active}
        onOpenChange={(v) => !v && setActive(null)}
        title={active?.source ?? ""}
        subject={active?.body}
        evidence={active?.evidence ?? null}
      />
    </>
  );
}