import {React, useState, useEffect} from 'react'
import Link from 'next/link';

import fs from "fs"
import matter from "gray-matter";

import {init, getChallengeWinners} from "../../services"
import { PostCarousel } from '@/sections';
import {ChallengeDetail, PostWidget, Countdown} from "../../components"


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
        .then((newWinners) => {
            setWinners(newWinners)
        })
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {winners &&  <PostCarousel posts={winners} responsive={responsive}/> }
                    <div className="text-center mt-4 pt-4 pb-4 relative rounded-lg bg-black bg-opacity-20">
                        {winners.length>0?(
                            <div> 
                                <h2 className='font-bold text-2xl text-slate-900 mb-8'> 🏆  Visit the Winners </h2>
                                {winners.map((winner,index)=>(
                                    <Link href={winner.frontmatter.authorLink} key={index} className='flex flex-row justify-center items-center mb-2'>
                                        <h2 className='text-bold text-xl text-pink-500 mr-2'>{index + 1}. </h2>
                                        <p className='text-bold text-lg text-white'> {winner.frontmatter.authorName}</p>
                                    </Link>
                                 ))}
                            </div>
                        ):(
                            <div>
                                 <h2 className='font-bold text-2xl text-slate-900 mb-4'> Time for Submissions </h2>
                                 <Countdown date={challenge.frontmatter.endingDate}/>
                            </div>
                        )}
                        
                    </div>
                </div>
            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative lg:top-8 ">
                    <ChallengeDetail challenge={challenge}/>
                </div>
            </div>
            <div className='lg:col-span-8 col-span-1'>
                <PostWidget getPosts={()=>getChallengeWinners(challenge)} widgetHeader="All Submissions"/>                
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