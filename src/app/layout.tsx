import type { Metadata, Viewport } from "next";
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
import { fetchLocaleMessages } from "@/lib/i18n-api";
import type { Locale } from "@/i18n/config";
import DOMPurify from "isomorphic-dompurify";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Sanitize description for SEO
const sanitizedDescription = DOMPurify.sanitize(
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
  {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ["b", "i", "em", "strong"],
    KEEP_CONTENT: true,
  }
);

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME || "Postuly",
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "Postuly"}`,
  },
  description: sanitizedDescription,
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  keywords: [
    "emploi",
    "carrière",
    "recrutement",
    "CV",
    "candidature",
    "entretien",
    "job search",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

function generateStructuredData(locale: string) {
  // Sanitize description for structured data
  const sanitizedDesc = DOMPurify.sanitize(
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
    {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: ["b", "i", "em", "strong"],
      KEEP_CONTENT: true,
    }
  );

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: process.env.NEXT_PUBLIC_APP_NAME,
    url: process.env.NEXT_PUBLIC_APP_URL,
    description: sanitizedDesc,
    inLanguage: locale,
    mainEntity: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#webpage`,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#website`,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "WebSite",
              "@id": process.env.NEXT_PUBLIC_APP_URL,
              name: process.env.NEXT_PUBLIC_APP_NAME,
            },
          },
        ],
      },
    },
  };
}

function JobSearchStructuredData({ locale }: { locale: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData(locale)),
      }}
    />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getUserLocaleOnServer();
  const messages = await fetchLocaleMessages(locale as Locale);
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <JobSearchStructuredData locale={locale} />
        <meta name="description" content={sanitizedDescription} />
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
