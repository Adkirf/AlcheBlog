import { request, gql } from 'graphql-request';

let initializedPromise = null;

const allPosts = [];
const allChallenges = [];
const currentChallenges = [];
const allCategories = [];

export function init(posts, challenges){
  if(!initializedPromise){
    initializedPromise = new Promise((resolve, reject) => {
      posts.map((post)=>{
        allPosts.push(post);
        post.frontmatter.categories.map((category)=>{
          if(!allCategories.includes(category)){
            allCategories.push(category);
          }
        })
      });
      challenges.map((challenge)=>{
        if(challenge.frontmatter.winners.length>0){
          allChallenges.push(challenge);
        }else{
          currentChallenges.push(challenge);
        }
      })
      resolve(); 
    });
  }
  
}
  
export const getCategories = async () => {
  

  await initializedPromise;
  return allCategories;
};


export const getPosts = async ()=> {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;
  return allPosts;
}

export const getFeaturedPosts = async () => {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;
  const winningPost = [];
  allChallenges.map((challenge)=>{
    winningPost.push(challenge.frontmatter.winners[0]);
  })
  const featuredPosts = [];
  for(let i=0;i<winningPost.length;i++){
    featuredPosts.push(allPosts.find((post)=> post.frontmatter.id==winningPost[i]));
  }
  return featuredPosts;
};

export const getRecentWinners = async () => {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;
  const winningIds =  allChallenges[allChallenges.length-1].frontmatter.winners;
  const winningArticles = allPosts.filter((post)=>winningIds.includes(post.frontmatter.id));
  return winningArticles;
};

export const getChallenges = async (isAll)=> {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;
  if(isAll){
    return allChallenges;
  }
  return currentChallenges;
}

export const getPostDetails = async (slug) => {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;

  return null;
};

export const getSimilarPosts = async (post) => {
  if (!initializedPromise) {
    throw new Error('Service not initialized');
  }

  await initializedPromise;
  const challengeId = post.frontmatter.challenge;
  const similarPosts = allPosts.filter((post)=>post.frontmatter.challenge===challengeId);

  return similarPosts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  
  return null;
};

export const getCategoryPost = async (slug) => {
  
  return null;
};


export const submitComment = async (obj) => {
  
  return null;
};

export const getComments = async (slug) => {
  return null;
};

