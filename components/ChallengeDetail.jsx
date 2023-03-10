import React, {useState,useEffect} from 'react'

import { ChallengeCover } from '.'

const ChallengeDetail = ({challenge}) => {

  return (
    <>
    <div className="relative bg-white shadow-lg rounded-lg lg:p-8 pb-12 overflow-hidden">
      <ChallengeCover challenge={challenge}/>
      {challenge.content}
    </div>

  </>
  )
}

export default ChallengeDetail