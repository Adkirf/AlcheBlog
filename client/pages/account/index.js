import fs from "fs";
import matter from "gray-matter";
import { useSession, signIn, signOut } from "next-auth/react"


import {init} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);
  const { data: session } = useSession()
    
  const handleSign = async () => {
    try{
      const res = await signIn();
    }catch(err){
      console.log(err)
    }
  }

  if (session) {
    return (
      <>
        Signed in as {session.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => handleSign()}>Sign in</button>
    </>
  )
}

export async function getStaticProps() {
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
      posts,
      challenges,
    },
  };
}