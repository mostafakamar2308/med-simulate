import { getRequestConfig } from 'next-intl/server';

import ar from '@/locales/ar.json';

export type LocalMap = Record<keyof typeof ar, keyof typeof ar>;

export type LocalId = keyof LocalMap;

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = 'ar';

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
