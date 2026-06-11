import { useMemo, useState } from "react";
import { cascadeEdges, cascadeNodes, type CascadeNode } from "@/lib/atlas-data";
import { Slider } from "@/components/ui/slider";
import { EvidenceDrawer } from "./EvidenceDrawer";

// Layout: layer index → column; nodes within layer → row
const layers = Array.from(new Set(cascadeNodes.map((n) => n.layer))).sort();
const layout = cascadeNodes.map((n) => {
  const inLayer = cascadeNodes.filter((x) => x.layer === n.layer);
  const row = inLayer.findIndex((x) => x.id === n.id);
  const total = inLayer.length;
  return {
    ...n,
    cx: 80 + n.layer * 180,
    cy: 80 + (row + 1) * (440 / (total + 1)),
  };
});
const byId = Object.fromEntries(layout.map((n) => [n.id, n]));

export function CascadeGraph() {
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(cascadeNodes.map((n) => [n.id, n.threshold])),
  );
  const [drawerNode, setDrawerNode] = useState<CascadeNode | null>(null);

  // Triggered if its driving pressure crosses adjustable threshold
  const triggered = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const n of cascadeNodes) {
      result[n.id] = thresholds[n.id] <= n.triggersAt + 25;
    }
    return result;
  }, [thresholds]);

  function setThreshold(id: string, value: number) {
    setThresholds((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 rounded-xl bg-zinc-900/40 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500">
            Failure Pathway · Directed Dependency
          </h3>
          <span className="text-[10px] text-zinc-600">
            Click a node to inspect evidence
          </span>
        </div>
        <svg viewBox="0 0 900 560" className="w-full h-[560px]">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#52525b" />
            </marker>
            <marker
              id="arrow-hot"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brass)" />
            </marker>
          </defs>

          {cascadeEdges.map(([a, b]) => {
            const from = byId[a];
            const to = byId[b];
            const hot = triggered[a] && triggered[b];
            return (
              <line
                key={`${a}-${b}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={hot ? "var(--brass)" : "#3f3f46"}
                strokeWidth={hot ? 1.5 : 1}
                strokeDasharray={hot ? "0" : "3 3"}
                markerEnd={hot ? "url(#arrow-hot)" : "url(#arrow)"}
                opacity={hot ? 0.9 : 0.5}
              />
            );
          })}

          {layout.map((n) => {
            const hot = triggered[n.id];
            return (
              <g
                key={n.id}
                transform={`translate(${n.cx}, ${n.cy})`}
                className="cursor-pointer"
                onClick={() => setDrawerNode(n)}
              >
                <circle
                  r={28}
                  fill={hot ? "var(--brass)" : "#18181b"}
                  fillOpacity={hot ? 0.15 : 1}
                  stroke={hot ? "var(--brass)" : "#3f3f46"}
                  strokeWidth={1.5}
                />
                {hot && (
                  <circle
                    r={28}
                    fill="none"
                    stroke="var(--brass)"
                    strokeWidth={1}
                    opacity={0.3}
                    style={{ animation: "ping 2s ease-out infinite" }}
                  />
                )}
                <text
                  textAnchor="middle"
                  y={-38}
                  className="fill-zinc-300 text-[11px]"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {n.title}
                </text>
                <text
                  textAnchor="middle"
                  y={5}
                  className={hot ? "fill-[--brass] text-sm font-medium" : "fill-zinc-500 text-sm"}
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {thresholds[n.id]}
                </text>
              </g>
            );
          })}

          {layers.map((l) => (
            <text
              key={l}
              x={80 + l * 180}
              y={540}
              textAnchor="middle"
              className="fill-zinc-700 text-[9px] uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Layer {l}
            </text>
          ))}
        </svg>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-3">
        <div className="rounded-xl bg-zinc-900/40 ring-1 ring-white/5 p-5">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
            Adjustable Thresholds
          </h3>
          <p className="text-zinc-500 text-xs mb-5">
            Drag to model pressure required to trigger each node. Red arrows show
            propagation.
          </p>
          <div className="space-y-5">
            {cascadeNodes.map((n) => (
              <div key={n.id}>
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-zinc-300">{n.title}</span>
                  <span className="text-zinc-500">
                    {thresholds[n.id]} / triggers at {n.triggersAt}
                  </span>
                </div>
                <Slider
                  value={[thresholds[n.id]]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => setThreshold(n.id, v[0])}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <EvidenceDrawer
        open={!!drawerNode}
        onOpenChange={(v) => !v && setDrawerNode(null)}
        title={drawerNode?.title ?? ""}
        subject={drawerNode?.note}
        evidence={drawerNode?.evidence ?? null}
      />
    </div>
  );
}