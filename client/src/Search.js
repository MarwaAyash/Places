import React, {useState} from 'react';
import styled from "styled-components";

const Search = ({setSearchResults}) => {
    const [search, setSearch] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault();
        setSearchResults(search);
        setSearch('');
    };
    //console.log(search);
    return (
        <Wrapper>
            <form onSubmit={onSubmit}>
                
                <input
                type='text'
                placeholder='Search your location and hit Enter'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
margin-bottom: 30px;
    input {
        width: 80%;
        height: 45px;
        border-radius: 10px;
        padding-left: 20px;
    }
`;
export default Search