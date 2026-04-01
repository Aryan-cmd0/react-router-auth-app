import React,{useEffect, useState} from "react";
import { data } from "react-router-dom";

const Posts = ()=>{
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>res.json())
        .then((data)=>setPosts(data))
    },[])

    return(
        <div>
            <h1>Posts</h1>
            {posts.slice(0,10).map((post)=>{
                <div key={post.id}>
                    <h3>{post.titile}</h3>
                    <p>{post.body}</p>
                    <hr />
                </div>
            })}
        </div>
    )
}

export default Posts