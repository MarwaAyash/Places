import {CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH} from '../constants/actionTypes';
import * as api from '../api';
//create actions creators
//to fetch all the posts so we use redux-thunk
export const getPosts = () => async(dispatch) => {
    //try to fetch all the data from api 
    try{
        //get the response which its have the data object from the backend
        const {data} = await api.fetchPosts();
         //declare action as an object
        dispatch({type: FETCH_ALL, payload:data});
    }catch(error){
        console.log(error);
    }

}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    
    try{
        //get the response which its have the data object from the backend
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload:data})
        console.log(data);
    }catch(error){
        console.log(error);
    }

}

export const createPost = (post) => async(dispatch) => {
    //try to fetch all the data from api 
    try{
        //get the data which distruct the data from the response
        const {data} = await api.createPost(post);
         //declare action as an object
        dispatch({type: CREATE, payload: data});
    }catch(error){
        console.log(error);
    }

}

export const updatePost = (id, post) => async(dispatch) => {
    try{
        // make api request to update the post and it return the updating post
        const {data} = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        // await api  to delete the post 
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    }catch(error){
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try{
        const {data} = await api.likePost(id);

        dispatch({type: UPDATE, payload: data});
    }catch(error){
        console.log(error);
    }
}