import axios from "axios"




let initializedPromise = false;

const articles = [];
let allPosts = [];
const recentChallenges = [];
const currentChallenges = [];
const categories = [];


export function init(initPosts, challenges) {
  if (!initializedPromise) {
    initializedPromise = new Promise(async (resolve, reject) => {
      initPosts.forEach((post) => {
        post.postExtras = {}
        articles.push(post);
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
      const alcheBlogers = await axios.get(`http://localhost:8080/api/user`)
      const alchePosts = await Promise.all(alcheBlogers.data.map(async (bloger)=>{
        const tempPost = {frontmatter: {
          author: bloger.userName
        }}
      const slug = (await getBlogsByPost([tempPost]))[0];
      return bloger.categories.map((category)=>{
        if (!categories.includes(category[0])) {
          categories.push(category[0]);
        }
        const frontmatter = {
          author: bloger.userName,
          title: `This AlcheBloger wrote about ${category}`,
          featuredImage: "/../certificateLogo.png",
          categories: category
        }
        return  {frontmatter, slug}
      })
   
      }))
      allPosts.push(articles)
      allPosts.push(alchePosts.flat());
      allPosts = allPosts.flat();
      resolve();
    });

  }
}

export const getPosts = async() => {
  await initializedPromise;
  
 return allPosts;
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
    const post = articles.find((post)=> post.frontmatter.id==winningPost[i]);
    post.postExtras.rank = 1;
    featuredPosts.push(post);
  }

  return featuredPosts;
};

export const getRecentWinners = async () => {

  await initializedPromise;
  const winningIds =  recentChallenges[recentChallenges.length-1].frontmatter.winners;
  const winningArticles = articles.filter((post)=>winningIds.includes(post.frontmatter.id));
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
    result = articles.filter((post => currentChallengesIds.includes(post.frontmatter.challenge)));
  }else{
    result = articles.filter(post => post.frontmatter.challenge === recentChallenges[recentChallenges.length-1])
  }
  return result;
}

export const getChallengeWinnerPosts = async (challenge) =>{
  await initializedPromise;
  const winners = articles.filter((post)=>challenge.frontmatter.winners.includes(post.frontmatter.id))
  winners.map((post,index)=>{post.postExtras.rank=index+1})
  return winners;
}

export const getBlogsByPost = async (postsToBlog) =>{
  const result = await Promise.all(postsToBlog.map(async (post)=>{
    const res = await axios.get(`http://localhost:8080/api/user/blog/${post.frontmatter.author}`)
    return res.data;
  }));
  return result;
}

export const getChallengeByPost = async (post) =>{
  await initializedPromise;
  
  const postChallenge = recentChallenges.find(challenge => challenge.frontmatter.winners.includes(post.frontmatter.id))
  return postChallenge;
}

export const getRelatedPosts = async (post) => {
  
  await initializedPromise;
  const challengeId = post.frontmatter.challenge;
  const similarPosts = articles.filter((post)=>post.frontmatter.challenge===challengeId);

  return similarPosts;
};

export const getAuthor = async (post)=> {
  const resUser = await axios.get(`http://localhost:8080/api/user/${post.frontmatter.author}`)
  return resUser.data;
}

export const getPostsByCategories = async (categories) => {
  await initializedPromise;
  let selectedPosts = allPosts;
  selectedPosts = selectedPosts.filter((post) =>
    post.frontmatter.categories.some((category) => categories.includes(category))
  );
  return categories.length? selectedPosts:allPosts;
};

export const getParticipants = async (challenge) => {
  await initializedPromise;
  const users = (await axios.get(`http://localhost:8080/api/user`)).data
  const participantsRaw = users.filter((user)=>{
    return challenge.frontmatter.participants.includes(user.userName);
  })
  const participantsPost = Promise.all(participantsRaw.map(async (participant)=>{
    const submission = participant.submissions.find((submission)=>submission[0].challengeId===challenge.frontmatter.id)
    const frontmatter = {
      author: participant.userName,
      title: submission[0].articleTitle,
    }
    return {frontmatter}
  }))
  return participantsPost;
}

export const sortByDeepness = async (posts) => {
  await initializedPromise;

  let result = posts;
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}