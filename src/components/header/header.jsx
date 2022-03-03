import React, { useState } from "react";
import { useHistory } from "react-router";

import "./header.css";

//Redux
import { useSelector } from "react-redux";

//LIBRARIES
import moment from 'moment';

//IMAGES
import { ReactComponent as Logo } from 'assests/images/Logo.svg';

//Component 
import Search from "../search/search";
import { OutlinedPrimaryButton } from "components/button/button";
import { IconButton } from "components/button/button";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons"

//UTILITIES
import { dialogForCreateAndUpdateStreak, dialogForCreateAndUpdateReward, logoutFun } from "utilities";

function Header(props) {
    const history = useHistory();

    const streaks = useSelector((state) => state.streak.streaks);
    const [showListing, setShowListing] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const { internalNavigation, headerText } = props;

    const notification = () => {

    }

    return (
        <header className="header">
            <div className="d-flex justify-space-between small-screen-header">
                <div className="brand-name-container">
                    <Logo />
                </div>

                <div className="list-container mt-20">
                    {
                        showListing
                            ?
                            <i
                                onClick={() => setShowListing(false)}
                                className="demo-icon size-30-primary icon-close" />
                            :
                            <i
                                onClick={() => setShowListing(true)}
                                className="demo-icon size-30-primary icon-menu" />
                    }


                    {showListing && <div className="menu-list">
                        <div className="d-flex center-items profile-container">
                            <div
                                className="profile"
                                style={{
                                    backgroundImage: `url(${user?.result?.imageUrl})`
                                }}
                            >
                            </div>
                            <h4 className="text-center ml-10">{user?.result?.name}</h4>
                        </div>
                        <ol className='d-flex flex-dir-col mt-20'>
                            <li
                                onClick={() => notification()}>
                                <i className="demo-icon icon-notifications" />
                                Notification
                            </li>
                            <li
                                onClick={() => logoutFun(history)}
                                className="c-pointer"
                            >
                                <i className="demo-icon icon-logout " />
                                Logout
                            </li>
                        </ol>

                        <span className='rob-med-10-grey'>Made with
                            <IconContext.Provider value={{ className: 'heart-icon' }}> <AiFillHeart /> </IconContext.Provider>by PRAJWAL BHATIA</span>
                    </div>}
                </div>
            </div>

            <div className="header-text-container">
                <h1 className="heading">{headerText}</h1>
                {props.withInternalNavigation
                    &&
                    <div onClick={() => history.goBack()} className="d-flex header-nav-container">
                        <i className="demo-icon icon-back" />
                        <h5>{internalNavigation}</h5>
                    </div>
                }
                {props.withDate ? <h5 className="date">{moment().format('dddd, Do MMMM YYYY')}</h5> : null}
            </div>

            <div className="d-flex header-btn-container">
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
                    name={headerText === 'Rewards' ? 'Add New Reward' : 'Add New Streak'}
                    click={headerText === 'Rewards' ?
                        () => dialogForCreateAndUpdateReward('create', {}, '', streaks)
                        :
                        () => dialogForCreateAndUpdateStreak()
                    }
                    btnContainerClass=""
                    btnClass='h-40'
                />
            </div>

        </header>
    );
}

export default Header;