import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Evidence } from "@/lib/atlas-data";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  subject?: string;
  evidence: Evidence | null;
};

export function EvidenceDrawer({ open, onOpenChange, title, subject, evidence }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-[--obsidian] border-l border-zinc-800 text-zinc-300 w-[480px] sm:max-w-[480px] overflow-y-auto"
      >
        <SheetHeader className="text-left space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[--brass]">
            Evidence Drawer
          </span>
          <SheetTitle className="font-serif text-2xl text-zinc-100">{title}</SheetTitle>
          {subject && (
            <SheetDescription className="text-zinc-500 text-xs">{subject}</SheetDescription>
          )}
        </SheetHeader>

        {evidence && (
          <div className="mt-8 space-y-8 text-xs">
            <section>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                Data Provenance
              </h3>
              <div className="space-y-2">
                <Row label="Source" value={evidence.source} />
                <Row label="Updated" value={evidence.updated} />
                <Row
                  label="Confidence"
                  value={`${(evidence.confidence * 100).toFixed(0)}%`}
                  accent
                />
              </div>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                Underlying Assumptions
              </h3>
              <ul className="space-y-2">
                {evidence.assumptions.map((a) => (
                  <li key={a} className="flex gap-2 text-zinc-300 leading-relaxed">
                    <span className="text-[--brass] shrink-0">·</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                Citations
              </h3>
              <div className="space-y-2">
                {evidence.citations.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between border-b border-zinc-900 pb-2"
                  >
                    <span className="text-zinc-200">{c.label}</span>
                    <span className="text-zinc-500">{c.org}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded border border-zinc-800 p-3 text-zinc-500">
              Inspect raw payloads, model versions, and adversarial reviews in the Archive.
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
      <span className="text-zinc-500 uppercase tracking-widest text-[10px]">{label}</span>
      <span className={accent ? "text-[--jade]" : "text-zinc-200"}>{value}</span>
    </div>
  );
}