import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/redux/StoreProvider";
import ModalManager from "@/components/modal/ModalManager";
import Preload from "@/components/hoc/Preload";
import TanstackProvider from "@/providers/TanstackProvider";
import ThemeRegistry from "../../utils/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Preload />
      <html lang="en">
        <body className={inter.className}>
          <TanstackProvider>
            <ThemeRegistry options={{ key: "mui-theme" }}>
              <ModalManager />
              {children}
            </ThemeRegistry>
          </TanstackProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
