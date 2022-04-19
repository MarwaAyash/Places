import React, { useEffect, useState} from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import './Form.css';

// we need the id of the current post to update it
const Form = ({currentId, setCurrentId}) => {
 
    const post = useSelector((state) => currentId ? state.posts.posts.find((postId) =>  postId._id === currentId) : null);
    // state that will stored the data in 
    const [postData, setPostData] = useState({
        title: '',
        message:'',
        tags:'',
        selectedFile:''
    });

const dispatch = useDispatch();
const user = JSON.parse(localStorage.getItem('profile'));

useEffect(() => {
    if(post) setPostData(post);
}, [post])

    const handleSubmit = async (e) => {
        // when we click submit we want to send over a post request all the data that entered by the user
        e.preventDefault();
        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name}));
            clear();

        }
        else{
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
            clear();
        }
        
    };
    const clear = () => {
        setCurrentId(0);
        
        setPostData({ title: '', message:'', tags:'', selectedFile:'' });
    }

if(!user?.result?.name){
    return(
        <div className="paper">
            <h3 align="center">Sign in to be able to create a post</h3>
        </div>
    )
}


    return (
    
        <div className="paper1" >
            <form autoComplete='off' noValidate className="root form" onSubmit={handleSubmit}>
                <h2>{currentId ? 'updating': ''} Places </h2>
                    {/* value will be stored in state */}
            <div className='div'>
            <label >Title: <input className='title'  name="title" variant="outlined" label="Title" size='25'  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} /> </label>
            
            <label>Info: <input className='info' name="message"  label="Info" size='25' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} /></label>
            
            <label  >Tags: <input className='tags' name="tags"  label="tags" size='25' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} /></label>
            </div>
            
                <div className="fileInput" ><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/></div>
                <button className="buttonSubmit"  variant="contained"  size="small" type="submit" >Submit</button>
                <button className="buttonClear" variant="contained" size="small" type='reset' onClick={clear} >Clear</button>
            </form>
        </div>
    )
}

export default Form;