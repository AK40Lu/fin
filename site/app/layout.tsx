import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fin — Kids Business Coach",
  description: "A 1:1 business coach for kids 10–13. Six weeks. One idea. One real sale. The foundation every founder needs before they're ever in the room.",
  openGraph: {
    title: "Fin — Kids Business Coach",
    description: "A 1:1 business coach for kids 10–13. Six weeks. One idea. One real sale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
