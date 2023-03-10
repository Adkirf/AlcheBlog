import React, {useState, useEffect} from 'react'
import Link from 'next/link';


import {getChallengeWinners} from "../services"
import { PostCarousel } from '@/sections';
import {Countdown} from "./"

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

const ChallengeHeader = ({challenge}) => {
    const [winners, setWinners] = useState([])

    useEffect(()=>{
        getChallengeWinners(challenge)
        .then((result) => {
            setWinners(result)
        })
    }, [])
  
    return (
        <div>
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