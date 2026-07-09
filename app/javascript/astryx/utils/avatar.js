export function withCacheBust(url) {
  if (!url) return null;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${Date.now()}`;
}
