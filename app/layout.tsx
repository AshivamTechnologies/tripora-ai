import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AuthProvider } from '@/components/auth/auth-provider';
import { AiAssistantWidget } from '@/components/ai-assistant-widget';

export const metadata: Metadata = {
  title: 'TRIPORA AI | Explore More. Plan Smarter. Travel Better.',
  description:
    'Plan, organise and manage your trips with TRIPORA AI. Build day-wise itineraries, track budgets and keep every journey in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col bg-brand-mist/20">
        <AuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <AiAssistantWidget />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
