'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-brand-mist px-5 py-24">
      <div className="max-w-md text-center" role="alert">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive" aria-hidden="true" />
        <h1 className="mt-6 font-serif text-4xl text-brand-ink">Something went off course</h1>
        <p className="mt-4 text-base leading-relaxed text-brand-muted">
          An unexpected problem stopped this page from loading. Your saved trips are not affected.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#274a39]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}
