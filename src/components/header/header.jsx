import react from "react";

import "./header.css";
import {IconContext} from "react-icons"

//Component 
import Search  from "../search/search";

function Header(props)
{
    return (
        <header className="header">
            <div className="header-text-container">
                <h2>{props.headerText}</h2>
                <IconContext.Provider value={{ style: {fontSize: '1.2rem' , marginTop : '6px' , marginLeft : '5px' , cursor : 'pointer'}}}>  {props.icon} </IconContext.Provider>
            </div>
            {
                props?.withSearchBox 
                ?
                    <Search
                        data={(searchText) => {

                        }}
                    />
                :
                 null
            }
            
        </header>
    );
}

export default Header;