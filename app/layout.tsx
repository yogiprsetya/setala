import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '~/utils/css';
import { ThemeProvider } from 'next-themes';
import { Sheet } from '~/components/ui/sheet';

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
    <html suppressHydrationWarning lang="en">
      <body
        className={cn('min-h-screen font-sans antialiased bg-background/50', fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
