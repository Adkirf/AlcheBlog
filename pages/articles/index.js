import React from 'react';
import fs from "fs";
import matter from "gray-matter";

import { FeaturedPostCard, Categories } from '../../components';

import {init} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="md:grid md:grid-cols-4 gap-4 flex flex-col-reverse">
        <div className='grid col-span-3 lg:grid-cols-3 gap-2 md:grid-cols-2'> 
            {posts.map((post, index) => (
              <FeaturedPostCard key={index} post={post} />
            ))}
        </div>
        <div className="col-span-1 ">
          <div className="sticky relative top-8">
            <Categories /> 
          </div>
        </div>
      </div>
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
    const slug = fileName.replace(".mdx", "");
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
