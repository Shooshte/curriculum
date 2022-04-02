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

interface ReduceType {
  chaptersMap?: {
    string: Heading;
  };
  result: Heading[];
}

export const getHeadings = (content: string): Heading[] => {
  // extract all headings from a markdown string
  const HEADINGS_REGEX = /#{1,6}.+/g;

  const allHeadingsString = content.match(HEADINGS_REGEX);
  const parsedHeadings: ReduceType = allHeadingsString.reduce(
    ({ chaptersMap = {}, result }, heading) => {
      const { flag = "", content = "$missing header content$" } =
        /^(?<flag>#+)\s*(?<content>.*?)\s*$/.exec(heading)?.groups ?? {};
      const nestingLevel = flag.length;

      // ensure a valid `heading` format.
      if (nestingLevel > 1) {
        let chapters;
        if (nestingLevel === 2) {
          chaptersMap = {};
          chapters = result;
        } else {
          // create and/or access the nesting
          // level specific `chapters` array.
          chapters = chaptersMap[nestingLevel] ??= [];
        }
        // create a new chapter item.
        const chapterItem = { text: content, chapters: [] };

        // create or reassign the next level's `chapters` array.
        chaptersMap[nestingLevel + 1] = chapterItem.chapters;

        // push new item into the correct `chapters` array.
        chapters.push(chapterItem);
      }
      return { chaptersMap, result };
    },
    { chaptersMap: undefined, result: [] }
  );

  return parsedHeadings.result;
};
