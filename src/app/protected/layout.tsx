import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import Providers from "../providers";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
        >
          <NavBar/>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
}