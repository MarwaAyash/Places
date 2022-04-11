import React, { useEffect, useState} from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

// we need the id of the current post to update it
const Form = ({currentId, setCurrentId}) => {

    const post = useSelector((state) => currentId ? state.posts.find((postId) =>  postId._id === currentId) : null);
    // state that will stored the data in 
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message:'',
        tags:'',
        selectedFile:''
    });
    const classes = useStyles();
const dispatch = useDispatch();

useEffect(() => {
    if(post) setPostData(post);
}, [post])
    const handleSubmit = (e) => {
        // when we click submit we want to send over a post request all the data that entered by the user
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
        }
        else{
            dispatch(createPost(postData))
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message:'', tags:'', selectedFile:'' });
    }
    return (
        // paper is the the same as div 
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'updating': ''} Places </Typography>
                    {/* value will be stored in state */}
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
                <TextField name="message" variant="outlined" label="Info" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />
                <div className={classes.fileInput} ><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} color='primary' variant="contained"  size="small" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;