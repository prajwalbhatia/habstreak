import React from "react";
import { useHistory } from "react-router";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons"

import "./header.css";

//REDUX
import { useDispatch } from "react-redux";

//LIBRARIES
import moment from 'moment';

//Actions
import { logout } from "../../redux/actions/user";

//Component 
import Search from "../search/search";
import { OutlinedPrimaryButton } from "components/button/button";
import { IconButton } from "components/button/button";


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
                <h1 className="heading">{props.headerText}</h1>
                {props.withDate ? <h5 className="date">{moment().format('dddd, Do MMMM YYYY')}</h5> : null}
            </div>

            <div className="d-flex">
                {
                    props?.withSearchBox
                        ?
                        <Search
                            data={(searchText) => {

                            }}
                            containerClass={'mr-30'}
                        />
                        :
                        null
                }

                <div className="pos-relative">
                    <IconButton
                        click={() => { }}
                        icon={<i className="demo-icon icon-notifications" />}
                        btnContainerClass={'mr-30'}
                    />

                    {/* <div className='notification-dropdown-container' style={{ height: 'calc(3 * 40px )' }}>
                        <ol>
                            <div className="d-flex"><li>Streak 1 dsadsdsa</li>  <span className="pointer ml-10"></span></div>
                            <li>Streak 1</li>
                            <li>Streak 1</li>
                        </ol>
                    </div> */}
                </div>

                <OutlinedPrimaryButton
                    name={'Add New Streak'}
                    click={() => logoutFun()}
                    btnContainerClass=""
                    btnClass='add-btn'
                />
            </div>

        </header>
    );
}

export default Header;