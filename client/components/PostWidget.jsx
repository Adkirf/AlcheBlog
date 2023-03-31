import moment from 'moment'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import {PostLink} from "."

const PostWidget = ({getPosts, widgetHeader}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(()=>{
    getPosts().then((result)=>setRelatedPosts(result))
  }, [getPosts])

 

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold">{widgetHeader}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4 border-b pb-2">
          {post.frontmatter.featuredImage&&
          <img 
            src={post.frontmatter.featuredImage}
            alt={post.frontmatter.title} 
            width={64}
            className="align-middle h-16 object-cover rounded-full"
          />}
        <PostLink post={post} />
        </div>
      ))}
    </div>
  )
}

export default PostWidget