import React, {useEffect, useState} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    
    //we want to dispatch an action
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getPosts());
    },[currentId, dispatch]);

    return (
        <div className='main' >
                {/* <main> */}
                    {/* <div  justify='space-between' alignItems='stretch' spacing={3}> */}
                        <div className='form1' item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <br/>
                            
                        </div>
                        
                        <Wrapper item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Wrapper>
                        
                        {/* <Grid item xs={30} sm={3}> 
                            <Weather/>
                        </Grid> */}
                        
                    {/* </div> */}
                {/* </main> */}
            </div>
            
            
    )
}

const Wrapper = styled.div`
/* background-color: red; */
/* margin-left: 10px; */
max-width: 375px;
margin-top: -20px;
/* display: inline-block; */

`;



export default Home