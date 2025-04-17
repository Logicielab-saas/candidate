import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { NotificationsProvider } from "@/features/notifications/context/notifications-context";
import { getUserLocaleOnServer } from "@/lib/actions/getUserLocale.action";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "JobsApp",
  description: "JobsApp description",
};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const _geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // server-side cookie read
  const locale = await getUserLocaleOnServer();

  // load the messages for this locale
  const messages = (await import(`@/messages/${locale}.json`)).default;

  // only arabic should flip for now
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body className={cn("antialiased", roboto.className)}>
        <NotificationsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <NextTopLoader showSpinner={false} color="#ff9c2a" />
              <NuqsAdapter>
                <ReactQueryProvider>{children}</ReactQueryProvider>
              </NuqsAdapter>
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
