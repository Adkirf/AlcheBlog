import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


const Author = ({ author }) => {
  if (!author || Object.keys(author).length === 0) {
    return null;
  }
  return ( 
    <div className="text-center pt-4 pb-4 relative rounded-lg bg-black bg-opacity-20 mb-4 cursor-default">
      <h2 className='font-bold text-2xl text-slate-900 mb-8'> About {author.name} </h2>
      <div className='flex flex-row justify-center ml-4 gap-8'>
        <h2 className='font-bold'> Submissions: {author.posts.length}</h2>
        <h2 className='font-bold'> Wins: {author.wins}</h2>
        <Link href={author.link} className="font-bold italic"> Visit personal blog </Link>
      </div>
    </div>
  )
};

export default Author