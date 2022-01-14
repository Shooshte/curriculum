import Head from "next/head";
import UnderConstruction from "~/components/underConstruction";

import { getSortedPostsData } from "~/lib/posts";

interface PostType {
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
