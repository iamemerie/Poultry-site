import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import Navbar from "./components/Nav";

const heading = Bricolage_Grotesque({
  variable: "--font-heading-loaded",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body-loaded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Green Ranch | Fresh Eggs & Healthy Hens",
  description:
    "Healthy hens, fresh eggs and quality poultry. Pre-order or join our waiting list.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
