import React, {useState, useEffect} from 'react';
import fs from "fs";
import matter from "gray-matter";

import { PostCarousel } from '../sections/index';
import { PostCard, ChallengeWidget, PostWidget } from '../components';

import {init, getRecentWinners, getFeaturedPosts} from "../services";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};


export default function Home({posts, challenges}) {
  init(posts, challenges);
  const [featuredPosts, setFeaturedPosts] = useState([])

  useEffect(() => {
    getFeaturedPosts() 
      .then((result)=>{
        setFeaturedPosts(result)
      })
  }, [])
  

  return (
    <div className="container mx-auto px-10 mb-8">
      {featuredPosts &&  <PostCarousel posts={featuredPosts} responsive={responsive}/> }
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget getPosts={()=>getRecentWinners()} widgetHeader="Recent Winners" /> 
            <ChallengeWidget /> 
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
