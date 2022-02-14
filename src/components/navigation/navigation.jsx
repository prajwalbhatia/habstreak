import React, { useState } from 'react';
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons"
import { useHistory } from "react-router";

import { useLocation } from 'react-router-dom';

//REDUX
import { useDispatch } from "react-redux";

//Actions
import { logout } from "redux/actions/user";

//Navigation list
import { navigationList, navigationIcons } from './navigationList';

//CSS
import "./navigation.css";
import "../../index.css";
import { useEffect } from 'react';

//IMAGES
import { ReactComponent as Logo } from 'assests/images/Logo.svg';


function Navigation(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [navigation, setNavigation] = useState([...navigationList]);
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log('🚀 ~ file: navigation.jsx ~ line 33 ~ Navigation ~ user', user);


  useEffect(() => {
    if (localStorage.getItem('navigationList')) {
      const naigationData = JSON.parse(localStorage.getItem('navigationList'));
      setNavigation([...naigationData]);
    }
  }, []);

  const linkClick = (list) => {
    const id = list._id;
    const navigationList = [...navigation];

    navigationList.forEach((el) => {
      el.active = false;
      if (el._id === id) {
        el.active = true;
        history.push({
          pathname: `${list.url}`
        })
      }
    });

    localStorage.setItem('navigationList', JSON.stringify([...navigationList]));
    setNavigation([...navigationList]);
  }

  const iconDisplay = (list) => {
    let icon = navigationIcons.filter((icon) => {
      if (icon._id === list._id) {
        return icon
      }
      else
        return null;
    })

    return icon[0].iconClass;
  }

  const logoutFun = () => {
    dispatch(logout());
    history.replace('/');
  }


  useEffect(() => {
    const path = location.pathname;
    const navigation = [...navigationList];

    const modifiedNavigationList = navigation.map((item) => {
      if (item.url === path) {
        item.active = true;
      }
      else {
        item.active = false;
      }
      return item;
    });

    setNavigation([...modifiedNavigationList]);
  }, [location])

  return (
    <nav className="navigation">
      <div className="brand-name-container">
        <Logo />
      </div>

      <div className='avatar-container'>

      </div>

      <div className='personal-detail-container'>
        <h4 className='name'>{user?.result?.name}</h4>
        <h4 className='email'>{user?.result?.email}</h4>
      </div>

      <div className="navigation-container">
        <ol>
          {
            navigation?.map((list) => {
              return (
                <li
                  key={list._id}
                  onClick={() => {
                    linkClick(list)
                  }}
                >
                  <div className="d-flex">
                    <i
                      className={
                        list.active
                          ?
                          `demo-icon ${iconDisplay(list)} size-16-8f activeText mr-10`
                          :
                          `demo-icon ${iconDisplay(list)} size-16-8f mr-10`
                      }
                    />
                    <h5 onClick={(e) => { e.preventDefault() }}
                      className={list.active ? "activeText" : ""}>{list.name}
                    </h5>
                  </div>
                  <div className={list.active ? "active" : ""}></div>
                </li>
              );
            })
          }
        </ol>
      </div>

      <div
        className='logout-btn-container'
        onClick={() => logoutFun()}
      >
        <i className="demo-icon icon-logout" />
        <h5 className=''>Logout</h5>
      </div>
      <div className="developer-container">
        <span>Made with
          <IconContext.Provider value={{ className: 'heart-icon' }}> <AiFillHeart /> </IconContext.Provider>by PRAJWAL BHATIA</span>
      </div>
      <div className='vertical-line'></div>
    </nav>
  );
}

export default Navigation;