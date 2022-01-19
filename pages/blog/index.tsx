import Head from "next/head";
import Link from "next/link";
import UnderConstruction from "~/components/underConstruction";

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
      <ul>
        {allPostsData.map(({ categories, date, id, title }) => (
          <li key={id}>
            <Link href={`blog/${id}`}>
              <h3>{title}</h3>
            </Link>
            <p>{categories}</p>
            <br />
            {new Date(date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <UnderConstruction></UnderConstruction>
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
