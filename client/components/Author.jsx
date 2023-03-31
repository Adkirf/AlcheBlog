import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import moment from 'moment';
import Link from "next/link"



import { getAuthor, getBlogsByPost } from "../services"

const Author = ({ post }) => {  
  const [author, setAuthor] = useState(null)
  const [authorBlog, setauthorBlog] = useState(null)

  useEffect(()=>{
    getAuthor(post)
      .then((result)=>{
        setAuthor(result);
      })
   getBlogsByPost([post])
      .then((result)=>{
        setauthorBlog(result[0])
      })
  },[])


  const getWins = ()=>{
    let wins = 0;
    author.submissions.forEach((submission)=>{
      if(submission[0].postId>0){
        wins +=1;
      }
    });
    return wins;
  }

  const getDaysSince = (sinceDate)=> {
    const since = new Date(sinceDate);
    const today = new Date();
    const timeDiff = today.getTime() - since.getTime();
    return  Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  return (
    author
    ?<div className='mb-24'>
      {authorBlog&&
        <div className='flex w-full h-full items-center justify-center'>
        <Link href={authorBlog} className="flex flex-row gap-2 justify-center items-center	bg-pink">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"  />
          </svg>
        <h2 className="text-2xl">{author.userName}</h2>
        </Link>
        </div>
      }
      <div className='relative flex flex-col items-center justify-center pt-2 pb-2 h-auto w-full shadow-md shadow-pink-500 rounded-xl group hover:bg-gradient-to-r from-pink-500 to-[#709dff]'>
          <Image 
              className='transition duration-700 group-hover:opacity-10 '
              src="/../certificateLogo.png"
              alt="/"
              width={300}
              height={300}
              unoptimized
          />
          <div className='hidden group-hover:flex flex-col justify-center items-center absolute '>
              <h3 className='text-2xl text-white tracking-widest text-center'>Wins: {getWins()}</h3>
              <p className='pb-4 pt-2 text-white text-center'>Submissions: {author.submissions.length}</p>
              <p className='pb-4 pt-2 text-white text-center'>Member since: {moment(author.createdAt).format('MMM DD, YYYY')}</p>   
              <p className='pb-4 pt-2 text-white text-center'>last update: {getDaysSince(author.updatedAt)}d ago </p>   
          </div>
      </div>
    </div>
    :<div>
      Loading Auhtor...
    </div>
  )
};

export default Author