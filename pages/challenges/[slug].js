import {React, useState, useEffect} from 'react'
import Link from 'next/link';

import fs from "fs"
import matter from "gray-matter";

import {init, getChallengeWinners, getPostsByChallenge} from "../../services"
import { PostCarousel } from '@/sections';
import {ChallengeDetail, PostWidget, Countdown,ChallengeHeader} from "../../components"


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

function ChallengeDetails({challenge, posts, challenges}) {
    init(posts, challenges);
    const [winners, setWinners] = useState([])

    useEffect(()=>{
        getChallengeWinners(challenge)
        .then((result) => {
            setWinners(result)
        })
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    <ChallengeHeader challenge={challenge}/>
                </div>
            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative lg:top-8 ">
                    <ChallengeDetail challenge={challenge}/>
                </div>
            </div>
            <div className='lg:col-span-8 col-span-1'>
                <PostWidget getPosts={()=>getPostsByChallenge(challenge)} widgetHeader="All Submissions"/>                
            </div>
        </div>
        </div>
    );
}

export default ChallengeDetails

// Fetch data at build time
export async function getStaticPaths(){
    const files = fs.readdirSync("challenges")

    const paths = files.map((fileName)=>({
        params: {
            slug: fileName.replace(".md", "")
        }
    }))
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params: {slug}}){

    const fileName = fs.readFileSync(`challenges/${slug}.md`, "utf-8")
    const {data: frontmatter, content} = matter(fileName);
    const challenge = {frontmatter, content};

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
            challenge,
            posts,
            challenges,
        }
    }
}