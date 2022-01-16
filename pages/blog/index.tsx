import Head from "next/head";
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
        <title>Blog - Miha Šušteršič</title>
      </Head>
      <ul>
        {allPostsData.map(({ categories, date, id, title }) => (
          <li key={id}>
            <h3>{title}</h3>
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
