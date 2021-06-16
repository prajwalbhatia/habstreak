import react from "react";

import "./header.css";

//Component 
import Search  from "../search/search";

function Header(props)
{
    return (
        <header className="header">
            <h2>{props.headerText}</h2>
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