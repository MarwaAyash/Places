import React from 'react';
import Icon from "react-icons-kit";
import {trashB} from 'react-icons-kit/ionicons/trashB';
import {thumbsUp} from 'react-icons-kit/typicons/thumbsUp'
import {kebabHorizontal} from 'react-icons-kit/oct/kebabHorizontal';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import './Post.css';

import moment from 'moment';

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
            if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                <><Icon icon={thumbsUp} size={20}/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                <><Icon icon={thumbsUp} size={20}/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
            }
        
            return <><Icon icon={thumbsUp} size={20}/>&nbsp;Like</>;
    };

    
    return (
        <div className="card">
            <img className='media' src={post.selectedFile} title={post.title} />
            <div className="overlay">
                <h3 >{post.name}</h3>
                <h4>{moment(post.createdAt).fromNow()}</h4>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className="overlay2">
                <button className='buttonEdit' style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><Icon icon={kebabHorizontal} size={20}/></button>
            </div>
            )}
            <h2 className="title" gutterbottom variant="h5" component="h2">{post.title}</h2>
            <div className="details">
                <p className='tag' variant="body2" size='30' component="h2">{post.tags.map((tag) => `#${tag} `)}</p>
            </div>
            
            <div className='message-div'>
                <p className='message' variant="body2" color="textSecondary" component="p">{post.message}</p>
            </div>
            <div className="cardActions">
            <button  className='btnLike' size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                <Likes />
            </button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <button className='btnDelete' size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><Icon icon={trashB} size={20}/> Delete</button>
            )}
                
            </div>
            
        </div>
    )
}

export default Post