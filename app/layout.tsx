import type { Metadata } from "next";
import { Rubik, Rubik_Mono_One } from "next/font/google";
import "./globals.scss";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";
import Footer from "./components/Footer/Footer";

const rubik = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const rubikMono = Rubik_Mono_One({
  variable: "--font-rubik-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "My-Cine-World",
  description: "Created by Mustafa Bereket for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${rubikMono.variable}`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
