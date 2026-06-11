import { createFileRoute } from "@tanstack/react-router";
import { SanctumHeader } from "@/components/atlas/SanctumHeader";
import { AgentDebate } from "@/components/atlas/AgentDebate";
import { TimeScrubber } from "@/components/atlas/TimeScrubber";

export const Route = createFileRoute("/sanctum")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Debate Workspace" },
      {
        name: "description",
        content: "AI agent debate workspace — compare competing scenarios, claims, warrants, and underlying assumptions.",
      },
    ],
  }),
  component: SanctumPage,
});

function SanctumPage() {
  return (
    <div className="min-h-screen bg-[--obsidian] text-zinc-300 pb-32">
      <SanctumHeader />
      <main className="max-w-screen-2xl mx-auto p-6">
        <div className="mb-8 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[--brass] mb-2">
            The Sanctum
          </p>
          <h1 className="font-serif text-4xl text-zinc-100 leading-tight text-pretty">
            Agents debate scenarios. You inspect their reasoning.
          </h1>
          <p className="text-zinc-500 mt-3 leading-relaxed text-pretty">
            Synthetic experts argue competing structural hypotheses. Every claim
            exposes its warrant, confidence, and the evidence drawer behind it.
          </p>
        </div>
        <AgentDebate />
      </main>
      <TimeScrubber />
    </div>
  );
}