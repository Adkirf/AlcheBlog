import React from 'react';
import Link from 'next/link';

const FeaturedPostCard = ({ post, rank }) => {
  return (
    <div className="relative h-72">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url(${post.frontmatter.featuredImage})` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.frontmatter.title}</p>
      <div className="flex items-center absolute bottom-2 w-full justify-start ml-2">
        {rank?(<span className=" border-2 font-bold border-pink-500 text-pink-500 text-lg rounded-full px-3 py-1 cursor-pointer">
            {rank}.
        </span>):("")}
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.frontmatter.author}</p>
      </div>
    </div>
    <Link href={post.slug}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
  )
}

export default FeaturedPostCard;