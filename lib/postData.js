const postData = {
  id: "test",
  content:
    "\n# This is a text blog post\n\n---\n\n![Photo of Miha Šušteršič](/public/images/ProfilePicture.png \"My weird face\")\n\n## Introduction\n\n### The why?\n\nI am writing this blog post in order to test how gray-matter parses mardown. I want to see what happens when:\n\n- I use blockquotes\n- I use unordered lists\n- I use ordered lists\n- I use a single line of code\n- I use code blocks\n- I use horizontal rules\n- I use external links\n- I use _semi-bold text_\n- I use **bold text**\n- I use **double underscores**\n- I link images\n\n`const singleLine = 'Single line of code'`\n\n```javascript\n// This is a comment about my code\nconst Foo = \"bar\";\nconst RandomFunction = () => {\n  // That renturns something\n  return Foo;\n};\n```\n\nJust [google it](http://google.com/)!\n\n### The what?\n\n> I am doing this not to further my own career,\n> but to boost the economy and create more jobs.\n>\n> > -- Miha Šušteršič\n\n1. Test blog post\n2. Full of weird .md syntax\n3. See how it's parsed\n4. See how it's rendered in the browser\n",
  data: {
    categories: "job search;employment",
    date: "2022-01-06",
    title: "Test blog post",
  },
  isEmpty: false,
  excerpt: "",
};
