import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import { Inter } from "next/font/google";
import { SelectLanguage } from '@/components/selectLanguage';


const inter = Inter({ subsets: ["latin"] });


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
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div>
            <div className='flex justify-end px-5 pt-2'>
              <SelectLanguage />

            </div>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}