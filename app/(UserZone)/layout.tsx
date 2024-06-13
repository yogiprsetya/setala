export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside>
        <ul />
      </aside>

      <main>{children}</main>
    </div>
  );
}
