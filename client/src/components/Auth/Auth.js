import React, { useState } from 'react'
import Input from './Input'
import GoogleLogin from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

import { Container, Paper, Grid, Typography, Avatar, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './Auth.style'


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles()
    const [ isSignUp, setIsSignUp] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ formData, setFormData ] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data: { result, token}})
            history.push('/')
        }catch(err){
            console.log(err)
        }
    }

    const googleFailure = async () => {
        console.log("Google Sign In was unsuccessful. Try Again Later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" half autoFocus handleChange={handleChange}/>
                                <Input name="lastName" label="Last Name" half handleChange={handleChange}/>
                            </>
                        )}
                        <Input name="email" label="Email address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>}
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {isSignUp ? "Sign Up" : "Sign In" }
                    </Button>
                    <GoogleLogin clientId='928258901072-0g65i43cf3ai64ib8e5df8o9hl8dmkna.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                            className={classes.googleButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}>
                                Google Sign In
                            </Button>)}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                            />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth