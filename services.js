import { request, gql } from 'graphql-request';

let initializedPromise = false;

const posts = [];
const recentChallenges = [];
const currentChallenges = [];
const categories = [];

export function isInit(){
  return initializedPromise;
}

export function init(initPosts, challenges) {
  if (!initializedPromise) {
    console.log("initializing");
    new Promise((resolve, reject) => {
      initPosts.forEach((post) => {
        post.postExtras = {};
        posts.push(post);
        post.frontmatter.categories.forEach((category) => {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        });
      });
      challenges.forEach((challenge) => {
        if (challenge.frontmatter.winners.length > 0) {
          recentChallenges.push(challenge);
        } else {
          currentChallenges.push(challenge);
        }
      });
      resolve(initializedPromise=true);
    });

  }
}

export function getPost(slug){
  if(!initializedPromise){
    throw new Error("not initialized");
  }
  const post =posts.find((post)=> post.slug == slug);
  return post;
}
export function getPosts(){
  if(!initializedPromise){
    throw new Error("not initialized");
  }
  return posts;
}
export function getChallenges(){
  if(!initializedPromise){
    throw new Error("not initialized");
  }
  return [...currentChallenges,...recentChallenges];
}


export const getPostExtras = async (post) => {
  await initializedPromise;
  return new Promise(async (resolve)=>{
    if(!post.postExtras){
      post.postExtras = {};
    }
    if(!post.postExtras.challenge){

      var postChallenge = recentChallenges.find(challenge => challenge.frontmatter.id === post.frontmatter.challenge)
      if(!postChallenge)(
        postChallenge = currentChallenges.find(challenge => challenge.frontmatter.id === post.frontmatter.challenge)
      )
      post.postExtras.challenge = postChallenge;
    }

    resolve(post);
  })
}

export const getCategories = async () => {
  await initializedPromise;

  return categories;
};

export const getFeaturedPosts = async () => {

  await initializedPromise;
  const winningPost = [];
  recentChallenges.map((challenge)=>{
    winningPost.push(challenge.frontmatter.winners[0]);
  })
  const featuredPosts = [];
  for(let i=0;i<winningPost.length;i++){
    const post = posts.find((post)=> post.frontmatter.id==winningPost[i]);
    post.postExtras.rank = 1;
    featuredPosts.push(post);
  }

  return featuredPosts;
};

export const getRecentWinners = async () => {

  await initializedPromise;
  const winningIds =  recentChallenges[recentChallenges.length-1].frontmatter.winners;
  const winningArticles = posts.filter((post)=>winningIds.includes(post.frontmatter.id));
  return winningArticles;
};

export const getCurrentChallenges = async ()=> {

  await initializedPromise;
  return currentChallenges;
}

export const getRecentChallenges = async () => {
  await initializedPromise;
  return recentChallenges;
}

export const getChallengeWinners = async (challenge) =>{
  await initializedPromise;
  const winners = posts.filter((post)=>challenge.frontmatter.winners.includes(post.frontmatter.id))
  winners.map((post,index)=>{post.postExtras.rank=index+1})
  return winners;
}

export const getRelatedPosts = async (post) => {
  
  await initializedPromise;
  const challengeId = post.frontmatter.challenge;
  const similarPosts = posts.filter((post)=>post.frontmatter.challenge===challengeId);

  return similarPosts;
};

export const getAuthor = async (post)=> {
  await initializedPromise;

  const authorName = post.frontmatter.authorName;
  const authorLink = post.frontmatter.authorLink;
  const authorPosts = posts.filter((authorPost)=>authorPost.frontmatter.authorName===post.frontmatter.authorName)
  
  const authorPostsIds = [];
  authorPosts.map((post)=>{
    authorPostsIds.push(post.frontmatter.id);
  })

  var authorWins = 0;
  recentChallenges.map((challenge)=>{
    if(challenge.frontmatter.winners.some((winnerId)=> authorPostsIds.includes(winnerId))){
      authorWins += 1;
    }
  })
  const author = {
    name: authorName, 
    link: authorLink, 
    posts: authorPosts,
    wins: authorWins
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(author);
    }, 2000);
  });
}

export const getPostsByCategories = async (categories) => {
  await initializedPromise;
  let selectedPosts = posts;
  selectedPosts = selectedPosts.filter((post) =>
    post.frontmatter.categories.some((category) => categories.includes(category))
  );
  return categories.length? selectedPosts:posts;
};

export const submitComment = async (obj) => {
  
  return null;
};

export const getComments = async (slug) => {
  return null;
};

