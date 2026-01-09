export function resolveBaseUrl() {
  if (__DEV__ && process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  if (!process.env.EXPO_PUBLIC_PRODUCTION_API_URL) throw Error("Now Production URL");
  return process.env.EXPO_PUBLIC_PRODUCTION_API_URL;
}
