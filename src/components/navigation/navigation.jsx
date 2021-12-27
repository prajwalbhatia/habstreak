import React, { useState } from 'react';
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons"
import { useHistory } from "react-router";

import { useLocation  } from 'react-router-dom';

//Navigation list
import { navigationList, navigationIcons } from './navigationList';

//CSS
import "./navigation.css";
import "../../index.css";
import { useEffect } from 'react';


function Navigation(props) {
  const [navigation, setNavigation] = useState([...navigationList]);
  const history = useHistory();
  const location = useLocation();

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

  const iconDisplay = (list) =>
  {
    let icon = navigationIcons.filter((icon) => {
      if(icon._id === list._id)
      {
        return icon
      }
    })

    return icon[0].iconJsx;
  }


  useEffect(() => {
    const path = location.pathname;
    const navigation = [...navigationList];

    const modifiedNavigationList = navigation.map((item) => {
      if(item.url === path)
      {
        item.active = true;
      }
      else
      {
        item.active = false;
      }
      return item;
    });

    setNavigation([...modifiedNavigationList]);
  }, [location])

  return (
    <nav className="navigation">
      <div className="brand-name-container">
        <h1>HAB</h1><h1>STREAK</h1>
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
                  <div className={list.active ? "active" : ""}></div>
                  <div className="d-flex">
                    <IconContext.Provider
                      value={{ className: 'navigation-icons' }}
                    >
                      {iconDisplay(list)}
                    </IconContext.Provider>
                    <a href="" onClick={(e) => { e.preventDefault() }}>{list.name}</a>
                  </div>
                </li>
              );
            })
          }
        </ol>
      </div>
      <div className="developer-container">
        <span>Made with
          <IconContext.Provider value={{ className: 'heart-icon' }}> <AiFillHeart /> </IconContext.Provider>by PRAJWAL BHATIA</span>
      </div>
    </nav>
  );
}

export default Navigation;