import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MobileNavBar } from '@/components/mobile-nav-bar';
import { AuthProvider } from '@/components/auth/auth-provider';
import { AiAssistantWidget } from '@/components/ai-assistant-widget';

export const metadata: Metadata = {
  title: 'TRIPORA RESERVE | Curated Sanctuaries & Bespoke Expeditions',
  description:
    'Handcrafted itineraries, private aviation, and luxury sanctuaries curated across the globe by TRIPORA RESERVE.',
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
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <SiteFooter />
          <MobileNavBar />
          <AiAssistantWidget />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
