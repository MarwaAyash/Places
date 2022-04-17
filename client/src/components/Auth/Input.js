import React from 'react';
import {IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styled from 'styled-components';


const Input = ({name, handleChange, label, autoFocus, type, handleShowPassword, half}) => {
    return (
        // some inputs will take half the width
        <div item xs={12} sm={half ? 6 : 12}>
            <InputSign name={name} onChange={handleChange} variant="outlined" required fullWidth label={label} autoFocus={autoFocus} type={type} InputProps={name === 'password' ? {endAdornment: (
            <p position="end">
                <button onClick={handleShowPassword}>
                    <IconButton/>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </button>
            </p>
        ),}: null } />

        </div>
    )
}

const InputSign = styled.input`
    width: 70%;
    height: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
`;
export default Input