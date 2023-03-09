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


export const getFeaturedPosts = async () => {

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

  await initializedPromise;
  const winningIds =  allChallenges[allChallenges.length-1].frontmatter.winners;
  const winningArticles = allPosts.filter((post)=>winningIds.includes(post.frontmatter.id));
  return winningArticles;
};

export const getCurrentChallenges = async ()=> {

  await initializedPromise;
  return currentChallenges;
}

export const getChallengeWinners = async (challenge) =>{
  await initializedPromise;
  const winners = allPosts.filter((post)=>challenge.frontmatter.winners.includes(post.frontmatter.id))
  return winners;
}

export const getRelatedPosts = async (post) => {
  
  await initializedPromise;
  const challengeId = post.frontmatter.challenge;
  const similarPosts = allPosts.filter((post)=>post.frontmatter.challenge===challengeId);

  return similarPosts;
};

export const getPostsByCategories = async (categories) => {
  await initializedPromise;
  let selectedPosts = allPosts;
  selectedPosts = selectedPosts.filter((post) =>
    post.frontmatter.categories.some((category) => categories.includes(category))
  );
  return categories.length? selectedPosts:allPosts;
};

export const submitComment = async (obj) => {
  
  return null;
};

export const getComments = async (slug) => {
  return null;
};

