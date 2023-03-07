import moment from 'moment'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import {getRecentWinners, getSimilarPosts} from '../services'


const PostWidget = ({clickedPost}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(()=>{
    if(clickedPost){
      getSimilarPosts(clickedPost)
        .then((result)=>setRelatedPosts(result))
    }else{
      getRecentWinners()
        .then((result)=>setRelatedPosts(result))
    }
  }, [clickedPost])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{clickedPost ? 'Related Posts' : 'Last Winners'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <img 
            src={`../${post.frontmatter.featuredImage}`} 
            alt={post.frontmatter.title} 
            height="60px"
            width="60px"
            className="align-middle rounded-full"
            />
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.frontmatter.date).format('MMM DD, YYYY')}</p>
            <Link href={`/articles/${post.slug}`} className="text-md" key={index}>{post.frontmatter.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget