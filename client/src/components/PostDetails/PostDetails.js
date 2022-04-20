import React, { useEffect } from 'react';
import { Typography, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import './PostDetails.css';


const Post = () => {
    const { post, posts} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
        dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) =>navigate(`/posts/${_id}`);


    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <div >
        <div className='recommendedPosts'>
            <div className='imageSection'>
                <img width={500} src={post.selectedFile } alt={post.title} />
                <h4 variant="body1">{moment(post.createdAt).fromNow()}</h4>
                <h4 variant="h6">Created by: {post.name}</h4>
                </div>
                <div className='section'>
                <h3 variant="h3" component="h2">{post.title}</h3>
                <h4  color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</h4>
                <h3 className='messageDetail' component="p">{post.message}</h3>
                </div>
            
        </div>
        <hr/>
        <br/>
        {!!recommendedPosts.length && (
            <div className='section'>
            <b gutterBottom variant="h5">You might also like:</b>
            
            <div className='recommendedPosts'>
                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    
                    <img src={selectedFile} width="400px" />
                    <h3 gutterBottom variant="h4">{title}</h3>
                    <h4 gutterBottom variant="subtitle2">{name}</h4>
                    <h2 className='messageDetail' gutterBottom variant="subtitle2">{message}</h2>
                    <h5 gutterBottom variant="subtitle1">Likes: {likes.length}</h5>
                    <hr/>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
};

export default Post;