const isBrowser = typeof window !== "undefined";

export default function isDocumentVisible(): boolean {
  if (isBrowser) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
