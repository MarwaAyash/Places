import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import Icon from "react-icons-kit";
import {spinner4} from 'react-icons-kit/icomoon';
import './Posts.css';

const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    if(!posts?.length && !isLoading) return 'No posts';
    return (
        isLoading ? <p>Loading... <Icon icon={spinner4} size={40}/></p> :(
            <div className="container-posts" container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <div className='div-container' key={post._id} item xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </div>
                ))}
            </div>
        )
        
    )
}


export default Posts