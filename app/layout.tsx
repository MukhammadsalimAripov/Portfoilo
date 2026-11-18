import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sirius — Команда веб-разработчиков | Next.js Портфолио',
  description: 'Портфолио команды веб-разработчиков Sirius (Мухаммадсалим и Мухаммад) на Next.js. Современные веб-приложения, сайты и Telegram-боты.',
  keywords: ['Sirius', 'веб-разработчик', 'команда разработчиков', 'Next.js', 'React', 'TypeScript', 'Мухаммадсалим', 'Мухаммад', 'портфолио'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <body className="min-h-screen flex flex-col transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
