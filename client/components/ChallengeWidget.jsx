import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {getRecentChallenges} from '../services'

const ChallengeWidget = ({}) => {
  const [challenges, setChallenges] = useState([]);
  
  useEffect(()=>{
    getRecentChallenges()
      .then((newChallenges) => setChallenges(newChallenges))
  }, [])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold">Recent Challenges</h3>
        {challenges?.map((challenge, index) => (
          <Link key={index} href={`challenges/${challenge.slug}`}>
            <span className="cursor-pointer block ml-4 mr-4 border-b pb-3 mb-3">{challenge.frontmatter.theme}</span>
          </Link>
        ))}
    </div>
  )
}

export default ChallengeWidget