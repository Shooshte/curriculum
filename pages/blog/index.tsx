import Head from "next/head";
import Link from "next/link";

import styles from "./blog.module.scss";
import BlogImage from "../../components/image";

import { getSortedPostsData } from "~/lib/posts";
import { PAGE_TITLE } from "../../constants";

interface PostType {
  categories?: string;
  date?: string;
  description?: string;
  id: string;
  imageUrl?: string;
  imageDescription?: string;
  title?: string;
}

interface PropsType {
  allPostsData: PostType[];
}

const parseCategories = (categoriesString: string): string[] => {
  return categoriesString.split(";");
};

const Blog = ({ allPostsData }: PropsType) => {
  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE}: Blog home`}</title>
        <meta
          name="description"
          content="Miha 'shooshte' Šušteršič's personal blog page. Focused on ReactJS, front-end, and software development, but may also include other topics and cat pictures."
        ></meta>
      </Head>
      <section className={styles.container} data-testid="blog-posts">
        <h2 className={`${styles.pageTitle} heading-2`}>Recent blog posts</h2>
        <ul>
          {allPostsData.map(
            ({
              categories,
              date,
              description,
              id,
              imageDescription,
              imageUrl,
              title,
            }) => {
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
                  <BlogImage
                    alt={imageDescription}
                    containerClassName={styles.imageContainer}
                    src={imageUrl}
                  />
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
