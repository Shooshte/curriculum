/// <reference types="cypress" />

import fs from "fs";
import path from "path";

import { getPostData } from "../../lib/posts";

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on) => {
  on("before:run", () => {
    // This writes all current posts data into fixtures to be used inside the blogPost.test.tsx file
    const postsDirectory = path.join(process.cwd(), "posts");
    const fileNames = fs.readdirSync(postsDirectory);

    const postsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return getPostData(id);
    });
    const fixturesDirectory = path.join(process.cwd(), "cypress/fixtures");
    return fs.writeFileSync(
      `${fixturesDirectory}/posts.json`,
      JSON.stringify(postsData)
    );
  });
};
