import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import SocketContextProvider from "@/context/SocketContext";
import SessionProvider from "@/providers/SessionProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import QueryProvider from "@/providers/QueryProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Tapp",
  description: "Generated by tapp foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body
          className={cn(
            "h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {/* <AuthContextProvider> */}
          <SocketContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <QueryProvider>
                <ModalProvider />
                {children}
              </QueryProvider>
            </ThemeProvider>
          </SocketContextProvider>
          <Toaster />
          {/* </AuthContextProvider> */}
        </body>
      </SessionProvider>
    </html>
  );
}
