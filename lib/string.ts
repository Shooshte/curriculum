export const slugifyPostId = (str: string): string => {
  return str.replace(/\s/g, "_");
};
