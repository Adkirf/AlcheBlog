import React from 'react'

const ChallengeCover = ({challenge}) =>{
    return (
      <div className="relative h-48">
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-contain shadow-md inline-block w-full h-48" style={{ backgroundImage: `url('../${challenge.frontmatter.banner}')` }} />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-48" />
      <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{challenge.frontmatter.theme}</p>
      </div>
    </div>
    )
  }



  export default ChallengeCover;

