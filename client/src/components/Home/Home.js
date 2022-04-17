import React, {useEffect, useState} from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import styled from 'styled-components';
import Pagination from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import './Home.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const query= useQuery();
    const navigate = useNavigate();
    // read url and see if there is page parameter in it 
    // if no pages, we must be in the first 1
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        
        dispatch(getPosts());
    },[currentId, dispatch]);

    const handleKeyPress = (e) => {
        // enter key has a code 13
        if(e.keyCode === 13){
            //search post
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);


    const searchPost = () => {
        if(search.trim() || tags){
            //fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else{
            navigate('/');
        }
    }


    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <div className='main' >
                {/* <main> */}
                    <div  justify='space-between' alignItems='stretch' className='grid-container' spacing={3}>
                        <div className='form1' item xs={12} sm={6} md={3}>
                            <div className='appBarSearch' position='static' >
                                <label > Search posts: <input name='search' value={search} onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)}/></label>
                                <label > Search tags: <ChipInput style={{margin: '25px 0 20px -80px'}} variant='outlined' value={tags} onAdd={handleAdd} onDelete={handleDelete} /></label>
                                <button onClick={searchPost} className='searchButton'>Search</button>
                            </div>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <div className='pagination' ><Pagination/></div>
                            <br/>

                        </div>
                        
                        <Wrapper item xs={12} sm={6} >
                            <Posts setCurrentId={setCurrentId}/>
                        </Wrapper>
                        
                        {/* <Grid item xs={30} sm={3}> 
                            <Weather/>
                        </Grid> */}
            
                    </div>
                {/* </main> */}
            </div>
            
            
    )
}

const Wrapper = styled.div`
max-width: 375px;
margin-top: -20px;

`;

export default Home