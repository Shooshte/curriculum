export const slugifyPostId = (str: string): string => {
  return str.replace(/\s/g, "_");
};

export const getSubheadings = (content: string): string[] => {
  // extract all h2 (##) from a mardown text string
  const HEADINGS_REGEX = /#{2}.+/g;
  const headings = content.match(HEADINGS_REGEX).map((heading, index) => {
    return heading.replace(/##\s/, "");
  });
  return headings;
};
