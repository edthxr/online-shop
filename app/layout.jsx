import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";


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

export const metadata = {
  title: "NO RISK NO RICH | เสื้อแฟชั่นสุดเท่",
  description: "เสื้อยืดลิมิเต็ดดีไซน์ NO RISK NO RICH สวมใส่แล้วสะท้อนตัวตนของคุณ",
  openGraph: {
    title: "NO RISK NO RICH | เสื้อแฟชั่นสุดเท่",
    description: "เสื้อยืดลิมิเต็ดดีไซน์ NO RISK NO RICH สวมใส่แล้วสะท้อนตัวตนของคุณ",
    url: "https://online-shop-zeta-one.vercel.app",
    siteName: "NO RISK SHOP",
    images: [
      {
        url: "https://sv1.img.in.th/7263tD.png",
        width: 1200,
        height: 630,
        alt: "เสื้อ NO RISK NO RICH",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NO RISK NO RICH | เสื้อแฟชั่นสุดเท่",
    description: "เสื้อยืดลิมิเต็ดดีไซน์ NO RISK NO RICH สวมใส่แล้วสะท้อนตัวตนของคุณ",
    images: ["https://sv1.img.in.th/7263tD.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ffffff] mb-10`}
      >
        <CartProvider>
          <Navbar />
          {children} {/* นำเข้าทุกหน้าไว้ที่นี่ */}
        </CartProvider>
   
        <Footer />
      </body>
    </html>
  );
}
