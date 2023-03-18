import React,{useState,useEffect} from 'react';

import fs from "fs";
import matter from "gray-matter";

import { PostDetail, Author, PostWidget } from '../../components';
import { init, getRelatedPosts, getAuthor } from '../../services';

const PostDetails = ({ post, posts, challenges }) => {
  init(posts, challenges);
  const widgetHeader = ()=>{
    var header = "Realted Post: ";
    post.frontmatter.categories.map((category)=>{
      header += ` "${category}"`;
    });
    return header;
  };

  const [author, setAuthor] = useState({})
  
  useEffect(()=>{
    getAuthor(post)
      .then((result)=>{
        setAuthor(result);
      })
  },[])


  return (
    <>
      <div className="container mx-auto px-10 mb-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={author}/>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky ">
              <PostWidget getPosts={()=>getRelatedPosts(post)} widgetHeader={widgetHeader()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticPaths(){
    const files = fs.readdirSync("articles")

    const paths = files.map((fileName)=>({
        params: {
            slug: fileName.replace(".md", "")
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: {slug}}){
    
    const fileName = fs.readFileSync(`articles/${slug}.md`, "utf-8")
    const {data: frontmatter, content} = matter(fileName);
    const post = {frontmatter, content};
  
    const postFiles = fs.readdirSync("articles");
    const posts = postFiles.map((fileName) => {
        const slug = fileName.replace(".md", "");
        const readFile = fs.readFileSync(`articles/${fileName}`, "utf-8");
        const { data: frontmatter } = matter(readFile);

        return {
        slug,
        frontmatter,
        };
    });

    const challengeFiles = fs.readdirSync("challenges");
    const challenges = challengeFiles.map((fileName) => {
        const slug = fileName.replace(".md", "");
        const readFile = fs.readFileSync(`challenges/${fileName}`, "utf-8");
        const { data: frontmatter } = matter(readFile);

        return {
        slug,
        frontmatter,
        };
    });

    return {
        props: {
            post,
            posts,
            challenges
        }
    }
}