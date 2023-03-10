import React, {useState, useEffect} from 'react';
import moment from 'moment';

import md from "markdown-it"
import Link from 'next/link';

import {getAuthor, getPostExtras} from "../services"
import {Author} from "./index"

const PostDetail = ({ post }) => {
  const [author, setAuthor] = useState({})
  const [openPost, setPostExtras] = useState({post})
  useEffect(()=>{
    getAuthor(post)
      .then((result)=>{
        setAuthor(result)
      })
    getPostExtras(post)
      .then((result)=>{
        setPostExtras(result)
      })
  },[])
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-4 cursor-default">
        <div className="relative overflow-hidden shadow-md mb-8">
          <img src={`../${post.frontmatter.featuredImage}`} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <h2 className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.frontmatter.authorName}</h2>
            </div>
            <div className="font-medium text-gray-700 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.frontmatter.date).format('MMM DD, YYYY')}</span>
            </div>
            {openPost.postExtras?(
              <Link href={`../challenges/${openPost.postExtras.challenge.slug}`} className="flex flex-row grow justify-center	bg-pink">
              <h2 className="">{openPost.postExtras.challenge?` ${openPost.postExtras.challenge.frontmatter.theme}  `:""}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"  />
                </svg>
              </Link>):""}
                
          
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{__html:md().render(post.content)}}>
            </div>
        </div>
      </div>
      <Author author={author} />
    </>
  );
};

export default PostDetail;