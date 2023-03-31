import React from 'react'
import Link from 'next/link';
import moment from "moment";

import { ChallengeCover, Countdown } from '.'

const ChallengeCard = ({ challenge })=>{
var footer = <RecentFooter challenge={challenge}/>
if(challenge.frontmatter.winners.length===0){
    footer = <VoteFooter />
    const endingDate = new Date(challenge.frontmatter.endingDate)
    if(endingDate>new Date()){
        footer = <Countdown date={challenge.frontmatter.endingDate}/>
    }

}

    return (
        <div>
            <Link href={`/challenges/${challenge.slug}`} key={challenge.frontmatter.id}>
                <ChallengeCover challenge={challenge}/>
            </Link>
            <div className='mt-4 cursor-default'>
                {footer}
            </div>
        </div>
    )
}
const RecentFooter = ({challenge})=>{ 
    return(
        <div className="font-medium text-gray-900 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{moment(challenge.frontmatter.endingDate).format('MMM DD, YYYY')}</span>
        </div>
    )
}
const VoteFooter = () =>{
    return (
        <p className='text-bold text-center text-pink-500 text-3xl'>
            Voting
        </p>
    )
}


export default ChallengeCard