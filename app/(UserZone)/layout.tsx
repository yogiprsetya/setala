import { Header } from './_components/Header';
import Sidebar from './_components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="grow">
        <Header />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
