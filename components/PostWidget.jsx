import moment from 'moment'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

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
          <img 
            src={`../${post.frontmatter.featuredImage}`} 
            alt={post.frontmatter.title} 
            height={60}
            width={60}
            className="align-middle h-fit rounded-full"
            />
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.frontmatter.endingDate).format('MMM DD, YYYY')}</p>
            <Link href={`/articles/${post.slug}`} className="text-md" key={index}>{post.frontmatter.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget