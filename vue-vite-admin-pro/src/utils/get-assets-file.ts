export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
