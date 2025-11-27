import { NAV_THEME } from '@/lib/theme';
import { locales } from '@/locales';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { IntlProvider } from 'react-intl';
import './index.css';

export default function RootLayout() {
  return (
    <IntlProvider locale="ar" messages={locales['ar']} defaultLocale="ar">
      <ClerkProvider tokenCache={tokenCache}>
        <ThemeProvider value={NAV_THEME['dark']}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <PortalHost />
        </ThemeProvider>
      </ClerkProvider>
    </IntlProvider>
  );
}
