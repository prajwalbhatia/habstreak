import React from "react";
import { useHistory } from "react-router";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons"

import "./header.css";

//REDUX
import { useDispatch } from "react-redux";

//Actions
import { logout } from "../../redux/actions/user";

//Component 
import Search from "../search/search";
import { PrimaryButton } from "../../components/button/button";


function Header(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutFun = () => {
        dispatch(logout());
        history.replace('/');
    }

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

            <div>
                <PrimaryButton
                    name={'Logout'}
                    click={() => logoutFun()}
                    btnContainerClass="ml-10"
                    btnClass='logout-btn'
                />
            </div>

        </header>
    );
}

export default Header;