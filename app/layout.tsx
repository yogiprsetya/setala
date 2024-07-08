import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { NextAuthProvider } from '~/components/layout/NextAuthProvider';
import { SWRProvider } from '~/components/layout/SWRProvider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Setala App - Rocketify Your Life',
  description: 'Rocketify Your Life',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={fontSans.variable}>
      <body className="min-h-screen font-sans antialiased bg-background/50">
        <SWRProvider>
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </NextAuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
