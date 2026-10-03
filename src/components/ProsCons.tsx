import { Icon } from "./Icon";

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card p-5">
        <h3 className="flex items-center gap-2 font-semibold text-ink-900">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon name="plus" className="h-4 w-4" strokeWidth={2.25} /></span>
          Pros
        </h3>
        <ul className="mt-3 space-y-2.5 text-[0.95rem] text-ink-700">
          {pros.map((p) => (
            <li key={p} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />{p}</li>
          ))}
        </ul>
      </div>
      <div className="card p-5">
        <h3 className="flex items-center gap-2 font-semibold text-ink-900">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-ink-600"><Icon name="minus" className="h-4 w-4" strokeWidth={2.25} /></span>
          Cons
        </h3>
        <ul className="mt-3 space-y-2.5 text-[0.95rem] text-ink-700">
          {cons.map((c) => (
            <li key={c} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" />{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
