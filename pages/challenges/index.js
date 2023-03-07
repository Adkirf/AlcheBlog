import fs from "fs";
import matter from "gray-matter";

import {init} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  return (
    <div className="container mx-auto px-10 mb-8">
      This is the challenges page
    </div>
  );
}

export async function getStaticProps() {
  const postFiles = fs.readdirSync("articles");
  const posts = postFiles.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`articles/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  const challengeFiles = fs.readdirSync("challenges");
  const challenges = challengeFiles.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`challenges/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
      challenges,
    },
  };
}