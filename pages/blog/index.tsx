import Head from "next/head";
import Link from "next/link";

import styles from "./blog.module.scss";

import { getSortedPostsData } from "~/lib/posts";

interface PostType {
  categories?: string;
  date?: string;
  description?: string;
  id: string;
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
        <title>Miha Šušteršič: Blog</title>
        <meta
          name="description"
          content="Miha Šušteršič's personal blog page. Focused on ReactJS and front-end development but may also include other topics and cat pictures."
        ></meta>
      </Head>
      <section className={styles.container}>
        <h2 className="heading-2">Recent blog posts</h2>
        <ul>
          {allPostsData.map(({ categories, date, description, id, title }) => {
            const categoriesArray = parseCategories(categories);

            return (
              <li className={styles.blogItem} key={id}>
                <Link href={`blog/${id}`} passHref={true}>
                  <h3 className="heading-3 link">{title}</h3>
                </Link>
                <div className={styles.categories}>
                  {categoriesArray.map((category, index) => (
                    <div key={`${category}-${index}`} className="pill">
                      {category}
                    </div>
                  ))}
                </div>
                <p className="text">{description}</p>
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
