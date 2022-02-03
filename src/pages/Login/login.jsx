import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';

// import { LockOutlinedIcon } from '@material-ui/icons';

import useStyles from './styles';

//COMPONENTS
import { InputElement } from "../../components/form-elements/form-elements";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

//Actions
import { auth, 
  signup, signin 
} from "../../redux/actions/user";

import './login.css';
import "index.css";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const authData = useSelector((state) => state.user.authData);
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const token = user?.token;
    if (token)
      history.push('/dashboard');
  }, [history, user?.token])


  useEffect(() => {
    if (authData)
      history.push('/dashboard');
  }, [authData, history]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ result, token }));
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (res) => {
    console.log('GOOGLE FAILURE', res)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history))
    }
    else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    // handleShowPassword();
  }


  const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    <div className="login-container">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />


      <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}

          <Typography varient="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <InputElement
                      lable={'First Name'}
                      uid={'firstName'}
                      placeholder={'First Name'}
                      type="text"
                      // value={formData?.[data.uid]}
                      onChange={handleChange}
                    />

                    <InputElement
                      lable={'Last Name'}
                      uid={'lastName'}
                      placeholder={'Last Name'}
                      type="text"
                      // value={formData?.[data.uid]}
                      onChange={handleChange}
                    />
                  </>
                )}

              <InputElement
                lable={'Email'}
                uid={'email'}
                placeholder={'Email'}
                // value={formData?.[data.uid]}
                type="email"
                onChange={handleChange}
              />

              <InputElement
                lable={'Password'}
                uid={'password'}
                placeholder={'Password'}
                // value={formData?.[data.uid]}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
              />

              {
                isSignup
                &&
                <InputElement
                  lable={'Confirm Password'}
                  uid={'confirmPassword'}
                  placeholder={'Confirm Password'}
                  // value={formData?.[data.uid]}
                  type="password"
                  onChange={handleChange}
                />
              }
            </Grid>

            <Button type="submit" fullWidth varient="contained" color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <Grid contaner justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already Have an account? Sign in' : 'Don"t have an account? Sign Up'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>


    </div>
  );
}

export default Dashboard;