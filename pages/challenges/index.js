import React, { useEffect, useState } from 'react';
import fs from "fs";
import matter from "gray-matter";

import Link from 'next/link';
import moment from "moment"

import {ChallengeCover, Countdown} from "../../components";
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
          <Link key={index} href={`/challenges/${challenge.slug}`}>
              <ChallengeCover key={index} challenge={challenge} />
              <div className='mt-4 '>
                <Countdown date={challenge.frontmatter.endingDate}/>
              </div>
          </Link>
          
            ))}
      </div>
      <h1 className="text-3xl mb-8 text-slate-800 cursor-default"> Recent Challenges</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12 mb-16">
        {recentChallenges?.map((challenge, index) => (
          <Link key={index} href={`/challenges/${challenge.slug}`}>
              <ChallengeCover key={index} challenge={challenge} />
              <div className="font-medium text-gray-900 mt-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle">{moment(challenge.frontmatter.endingDate).format('MMM DD, YYYY')}</span>
              </div>
          </Link>
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