/// <reference types="cypress" />

import fs from "fs";
import path from "path";

import { getSortedPostsData } from "../../lib/posts";

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on) => {
  on("before:run", () => {
    // This writes all current posts data into fixtures to be used inside the blogPost.test.tsx file
    const postsData = getSortedPostsData();
    const fixturesDirectory = path.join(process.cwd(), "cypress/fixtures");

    return fs.writeFileSync(
      `${fixturesDirectory}/posts.json`,
      JSON.stringify(postsData)
    );
  });
};
