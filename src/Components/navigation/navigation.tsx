/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Libraries
import moment from 'moment';

// Navigation list
import { navigationList, navigationIcons } from './navigationList';

// CSS
import "Styles/Components/navigation.scss";
// import '../../index.css';

// Images
import { ReactComponent as Logo } from 'Assests/Images/Logo.svg';

// Utilities
// import { dialogForPlanUpgrade } from 'Utilities';

// Actions
// import { getUserData } from 'redux/actions/user';


import {
  useLogoutMutation
} from "../../Redux/Slices/accountSlice";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [logout, { error: logoutError, isLoading: logoutLoading }] =
  useLogoutMutation();

  const [navigation, setNavigation] = useState([...navigationList]);
  const [user] = useState(JSON.parse(localStorage.getItem('profile') || ''));

  // const authData = useSelector((state) => state.user.authData);

  // useEffect(() => {
  //   dispatch(getUserData(authData.result.email));
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('navigationList')) {
      const navigationData = JSON.parse(localStorage.getItem('navigationList') || '');
      setNavigation([...navigationData]);
    }

    const currentDate = moment().endOf('day').format();
    // const endDate = authData?.result?.endTime;

    // const daysLeft = moment(endDate).diff(moment(currentDate), 'days');

    // if (moment(currentDate).isAfter(moment(endDate))) {
      // logoutFun(history, user?.refreshToken)
      // dispatch(getUserData(authData.result.email));
    // }

    // if (daysLeft === 1 && localStorage.getItem('planUpgradeModal') !== '1') {
    //   dialogForPlanUpgrade(navigate);
    //   localStorage.setItem('planUpgradeModal', '1');
    // }
  }, []);


  const logoutFun = async (navigate : any, refreshToken : any) => {
      const logoutData = await logout({ refreshToken });
  
      // if (window.ReactNativeWebView) {
      //   history.replace('/account');
      // }
      // else {
        navigate('/');
      // }

    // }
  
    // if(window.ReactNativeWebView)
    //   sendEventToMobile('loggedOut');
  
  }

  const linkClick = (list : any) => {
    // eslint-disable-next-line no-underscore-dangle
    const id = list._id;
    const navigationList = [...navigation];

    navigationList.forEach((el) => {
      el.active = false;
      if (el._id === id) {
        el.active = true;
        navigate({
          pathname: `${list.url}`,
        });
      }
    });

    localStorage.setItem('navigationList', JSON.stringify([...navigationList]));
    setNavigation([...navigationList]);
  };

  const iconDisplay = (list : any) => {
    const icon = navigationIcons.filter((icon) => {
      if (icon._id === list._id) {
        return icon;
      }
      return null;
    });

    return icon[0].iconClass;
  };

  useEffect(() => {
    const path = location.pathname;
    const navigation = [...navigationList];

    const modifiedNavigationList = navigation.map((item) => {
      if (item.url === path) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });

    setNavigation([...modifiedNavigationList]);
  }, [location]);

  const goToDashboard = () => {
    navigate({
      pathname: '/dashboard',
    });
  };

  return (
    <>
      <nav className="navigation">
        <div
          onClick={goToDashboard}
          className="brand-name-container c-pointer"
        >
          <Logo />
        </div>

        <div
          className="avatar-container c-pointer display-none d-flex center-items"
          style={{
            // backgroundImage: `url(${user?.result?.imageUrl})`,
          }}
          onClick={() => {
            navigate({
              pathname: '/profile',
            });
          }}
        >
          {/* {!user?.result?.imageUrl && <span>{user?.result?.name[0]}</span>} */}
          <span>{user?.result?.name[0]}</span>
        </div>

        <div className="personal-detail-container display-none">
          <h4 className="name">{user?.result?.name}</h4>
          <h4 className="email">{user?.result?.email}</h4>
          <h4 className="prime">{user?.result?.planType === 'prime' ? user?.result?.planType.toUpperCase() : ''}</h4>
        </div>

        <div className="navigation-container display-none">
          <ol>
            {
              navigation?.map((list) => (
                <li
                  key={list._id}
                  onClick={() => {
                    linkClick(list);
                  }}
                >
                  <div className="d-flex">
                    <i
                      className={
                          list.active
                            ? `demo-icon ${iconDisplay(list)} size-16-8f activeText mr-10`
                            : `demo-icon ${iconDisplay(list)} size-16-8f mr-10`
                        }
                    />
                    <h5
                      onClick={(e) => { e.preventDefault(); }}
                      className={list.active ? 'activeText' : ''}
                    >
                      {list.name}
                    </h5>
                  </div>
                  <div className={list.active ? 'active' : ''} />
                </li>
              ))
            }
          </ol>
        </div>

        <div
          className="logout-btn-container display-none"
          onClick={() => logoutFun(navigate, user?.refreshToken)}
        >
          <i className="demo-icon icon-logout" />
          <h5 className="">Logout</h5>
        </div>
        <div className="developer-container display-none">
          <span>
            Made with
            <i className="demo-icon icon-heart color-red" />
            by PRAJWAL BHATIA
          </span>
        </div>
        <div className="vertical-line display-none" />
      </nav>

      <nav className="navigation-small-screen">
        <div className="navigation-container">
          <ol className="d-flex justify-space-between">
            {
              navigation?.map((list) => (
                <li
                  key={list._id}
                  onClick={() => {
                    linkClick(list);
                  }}
                >
                  <div className="d-flex flex-dir-col center-items pos-relative">
                    <i
                      className={
                          list.active
                            ? `demo-icon ${iconDisplay(list)} size-16-8f activeText`
                            : `demo-icon ${iconDisplay(list)} size-16-8f`
                        }
                    />
                    <h5
                      onClick={(e) => { e.preventDefault(); }}
                      className={list.active ? 'activeText c-pointer' : 'c-pointer'}
                    >
                      {list.name}
                    </h5>
                    <div className={list.active ? 'active' : ''} />
                  </div>
                </li>
              ))
            }
          </ol>
        </div>
      </nav>
    </>
  );
}

export default React.memo(Navigation);
