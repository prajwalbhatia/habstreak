import react from "react";
import { useHistory } from "react-router";

import { IoArrowBackCircleOutline } from "react-icons/io5";


import "./header.css";
import { IconContext } from "react-icons"

//Component 
import Search from "../search/search";

function Header(props) {
    const history = useHistory();
    return (
        <header className="header">
            <div className="header-text-container">
                {props.withBackIcon && <IconContext.Provider
                    value={{ style: { fontSize: '2rem', marginTop: '4px', marginRight: '5px', cursor: 'pointer' } }}>  <IoArrowBackCircleOutline
                        onClick={() => {
                            history.goBack();
                        }}
                    /> </IconContext.Provider>}
                <h1>{props.headerText}</h1>
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