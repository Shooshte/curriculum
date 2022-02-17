import Head from "next/head";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import React, { useEffect, useMemo } from "react";

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
    imageUrl?: string;
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

  const postSlug = useMemo(() => {
    return slugifyPostId(postData.id);
  }, [postData.id]);

  const {
    content,
    data: { description, imageUrl, title },
    subheadings,
  } = postData;

  return (
    <>
      <Head>
        <title>Miha Šušteršič: {title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.shooshte.com/blog/${postSlug}`}
        />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      <article className={styles.container}>
        <BlogSidebar headings={subheadings} />
        <Markdown options={markdownOptions}>{content}</Markdown>
      </article>
    </>
  );
};

export default Post;
