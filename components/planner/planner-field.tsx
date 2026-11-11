import type { ReactNode } from 'react';

export const controlClass =
  'w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-base text-brand-ink shadow-sm transition-colors placeholder:text-brand-muted/70 focus:border-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-forest/20 aria-[invalid=true]:border-destructive';

export function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl text-brand-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-[1.5] text-brand-muted">{description}</p>
    </div>
  );
}

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-brand-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-brand-muted">{hint}</p>
      ) : null}
    </div>
  );
}
