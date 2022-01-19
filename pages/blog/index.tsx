import Head from "next/head";
import Link from "next/link";

import styles from "./blog.module.scss";

import { getSortedPostsData } from "~/lib/posts";

interface PostType {
  categories: string;
  id: string;
  date: string;
  title: string;
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
        <title>Miha Šušteršič: Blog</title>
        <meta
          name="description"
          content="Miha Šušteršič's personal blog page. Focused on ReactJS and front-end development but may also include other topics and cat pictures."
        ></meta>
      </Head>
      <section className={styles.container}>
        <h2 className="heading-2">Recent blog posts</h2>
        <ul>
          {allPostsData.map(({ categories, date, id, title }) => {
            const categoriesArray = parseCategories(categories);

            return (
              <li className={styles.blogItem} key={id}>
                <Link href={`blog/${id}`}>
                  <h3 className="heading-3 link">{title}</h3>
                </Link>
                <span className="label">
                  {new Date(date).toLocaleDateString()}
                </span>
                <br />
                <p className="text">
                  {categoriesArray.reduce((acc, category, index): string => {
                    return index === 0 ? category : `${acc}, ${category}`;
                  }, "")}
                </p>
              </li>
            );
          })}
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
