import { request, gql } from 'graphql-request';



let initializedPromise = false;

const posts = [];
const recentChallenges = [];
const currentChallenges = [];
const categories = [];


export function init(initPosts, challenges) {
  if (!initializedPromise) {
    console.log("initializing");
    initializedPromise = new Promise((resolve, reject) => {
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
      resolve();
    });

  }
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

export const getRecentPosts = async () => {
  await initializedPromise;
  var result = [];
  if(currentChallenges.length){
    const currentChallengesIds = currentChallenges.map(challenge => challenge.frontmatter.id)
    result = posts.filter((post => currentChallengesIds.includes(post.frontmatter.challenge)));
  }else{
    result = posts.filter(post => post.frontmatter.challenge === recentChallenges[recentChallenges.length-1])
  }
  return result;
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
  return author;
}

export const getPostsByCategories = async (categories) => {
  await initializedPromise;
  let selectedPosts = posts;
  selectedPosts = selectedPosts.filter((post) =>
    post.frontmatter.categories.some((category) => categories.includes(category))
  );
  return categories.length? selectedPosts:posts;
};

export const getPostsByChallenge = async (challenge) => {
  await initializedPromise;
  return posts.filter(post=>post.frontmatter.challenge===challenge.frontmatter.id)
}

export const submitComment = async (obj) => {
  
  return null;
};

export const getComments = async (slug) => {
  return null;
};

export const sortByDeepness = async (posts) => {
  await initializedPromise;

  let result = posts;
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}