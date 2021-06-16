import react from "react";

//css
import "./search.css";

function Search(props) {
    return(
    <div className="search-container">
        <input 
            type="text" 
            id="search" 
            name="Search" 
            placeholder="Search"
            onChange={(e) => {
                props.data(e.target.value)
            }}
       ></input>
    </div>
    )
}

export default Search;