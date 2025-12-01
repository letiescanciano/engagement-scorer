import type { Metadata } from "next";
import { Manrope, Figtree } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YouTube Engagement Calculator | Buffer",
  description:
    "Analyze your YouTube engagement. See how often you reply to comments and discover how you can build stronger connections with your audience using Buffer Community.",
  keywords: ["YouTube", "engagement", "creators", "community", "Buffer"],
  openGraph: {
    title: "YouTube Engagement Calculator | Buffer",
    description:
      "Analyze your YouTube engagement and see how often you reply to comments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
