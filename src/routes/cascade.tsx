import { createFileRoute } from "@tanstack/react-router";
import { SanctumHeader } from "@/components/atlas/SanctumHeader";
import { CascadeGraph } from "@/components/atlas/CascadeGraph";
import { TimeScrubber } from "@/components/atlas/TimeScrubber";

export const Route = createFileRoute("/cascade")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Cascade Explorer" },
      {
        name: "description",
        content: "Interactive dependency graph of failure pathways with adjustable thresholds.",
      },
    ],
  }),
  component: CascadePage,
});

function CascadePage() {
  return (
    <div className="min-h-screen bg-[--obsidian] text-zinc-300 pb-32">
      <SanctumHeader />
      <main className="max-w-screen-2xl mx-auto p-6">
        <div className="mb-8 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[--brass] mb-2">
            Cascade Explorer
          </p>
          <h1 className="font-serif text-4xl text-zinc-100 leading-tight text-pretty">
            Dependencies, not predictions.
          </h1>
          <p className="text-zinc-500 mt-3 leading-relaxed text-pretty">
            Drag thresholds to model the pressure required to trigger each node.
            Brass edges show propagation between nodes whose thresholds have been
            crossed. Click any node for evidence.
          </p>
        </div>
        <CascadeGraph />
      </main>
      <TimeScrubber />
    </div>
  );
}