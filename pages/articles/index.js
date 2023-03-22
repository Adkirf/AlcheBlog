import React, {useState, useEffect} from 'react';
import fs from "fs";
import matter from "gray-matter";


import { FeaturedPostCard, DraggableBar } from '../../components';

import {init, getCategories, getPostsByCategories, sortByDeepness} from "../../services";

export default function Home({posts, challenges}) {
  init(posts, challenges);

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState(posts);
  const [deepness, setDeepness] = useState(0);

  useEffect(() => {
    getCategories()
      .then((newAllCategories) => setAllCategories(newAllCategories));
  }, []);

  useEffect(() => {
    async function fetchSelectedPosts() {
      const newPosts = await getPostsByCategories(selectedCategories);
      const sortedPosts = await sortByDeepness(newPosts);
      setSelectedPosts(sortedPosts);
    }
    fetchSelectedPosts();
  }, [selectedCategories]);

  useEffect(()=>{
    async function fetchSortedPosts(){
      const sortedPosts = await sortByDeepness(selectedPosts);
      setSelectedPosts(sortedPosts);
    }
    fetchSortedPosts(selectedPosts);
  },[deepness])

  function handleClick(category) {
    setSelectedCategories(prevSelectedCategories => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter(cat => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  }

  
  
  const sortedCategories = [...selectedCategories, ...allCategories.filter((c) => !selectedCategories.includes(c))];

  return (
    <div className="container mx-auto px-10 mb-8">

      <div className="md:grid md:grid-cols-4 gap-4 md:gap-8 flex flex-col-reverse">
        <div className='grid col-span-3 lg:grid-cols-3 gap-2 md:grid-cols-2'> 
            {selectedPosts.map((post, index) => (
              <FeaturedPostCard key={index} post={post} />
            ))}
        </div>
        <div className="col-span-1 ">
          <div className="sticky relative top-8">
            <div className="bg-white shadow-lg rounded-lg p-4 pb-12 mb-8">
              <h3 className="text-xl mb-4 font-semibold border-b pb-2">Categories</h3>
              {sortedCategories?.map((category, index) => (
                <button onClick={()=>handleClick(category)} key={index} href="/">
                  <div className={`inline-block rounded-full pl-2 pr-2 mr-1 mb-1
                      ${(selectedCategories.includes(category))? 'bg-slate-400' : 'bg-white'}`}>
                        {category}
                      </div>
                </button>
              ))}
            </div>
            <DraggableBar setDeepness={setDeepness}/>

          </div>
        </div>
      </div>
    </div>
  );
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
