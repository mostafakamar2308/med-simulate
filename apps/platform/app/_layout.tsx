import { locales } from '@/locales';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import { IntlProvider } from 'react-intl';
import './index.css';

export default function RootLayout() {
  return (
    <IntlProvider locale="ar" messages={locales['ar']} defaultLocale="ar">
      <ClerkProvider tokenCache={tokenCache}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ClerkProvider>
    </IntlProvider>
  );
}
