import React, { useState } from "react";
import { useHistory } from "react-router";

import "./header.css";

//Redux
import { useSelector, useDispatch } from "react-redux";

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
import {
    dialogForCreateAndUpdateStreak,
    dialogForCreateAndUpdateReward,
    dialogForUpgrade,
    dialogForMessage,
    logoutFun,
    activityTitle,
    planDetail
} from "utilities";

//CONSTANTS
import { plansFeatures } from "constants/index";

//Actions
import { search } from "redux/actions/streak";
import { useEffect } from "react";

function Header(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const streaks = useSelector((state) => state.streak.streaks);
    const rewards = useSelector((state) => state.reward.rewards);

    const activities = useSelector((state) => state.recentActivities.activities);
    const authData = useSelector((state) => state.user.authData);


    const [showListing, setShowListing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [streakCount, setStreakCount] = useState(0);
    const [rewardCount, setRewardCount] = useState(0);
    const [planType, setPlanType] = useState("");
    console.log('🚀 ~ file: header.jsx ~ line 57 ~ Header ~ planType', planType);

    const { internalNavigation, headerText } = props;

    const notification = () => {
        setShowNotification(!showNotification)
    }

    const goToActivities = () => {
        history.push({
            pathname: '/recent-activities',
        });
    }

    useEffect(() => {
        setStreakCount(streaks.length);
    }, [streaks]);

    useEffect(() => {
        setRewardCount(rewards.length);
    }, [rewards]);

    useEffect(() => {
        if (authData)
            setPlanType(planDetail());
    }, [authData]);

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
                                className="profile d-flex center-items"
                                style={{
                                    backgroundImage: `url(${user?.result?.imageUrl})`
                                }}
                            >
                                {!user?.result?.imageUrl && <span>{user?.result?.name[0]}</span>}
                            </div>
                            <h4 className="text-center ml-10">{user?.result?.name}</h4>
                        </div>
                        <ol className='d-flex flex-dir-col mt-20'>
                            <li
                                onClick={goToActivities} className="c-pointer">
                                <i className="demo-icon icon-notifications c-pointer" />
                                Notification
                            </li>
                            <li
                                onClick={() => logoutFun(history, user?.refreshToken)}
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
                                console.log('🚀 ~ file: header.jsx ~ line 127 ~ Header ~ searchText', searchText);
                                dispatch(search(searchText));
                            }}
                            containerClass={'mr-30'}
                        />
                        :
                        null
                }

                <div className="pos-relative">
                    <IconButton
                        click={notification}
                        icon={<i className="demo-icon icon-notifications" />}
                        btnContainerClass={'mr-30'}
                    />

                    {showNotification && <div className='notification-dropdown-container d-flex flex-dir-col' style={{ height: 'calc(4 * 4rem )' }}>
                        <ol className="flex-auto">
                            {
                                activities.map((activity, index) => {
                                    if (index < 3) {
                                        return (
                                            <div className="d-flex" key={index}>
                                                <li>{activityTitle(activity.type, activity.title, 'dashboard')}</li>
                                                {/* <span className="pointer ml-10"></span> */}
                                            </div>

                                        )
                                    }
                                })
                            }
                            {/* <li>Streak 1</li> */}
                            {/* <li>Streak 1</li> */}
                        </ol>

                        <div className="d-flex center-items mb-10">
                            <span onClick={goToActivities} className="color-primary c-pointer">See all</span></div>
                    </div>}
                </div>


                <OutlinedPrimaryButton
                    name={headerText === 'Rewards' ? 'Add New Reward' : 'Add New Streak'}
                    click={
                        () => {
                            const filterStreak = streaks.filter(streak => streak.tag !== 'unfinished')
                            if (headerText === 'Rewards') {
                                if (streaks.length === 0)
                                    dialogForMessage(history)
                                else {
                                    if (rewardCount < plansFeatures[planType].rewards)
                                        dialogForCreateAndUpdateReward('create', {}, '', filterStreak);
                                    else
                                        dialogForUpgrade();
                                }
                            }
                            else {
                                if (streakCount < plansFeatures[planType].streaks)
                                    dialogForCreateAndUpdateStreak();
                                else
                                    dialogForUpgrade();
                            }
                        }
                    }
                    btnContainerClass=""
                    btnClass='h-40'
                />
            </div>

        </header>
    );
}

export default Header;