export function resolveBaseUrl() {
  if (__DEV__ && process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  return "https://med-simulate.com/api";
}
