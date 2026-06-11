import { Link, useRouterState } from "@tanstack/react-router";
import { useRole } from "@/lib/atlas-context";
import { roles, type Role } from "@/lib/atlas-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const nav = [
  { to: "/", label: "Command" },
  { to: "/sanctum", label: "Sanctum" },
  { to: "/cascade", label: "Cascade" },
];

export function SanctumHeader() {
  const { role, setRole } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="border-b border-zinc-800/60 py-4 px-6 sticky top-0 z-40 bg-[--obsidian]/95 backdrop-blur">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-medium tracking-tight text-zinc-100">
              Atlas Sanctum
            </span>
            <span className="text-[10px] text-[--brass] uppercase tracking-widest px-1.5 py-0.5 border border-[--brass]/30 rounded-sm">
              Authenticated
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-zinc-500 text-xs uppercase tracking-widest">
            {nav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={
                    active
                      ? "text-zinc-200 border-b border-[--brass]/60 pb-0.5"
                      : "hover:text-zinc-200 transition-colors"
                  }
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-zinc-500 text-xs">
          <span className="hidden lg:flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[--jade] animate-pulse" />
            SIGNAL_STABLE
          </span>
          <div className="hidden lg:block w-px h-4 bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-600">Viewing as</span>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className="w-[160px] h-8 bg-zinc-900/60 border-zinc-800 text-zinc-200 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[--obsidian] border-zinc-800 text-zinc-200">
              {roles.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-xs">
                  <div className="flex flex-col">
                    <span>{r.label}</span>
                    <span className="text-[10px] text-zinc-500">{r.subtitle}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}