import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "BrewLite — More than just coffee",
  description:
    "Đặt cà phê nhanh chóng, thanh toán tiện lợi cùng BrewLite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#fcfaf7]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
