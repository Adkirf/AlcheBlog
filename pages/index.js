import React from 'react';
import fs from "fs";
import matter from "gray-matter";

import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';

import {getRecentWinners, init} from "../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts /> 
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget getPosts={()=>getRecentWinners()} widgetHeader="Recent Winners" /> 
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
      challenges
    },
  };
}
