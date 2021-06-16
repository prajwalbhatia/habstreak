import React , {useState} from 'react';
import { AiFillHeart , AiFillFire , AiFillTrophy } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import {IconContext} from "react-icons"

//Navigation list
import navigationList  from './navigationList';

//CSS
import "./navigation.css";
import "../../index.css";


function Navigation(props) {
  const [navigation , setNavigation] = useState([...navigationList]);


  const linkClick = (list) => {
    const id = list._id;
    const navigationList = [...navigation];

    navigationList.forEach((el) => {
      el.active = false;
      if(el._id === id)
      {
        el.active = true;
      }
    });

    setNavigation([...navigationList]);
  }

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
                    <IconContext.Provider value={{ style: {fontSize: '1.4rem', color: "white" , marginTop : "1px" , marginRight : "5px"}}}>
                      {list.iconJsx}
                    </IconContext.Provider>
                    <a href="" onClick={(e) => {e.preventDefault()}}>{list.name}</a>
                    </div>
                   </li>
                );
              })
            }
          </ol>
      </div>
      <div className="developer-container">
        <span>Made with 
          <IconContext.Provider value={{ style: {fontSize: '1rem', color: "#d7443e"}}}> <AiFillHeart/> </IconContext.Provider>by PRAJWAL BHATIA</span>
      </div>
    </nav>
  );
}

export default Navigation;