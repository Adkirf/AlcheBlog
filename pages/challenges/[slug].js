import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from "fs"
import matter from "gray-matter";

import {init} from "../../services"

function ChallengeDetail({challenge, posts, challenges}) {
    init(posts,challenges); 
    return (
        <div className="wrapper">
          <MDXRemote {...challenge.mdxSource} />
        </div>
      )
}

export default ChallengeDetail

// Fetch data at build time
export async function getStaticPaths(){
    const files = fs.readdirSync("challenges")

    const paths = files.map((fileName)=>({
        params: {
            slug: fileName.replace(".mdx", "")
        }
    }))
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params: {slug}}){
    const fileName = fs.readFileSync(`challenges/${slug}.mdx`, "utf-8")
    const {data: frontmatter, content} = matter(fileName);
    const mdxSource = await serialize(content)
    const challenge = {frontmatter, mdxSource};

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
        const slug = fileName.replace(".mdx", "");
        const readFile = fs.readFileSync(`challenges/${fileName}`, "utf-8");
        const { data: frontmatter } = matter(readFile);

        return {
        slug,
        frontmatter,
        };
    });
    return {
        props: {
            challenge,
            posts,
            challenges
        }
    }
}