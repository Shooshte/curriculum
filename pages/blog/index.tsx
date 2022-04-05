import shave from "shave";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "./blog.module.scss";

import { getSortedPostsData } from "~/lib/posts";

import { PAGE_TITLE } from "../../constants";

interface PostType {
  categories?: string;
  date?: string;
  description?: string;
  id: string;
  imageUrl?: string;
  title?: string;
}

interface PropsType {
  allPostsData: PostType[];
}

const parseCategories = (categoriesString: string): string[] => {
  return categoriesString.split(";");
};

const Blog = ({ allPostsData }: PropsType) => {
  console.log("allPostsData: ", allPostsData);

  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE}: Blog home`}</title>
        <meta
          name="description"
          content="Miha 'shooshte' Šušteršič's personal blog page. Focused on ReactJS, front-end, and software development, but may also include other topics and cat pictures."
        ></meta>
      </Head>
      <section className={styles.container}>
        <h2 className={`${styles.pageTitle} heading-2`}>Recent blog posts</h2>
        <ul>
          {allPostsData.map(
            ({ categories, date, description, id, imageUrl, title }) => {
              console.group(title);
              console.log("description: ", description);
              console.groupEnd();
              const dateText = new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              });
              const categoriesArray = parseCategories(categories);
              const categoriesText = categoriesArray.reduce(
                (acc, category, index) => {
                  return index > 0
                    ? `${acc} - ${category}`
                    : `${acc}  |  ${category}`;
                },
                dateText
              );

              return (
                <li className={styles.blogItem} key={id}>
                  <Link href={`blog/${id}`} passHref={false}>
                    <h3
                      className={`heading-4 link ${styles.blogTitle}`}
                      id="blogTitle"
                    >
                      {title}
                    </h3>
                  </Link>
                  {imageUrl ? (
                    <div className={styles.imageContainer}>
                      <Image
                        alt={`blog post header`}
                        layout="fill"
                        objectFit="cover"
                        src={imageUrl}
                      />
                    </div>
                  ) : null}
                  <div className={styles.textContainer}>
                    <p
                      className={`text ${styles.description}`}
                      id="description"
                    >
                      {description}
                    </p>
                    <p className={styles.categories} id="categories">
                      {categoriesText}
                    </p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </section>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
