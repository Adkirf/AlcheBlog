import React, {useState,useEffect} from 'react'
import ReactMarkdown from 'react-markdown'

import moment from "moment"

import { ChallengeCover } from '.'

import { getParticipants } from "../services"

const ChallengeDetail = ({challenge}) => {
  const [submissions, setSubmissions] = useState("0")

  useEffect(()=>{
    
    getParticipants(challenge)
      .then(result=>setSubmissions(result.length));
  },[]
  );




  return (
    <>
    <div className="relative bg-slate-800 shadow-lg rounded-lg overflow-hidden cursor-default text-white ">
      <ChallengeCover challenge={challenge}/>
      <div className="px-4 pb-8 lg:px-0">
          <div className='mt-2 ml-2 mb-2'> 
              <span className='text-xl text-pink-500 mr-2'> {submissions} </span> Submissions
          </div>
          <div className='flex direction-row mb-8'>
            <div className="flex font-medium text-white ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(challenge.frontmatter.startingDate).format('MMM DD, YYYY')} - </span>
              <span className="align-middle ml-1">{moment(challenge.frontmatter.endingDate).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-semibold">{challenge.frontmatter.description}</h1>
          {challenge.content.split(/\r?\n/).map((paragraph,index)=>{
            return(paragraph===""?<br key={index}/>:<ReactMarkdown key={index}>{paragraph}</ReactMarkdown>)
          })}
      </div>
    </div>

  </>
  )
}

export default ChallengeDetail