import React, {useEffect, useState} from "react"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import {useSession, signIn} from "next-auth/react"


import { ChallengeSubmission, FeaturedPostCard } from "."


const SubmissionMenu = ({challenge}) => {
    const {data: session} = useSession();
    const [post, setPost] = useState(null)
    const [savedPost, setSavedPost] = useState({})

    const updatePost = (newPost) => {
        setSavedPost(newPost)
        setPost(null)
    }
    const deletePost = () =>{
        const init =  {
            content:"",
            frontmatter:{
                author: "Adkirf",
                title: "Your awesome article title",
                featuredImage:  "https://assets-global.website-files.com/6171e9fea621c67e12b9f9be/6171e9fea621c6fc13b9faf9_Tw%20Profile%20Pic.png",
                date: new Date()
            }
        }
        setSavedPost(init)
        setPost(null)
    }
    const initPost = () => {
        const init =  {
            content:"",
            frontmatter:{
                author: session.name,
                title: "Your awesome article title",
                featuredImage:  "https://assets-global.website-files.com/6171e9fea621c67e12b9f9be/6171e9fea621c6fc13b9faf9_Tw%20Profile%20Pic.png",
                date: new Date()
            }
        }
        setPost(init)
    }

    const getButtons = ()=>{
        if(session){
            if(!post){
                if(savedPost.content){
                    return ( 
                        <div className="flex flex-col gap-2 w-full">
                            <FeaturedPostCard post={{...savedPost, slug:{}}}/>
                        <div className="flex flex-row justify-between ld:mr-40 ml-8 mr-8">
                            <Button onClick={()=>{setPost(savedPost)}} style={{ background:"#ff4081"}} variant="contained">Edit</Button>
                            <Button style={{ background:"#ff4081"}} variant="contained">Save as Draft</Button>
                            <Button onClick={deletePost} 
                            style={{ background:"#ff4081", color:"#ffffff"}} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button style={{ background:"#ff4081"}} variant="contained" endIcon={<SendIcon />}>
                            Submit
                          </Button>
                        </div>
                        </div>
                        )
                }
                return <div className="flex w-[80%] justify-around">
                    <Button onClick={()=>{initPost()}} style={{ background:"#ff4081"}} variant="contained">Writte new</Button>
                    <Button onClick={()=>{setPost(savedPost)}} style={{ background:"#ff4081"}} variant="contained">Alchebloger Import</Button>
    
                </div>
            }
            return <ChallengeSubmission challenge={challenge} post={post} callBack={updatePost}/>
        }
        return <Button onClick={signIn} style={{ background:"#ff4081"}} variant="contained">Sign in to Submit</Button>
        }



    return (
        <div className="flex lg:mt-16  mb-12">
           {getButtons()}
        </div>
    )
}

export default SubmissionMenu