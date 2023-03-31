import React from 'react'
import Link from "next/link"

import { getBlogsByPost } from "../services"


function PostLink({post}) {

    async function handleClick(post) {
        console.log(post)
        const slug = (await getBlogsByPost([post]))[0];
        window.location.href = slug;
        
      }

  return (
    <div className="flex-grow ml-4">
        {post.slug && 
        <Link href={post.slug}>
        {post.frontmatter.title}
        </Link>}
        {!post.slug &&  
        <button onClick={()=>handleClick(post)}>{post.frontmatter.title}</button>
        }
    </div>
  )
}

export default PostLink