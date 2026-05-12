import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import { DM_Sans, Lora } from "next/font/google";
import { SelectLanguage } from '@/components/selectLanguage';

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});


export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSans.variable} ${lora.variable}`}>
      <body className={`${dmSans.className} min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen">
            <header className="mx-auto flex max-w-3xl justify-end px-6 pt-8 pb-2 sm:px-8">
              <SelectLanguage />
            </header>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}