import Head from "next/head";
import Image from "next/image";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import React, { useEffect } from "react";

import styles from "./post.module.scss";

import { getAllPostIds, getPostData } from "../../lib/posts";

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
}

interface PropsType {
  postData: PostDataType;
}

const PostImage = (props) => {
  return (
    <div className={styles.blogImageContainer}>
      <Image {...props} />
    </div>
  );
};

const PostWrapper = ({ children }) => (
  <article className={styles.wrapper}>{children}</article>
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
      component: PostImage,
      props: {
        layout: "fill",
        objectFit: "contain",
        objectPosition: "left top",
        quality: 100,
        width: 500,
        priority: true,
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
  wrapper: PostWrapper,
};

const Post = ({
  postData: {
    content,
    data: { description, title },
  },
}: PropsType) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>Miha Šušteršič: {title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <Markdown options={markdownOptions}>{content}</Markdown>
    </>
  );
};

export default Post;
