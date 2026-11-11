'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function StartOverButton({ onConfirm, disabled }: { onConfirm: () => Promise<void>; disabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleConfirm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setResetting(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setResetting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Start over
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-brand-ink">Start this plan over?</AlertDialogTitle>
          <AlertDialogDescription className="text-base leading-[1.5]">
            Every answer you have entered so far will be cleared. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={resetting} className="rounded-full">
            Keep my answers
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={resetting}
            className="rounded-full bg-brand-forest text-white hover:bg-[#274a39]"
          >
            {resetting ? 'Clearing...' : 'Start over'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
