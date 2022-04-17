import React, {useState} from 'react';
import { GoogleLogin} from "react-google-login";
import './Auth.css'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [ isSignup, setIsSignUp ] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, navigate))
        }
        else{
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        //spread all the properties but only change the one we currently on (target value ) 
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
            const result = res?.profileObj;
            const token = res?.tokenId;
            try {
                //if its successfull dispatch 
                //the type of the action is auth and the data that will be send in  will be payload which is new object result and token
            dispatch({ type: 'AUTH', data: { result, token } });
                // after we dispatch we redirect back to home
               //in react-router-dom v6 we must use navigate('/') instead of  history.push('/')
            navigate('/');
            } catch (error) {
            console.log(error);
            }
        };
    
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <div className='container' >
            <div className="paper2" elevation={3}>
                <div className="avatar">
                    <LockOutlinedIcon />
                </div>
                <h3>{isSignup ? 'Sign up' : 'Sign In'}</h3>
                <form className="form" onSubmit={handleSubmit}>
                <div className='signup-container' container spacing={2}>
                    { isSignup && (
                    <>
                    <label className='signInUp' >First Name: <Input name="firstName" placeholder='First Name' label="First Name" handleChange={handleChange} autoFocus xs={6} /></label>
                    <label className='signInUp'>Last Name: <Input name="lastName" placeholder='Last Name'  label="Last Name" handleChange={handleChange} xs={6} /></label>
                    </>
                    )}
                    <label className='signInUp'>Email Address: <Input name="email"  label="Email Address" handleChange={handleChange} type="email" /></label>
                    <label className='signInUp'>Password: <Input name="password"   label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} /></label>
                        {/* confirm password field will be shown only when we are in the sign up form */}
                    { isSignup && <label className='signInUp'>Confirm Password: <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /></label> }
                </div>
                    
                    <button  type="submit" fullWidth variant="contained"  className="submit">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </button>
                    {/* sign with google account */}
                    <GoogleLogin
                    
                    // google id
                        clientId={process.env.REACT_APP_GOOGLE_ID}

                        render={(renderProps) => (
                            <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <div container justify="flex-end">
                        <div item>
                            {/* switch from sign up to sign in */}
                            <button onClick={switchMode} className='btn'>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth