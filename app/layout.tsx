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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
