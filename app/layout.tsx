import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "../wagmi";
import { headers } from "next/headers";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Based",
  description: "Social Media website for base builders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState}>
          <NavbarWrapper />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
