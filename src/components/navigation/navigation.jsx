import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Libraries
import moment from 'moment';

// Navigation list

// CSS
import './navigation.css';
import '../../index.css';

// IMAGES
import { ReactComponent as Logo } from 'assests/images/Logo.svg';

// UTILITIES
import { logoutFun, dialogForPlanUpgrade } from 'utilities';

// Actions
import { getUserData } from 'redux/actions/user';
import { navigationList, navigationIcons } from './navigationList';

function Navigation() {
  console.log("********NAVIGATION***")
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [navigation, setNavigation] = useState([...navigationList]);
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));

  const authData = useSelector((state) => state.user.authData);

  useEffect(() => {
    dispatch(getUserData(authData.result.email));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('navigationList')) {
      const naigationData = JSON.parse(localStorage.getItem('navigationList'));
      setNavigation([...naigationData]);
    }

    const currentDate = moment().endOf('day').format();
    const endDate = authData?.result?.endTime;

    const daysLeft = moment(endDate).diff(moment(currentDate), 'days');

    if (moment(currentDate).isAfter(moment(endDate))) {
      // logoutFun(history, user?.refreshToken)
      dispatch(getUserData(authData.result.email));
    }

    if (daysLeft === 1 && localStorage.getItem('planUpgradeModal') !== '1') {
      dialogForPlanUpgrade(history);
      localStorage.setItem('planUpgradeModal', 1);
    }
  }, []);

  const linkClick = (list) => {
    // eslint-disable-next-line no-underscore-dangle
    const id = list._id;
    const navigationList = [...navigation];

    navigationList.forEach((el) => {
      el.active = false;
      if (el._id === id) {
        el.active = true;
        history.push({
          pathname: `${list.url}`,
        });
      }
    });

    localStorage.setItem('navigationList', JSON.stringify([...navigationList]));
    setNavigation([...navigationList]);
  };

  const iconDisplay = (list) => {
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
    history.push({
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
            history.push({
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
          onClick={() => logoutFun(history, user?.refreshToken)}
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
