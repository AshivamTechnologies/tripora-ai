import './globals.css';
import type { Metadata } from 'next';
import { Manrope, DM_Serif_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { AuthProvider } from '@/components/auth/auth-provider';
import { AiAssistantWidget } from '@/components/ai-assistant-widget';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

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
    <html lang="en" className={`${manrope.variable} ${dmSerif.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <SiteHeader />
          <main>{children}</main>
          <AiAssistantWidget />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
