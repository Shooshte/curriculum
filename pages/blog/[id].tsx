import Head from "next/head";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import React, { useEffect } from "react";

import BlogSidebar from "../../components/blog/sidebar";
import TwitterFooter from "../../components/blog/twitterFooter";

import styles from "./post.module.scss";

import { getAllPostIds, getPostData } from "../../lib/posts";
import { slugifyPostId } from "../../lib/string";

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

interface PostDataType {
  content: string;
  data: {
    categories?: string;
    date?: string;
    description?: string;
    title?: string;
  };
  excerpt?: string;
  id: string;
  isEmpty: boolean;
  subheadings: string[];
}

interface PropsType {
  postData: PostDataType;
}

const PostWrapper = ({ children }) => (
  <section
    className={`${styles.wrapper} content-container`}
    data-testid="post-content"
  >
    {children}
    <TwitterFooter />
  </section>
);

const markdownOptions: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      props: {
        className: "heading-1",
      },
    },
    h2: {
      props: {
        className: "heading-2",
      },
    },
    h3: {
      props: {
        className: "heading-3",
      },
    },
    h4: {
      props: {
        className: "heading-4",
      },
    },
    h5: {
      props: {
        className: "heading-5",
      },
    },
    h6: {
      props: {
        className: "heading-6",
      },
    },
    p: {
      props: {
        className: "text",
      },
    },
    ul: {
      props: {
        className: "list",
      },
    },
  },
  slugify: (str) => slugifyPostId(str),
  wrapper: PostWrapper,
};

const Post = ({ postData }: PropsType) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.highlightAll();
  }, []);

  const {
    content,
    data: { description, title },
    subheadings,
  } = postData;

  return (
    <>
      <Head>
        <title>Miha Šušteršič: {title}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <article className={styles.container}>
        <BlogSidebar headings={subheadings} />
        <Markdown options={markdownOptions}>{content}</Markdown>
      </article>
    </>
  );
};

export default Post;
