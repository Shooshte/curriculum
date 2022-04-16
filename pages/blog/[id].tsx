import Head from "next/head";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/rainbow.css";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import React, { useEffect } from "react";

import BlogImage from "../../components/image/";
import TableOfContents from "../../components/blog/tableOfContents";
import TwitterFooter from "../../components/blog/twitterFooter";

import styles from "./post.module.scss";

import { getAllPostIds, getPostData } from "../../lib/posts";
import { Heading, slugifyPostId } from "../../lib/string";

import { PAGE_TITLE } from "../../constants";

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

export interface PostDataType {
  content: string;
  data: {
    categories?: string;
    date?: string;
    description?: string;
    imageUrl?: string;
    imageDescription?: string;
    title?: string;
  };
  excerpt?: string;
  id: string;
  isEmpty: boolean;
  headings: Heading[];
}

interface PropsType {
  postData: PostDataType;
}

const PostWrapper = ({ children }) => (
  <section className={styles.wrapper} data-testid="post-content">
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
    img: {
      component: BlogImage,
      props: {
        containerClassName: styles.imageContainer,
      },
    },
    ul: {
      props: {
        className: "list",
      },
    },
    ol: {
      props: {
        className: "list",
      },
    },
    p: {
      props: { className: "text" },
      component: (props) => {
        return props.children.some(
          (child: JSX.Element) => child.type && child.type === BlogImage
        ) ? (
          <>{props.children}</>
        ) : (
          <p {...props} />
        );
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
    data: { description, imageUrl, title },
    id,
    headings,
  } = postData;

  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE}: ${title}`}</title>
        <meta name="description" content={description}></meta>

        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.shooshte.com/blog/${id}`}
        />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      <article className={styles.container}>
        <Markdown options={markdownOptions}>{content}</Markdown>
        <TableOfContents headings={headings} />
      </article>
    </>
  );
};

export default Post;
