import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

//Actions
import { auth } from "../../redux/actions/user";

import './login.css';
import "index.css";

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const authData = useSelector((state) => state.user.authData);
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;
    if (token)
      history.push('/dashboard');
  }, [history , user?.token])


  useEffect(() => {
    if (authData)
      history.push('/dashboard');
  }, [authData , history]);

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
    </div>
  );
}

export default Dashboard;