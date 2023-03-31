import { useState } from "react"
import Button from '@mui/material/Button';



import { PostDetail, SubmissionMenu } from "."


const ChallengeSubmission = ({challenge, post, callBack}) => {
    const [submissionPost, setSubmissionPost] = useState(post)

    const handleChange=(target)=>{
        const newPost = JSON.parse(JSON.stringify(submissionPost))

        if(target.name==="textarea"){
            newPost.content = target.value
        }

        if(target.name==="featuredImage"){
            newPost.frontmatter.featuredImage=target.value;
        }

        if(target.name==="title"){
            newPost.frontmatter.title = target.value
        }
        setSubmissionPost(newPost)
    }

    return (
        <div className="px-5 text-gray-900 w-full md:max-w-3xl md:mx-auto">
          <h1 className="text-center">
            Markdown editor
          </h1>
          <article className="flex flex-col items-start justify-center rounded">
            <label htmlFor="markdown" className="">
              Your awsome Article
            </label>
            <textarea
              name="textarea"
              id="markdown"
              cols="30"
              rows="10"
              value={submissionPost.content}
              onChange={(e)=>{handleChange(e.target)}}
              className="pb-4 mb-4 pl-2 relative rounded-lg bg-black bg-opacity-20 w-full"
              placeholder="Type in something"
            ></textarea>
          </article>
          <div className="flex flex-col mb-8">
            <div className="">
                <label htmlFor="markdown" className="mb-3">
                Add the Link to your cover image
                </label>
                <textarea
                name="featuredImage"
                id="markdown"
                cols="1"
                rows="3"
                value={submissionPost.frontmatter.featuredImage}
                onChange={(e) => handleChange(e.target)}
                className="mb-2 pl-2 relative rounded-lg bg-black bg-opacity-20 w-full"
                ></textarea>
            </div>
            <div className="">
                <label htmlFor="markdown" className="">
                Add a title
                </label>
                <textarea
                name="title"
                id="markdown"
                cols="1"
                rows="1"
                value={submissionPost.frontmatter.title}
                onChange={(e) => handleChange(e.target)}
                className="pt-4 pb-4 pl-2 relative rounded-lg bg-black bg-opacity-20 w-full"
                ></textarea>
            </div>
          </div>
          <Button onClick={()=>{callBack(submissionPost)}} style={{ background:"#ff4081", marginBottom:"2rem"}} variant="contained">Continue</Button>
          <PostDetail post={submissionPost}/>
        </div>

    )
}

export default ChallengeSubmission
