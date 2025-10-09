import Script from "next/script";
import "./globals.css";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Script src="/js/gtm.js" strategy="afterInteractive" />
        <Script src="/js/pixel.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
