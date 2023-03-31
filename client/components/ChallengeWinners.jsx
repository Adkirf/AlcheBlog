import React, {useState, useEffect} from 'react'
import Link from 'next/link';


import {getChallengeWinnerPosts, getBlogsByPost} from "../services"
import { PostCarousel } from '@/sections';
import {Countdown} from "."

const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 768 },
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

const ChallengeHeader = ({challenge}) => {
    const [winners, setWinners] = useState(null)

    useEffect(()=>{
      const initChallenge = async ()=>{
        const posts = await getChallengeWinnerPosts(challenge);
        const blogs = await getBlogsByPost(posts);
        setWinners({posts, blogs})

      }
      initChallenge();
    }, [])
  
    return (
        <div>
        {winners &&  <PostCarousel posts={winners.posts} responsive={responsive}/> }
        <div className="text-center pt-4 pb-4 mb-16 relative rounded-lg bg-black bg-opacity-20">
            {winners?(
                <div> 
                    <h2 className='font-bold text-2xl text-slate-900 mb-2'> 🏆  Visit the Winners </h2>
                    {winners.blogs?.map((winnerBlog,index)=>(
                        <Link href={winnerBlog} key={index} className='flex flex-row justify-center items-center mb-2'>
                            <h2 className='text-bold text-xl text-pink-500 mr-2'>{index + 1}. </h2>
                            <p className='text-bold text-lg text-white'> {winners.posts[index].frontmatter.author}</p>
                        </Link>
                     ))}
                </div>
            ):(
                <div>
                     <h2 className='font-bold text-2xl text-slate-900 mb-4'> Time for Submissions </h2>
                     {new Date(challenge.frontmatter.endingDate) > new Date() ? 
                        (<Countdown date={challenge.frontmatter.endingDate}/>)
                        : (<h2 className='text-xl font-bold text-pink-500'> Voting... </h2>)
                     }
                     
                </div>
            )}
            
        </div>
        </div>
  )
}

export default ChallengeHeader