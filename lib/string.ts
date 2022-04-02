export const slugifyPostId = (str: string): string => {
  return str.trim().replace(/\s/g, "_");
};

const countHastags = (input: string): number => {
  let hashTagsCount = 0;
  let stopCount = false;
  for (let x = 0, length = input.length; x < length; x++) {
    var isHashTag = input.charAt(x) === "#";
    if (isHashTag && !stopCount) {
      hashTagsCount = hashTagsCount + 1;
    } else {
      stopCount = true;
    }
  }
  return hashTagsCount;
};

export interface Heading {
  chapters: Heading[];
  text: string;
}

export const getHeadings = (content: string): Heading[] => {
  // extract all headings from a markdown string
  const HEADINGS_REGEX = /#{1,6}.+/g;

  let headingLevel = 2;
  let headingIndex = 0;
  const allHeadings = content
    .match(HEADINGS_REGEX)
    .reduce((acc, currentHeading) => {
      const hashTagsCount = countHastags(currentHeading);

      // ignore the main heading
      if (hashTagsCount === 1) {
        return acc;
      }

      const sanitizedHeading = currentHeading.replace(/#/g, "").trim();
      const heading = {
        chapters: [],
        text: sanitizedHeading,
      };

      if (hashTagsCount === headingLevel) {
        headingIndex = headingIndex + 1;
      } else {
        headingIndex = 0;
      }

      headingLevel = hashTagsCount;
      if (hashTagsCount === 2) {
        acc.push(heading);
        // We only support one level of subheadings at the moment
      } else if (hashTagsCount === 3) {
        if (acc.length === 0) {
          return acc;
        }
        if (acc.length > 0) {
          acc[acc.length - 1]["chapters"].push(heading);
        }
      } else {
        acc[acc.length - 1]["chapters"][headingIndex]["chapters"].push(heading);
      }
      return acc;
    }, []);
  // group headings by level
  // nest headings by level and remove hashtags
  return allHeadings;
};
