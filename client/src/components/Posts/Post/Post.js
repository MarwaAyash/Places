import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Icon from "react-icons-kit";
import {trashB} from 'react-icons-kit/ionicons/trashB';
import {thumbsUp} from 'react-icons-kit/typicons/thumbsUp'
import {kebabHorizontal} from 'react-icons-kit/oct/kebabHorizontal';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import moment from 'moment';

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><Icon icon={kebabHorizontal} size={20}/></Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><Icon icon={thumbsUp} size={20}/>&nbsp; Like &nbsp; {post.likeCount} </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><Icon icon={trashB} size={20}/> Delete</Button>
            </CardActions>
            
        </Card>
    )
}

export default Post