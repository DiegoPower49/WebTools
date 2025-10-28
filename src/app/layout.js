import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import content from "@/content/content.json";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  authors: content.metadata.authors,
  metadataBase: new URL("https://fasttools.vercel.app"),
  openGraph: content.metadata.openGraph,
  icons: content.metadata.icons,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="fixed bg-black inset-0 flex justify-center items-center -z-10">
          <Image
            src="/icono.png"
            alt="Background"
            width={800} // ajusta según el tamaño que desees
            height={800}
            className="opacity-30 object-contain select-none pointer-events-none"
            priority
          />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
