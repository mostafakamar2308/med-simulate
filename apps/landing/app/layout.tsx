import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import Providers from '@/components/layout/ClientProviders';

export const metadata: Metadata = {
  title: 'Med Simulate | تدرّب على الحالات قبل أن تواجهها',
  description:
    'منصّة محاكاة طبية تفاعلية لأطباء الامتياز - تدرّب على حالات واقعية بصوتك وقوّي تفكيرك السريري قبل أول نبطشية',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <Head>
        <meta name="author" content="Med Simulate" />
        <meta
          name="keywords"
          content="محاكاة طبية، تدريب أطباء، امتياز، التفكير السريري، medical simulation، intern doctors"
        />

        <meta
          property="og:title"
          content="Med Simulate | تدرّب على الحالات قبل أن تواجهها"
        />
        <meta
          property="og:description"
          content="منصّة محاكاة طبية تفاعلية لأطباء الامتياز - تدرّب على حالات واقعية بصوتك وقوّي تفكيرك السريري"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Med Simulate | تدرّب على الحالات قبل أن تواجهها"
        />
        <meta
          name="twitter:description"
          content="منصّة محاكاة طبية تفاعلية لأطباء الامتياز"
        />
      </Head>
      <body className={`font-cairo antialiased`}>
        <Providers>
          <NextIntlClientProvider>
            {children}
            <Footer />
            <Toaster richColors />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
