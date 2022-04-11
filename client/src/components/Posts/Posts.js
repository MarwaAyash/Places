import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid} from '@material-ui/core';
import Icon from "react-icons-kit";
import {spinner4} from 'react-icons-kit/icomoon';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    console.log(posts);
    return (
        !posts.length ? <p>Loading... <Icon icon={spinner4} size={50}/></p> :(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
                ))}
            </Grid>
        )
        
    )
}


export default Posts