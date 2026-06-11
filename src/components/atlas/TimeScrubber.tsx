const timeMarks = [
  { label: "−5y", active: false },
  { label: "Now", active: true },
  { label: "+5y", active: false },
  { label: "+20y", active: false },
];

export function TimeScrubber() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[--obsidian]/95 backdrop-blur border-t border-zinc-800 py-5 px-12 z-30">
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
  );
}