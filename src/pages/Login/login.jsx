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

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;
    if (token)
      history.push('/dashboard');
    // setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ result, token }));
      history.push('/dashboard');
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log('GOOGLE FAILURE')
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