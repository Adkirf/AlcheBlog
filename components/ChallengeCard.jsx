import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Countdown from "./Countdown"


export function CurerntChallengeCard({challenge}){
  const dateInFuture = moment('2023-12-31', 'YYYY-MM-DD');
  console.log(moment());
  return (
    <Link  
    href={`/challenges/${challenge.slug}`} 
    key={challenge.frontmatter.id} 
    className="shadow-lg rounded-lg h-auto p-0 bg-slate-800"
    >
      <div className=" flex-col relative overflow-hidden h-auto shadow-md">
        <img src={challenge.frontmatter.banner} 
        alt={challenge.frontmatter.theme} 
        className="bg-slate-200 object-top relative w-full object-fit shadow-lg rounded-t-lg lg:rounded-lg mb-8"
        />
        <div className="flex-col flex-grow ml-4 relative flex z-10 mb-4 gap-2">
            <div className="font-medium text-gray-700">
              <Countdown classname="text-pink-500" date={challenge.frontmatter.endingDate} />
            </div>
            <p className="text-md text-gray-100">{challenge.frontmatter.theme}</p>
          </div>
      </div>
  </Link>
  )
}

export function AllChallengeCard({challenge}) {
  return (
    <Link  
      href={`/challenges/${challenge.slug}`} 
      key={challenge.frontmatter.id} 
      className="shadow-lg rounded-lg h-auto p-0 bg-slate-800"
      >
        <div className=" flex-col relative overflow-hidden h-auto shadow-md">
          <img src={challenge.frontmatter.banner} 
          alt={challenge.frontmatter.theme} 
          className="bg-slate-900 object-top relative w-full object-fit shadow-lg rounded-t-lg lg:rounded-lg mb-8"
          />
          <div className="flex-col flex-grow ml-4 relative flex z-10 mb-4 gap-2">
              <div className="font-medium text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle text-slate-300 font-bold">{moment(challenge.frontmatter.endingDate).format('MMM DD, YYYY')}</span>
              </div>
              <p className="text-md text-gray-100">{challenge.frontmatter.theme}</p>
            </div>
        </div>
    </Link>
  )
}
