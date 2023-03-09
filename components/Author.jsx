import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


const Author = ({ post }) => (
  <Link key={post.frontmatter.id} href="/" className='text-inherit'>
      {post.frontmatter.authorName}
  </Link>
);

export default Author