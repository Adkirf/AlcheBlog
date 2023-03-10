import React, { useEffect, useState } from 'react';
import fs from "fs";
import matter from "gray-matter";

import Link from 'next/link';
import moment from "moment"

import {ChallengeCard} from "../../components";
import {init, getCurrentChallenges, getRecentChallenges} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  const [currentChallenges, setCurrentChallenges] = useState([])
  const [recentChallenges, setRecentChallenges] = useState([])

  useEffect(() => {
    
    getCurrentChallenges()
      .then((result)=>setCurrentChallenges(result))

    getRecentChallenges()
      .then((result)=>setRecentChallenges(result));
  });

  return (
    <div className="container mx-auto px-10 mb-8 h-auto">
      <h1 className="text-3xl mb-8 text-slate-800 cursor-default">Current Challanges: </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12 mb-16">
        {currentChallenges.map((challenge, index) => (
          <ChallengeCard key={challenge.frontmatter.id} challenge={challenge}/>
          ))}
      </div>
      <h1 className="text-3xl mb-8 text-slate-800 cursor-default"> Recent Challenges</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12 mb-16">
        {recentChallenges?.map((challenge, index) => (
          <ChallengeCard key={challenge.frontmatter.id} challenge={challenge}/>
        ))}
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
      challenges,
    },
  };
}