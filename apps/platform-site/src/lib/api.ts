export function resolveBaseUrl(): string {
  if (import.meta.env.PROD && import.meta.env.VITE_API_URL)
    return import.meta.env.VITE_API_URL;

  if (!import.meta.env.VITE_PROD_API_URL) throw Error("No Production URL");
  return import.meta.env.VITE_PROD_API_URL;
}
