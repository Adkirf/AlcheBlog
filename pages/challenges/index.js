import React, { useEffect, useState } from 'react';
import fs from "fs";
import matter from "gray-matter";

import {AllChallengeCard, CurerntChallengeCard} from "@/components/ChallengeCard";
import {init, getChallenges} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  const [allChallenges, setAllChallenges] = useState([])
  const [currentChallenges, setCurrentChallenges] = useState([])

  useEffect(() => {
    getChallenges(true).then((newAllChallenges) => {
      setAllChallenges(newAllChallenges);
    });
    getChallenges(false).then((newCurrentChallenges)=>{
      setCurrentChallenges(newCurrentChallenges);
    })
  });

  return (
    <div className="container mx-auto px-10 mb-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 underline cursor-default">Current </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12 mb-16">
        {currentChallenges.map((challenge, index) => (
              <CurerntChallengeCard key={index} challenge={challenge} />
            ))}
      </div>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 underline cursor-default"> Recent </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12">
        {allChallenges.map((challenge, index) => (
              <AllChallengeCard key={index} challenge={challenge} />
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