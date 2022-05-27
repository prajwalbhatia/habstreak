import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Actions
import { getStreaksDetailData, updateStreakDetailData, emptyStreaksDetail, getStreakData } from "redux/actions/streak";

//CSS
import "./streak.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, dialogForCreateAndUpdateStreak, progress, perPerDay, isSame, isBefore, isAfter } from 'utilities';


//COMPONENTS
import Frame from "../../components/frame/frame";
import { InputElement } from "components/form-elements/form-elements";
import { OutlinedPrimaryButton } from "components/button/button";

function Streak(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [desc, setDesc] = useState({});
    const [streaks, setStreaks] = useState([]);

    const [collapseState, setCollapseState] = useState({

    });

    const [progressData, setProgressData] = useState({
        weekDaysArr: [],
        daysArr: [],
        perc: 0.00,
        rewards: []
    });


    //Getting the data from the state
    const streakDetail = useSelector((state) => state.streak.streakDetail);
    const streak = useSelector((state) => state.streak.streak);

    const loading = useSelector((state) => state.streak.loading);
    //Getting initial data
    useEffect(() => {
        if (props?.match?.params?.id) {
            dispatch(getStreaksDetailData(props.match.params.id));
            dispatch(getStreakData(props.match.params.id));
        }
        return () => {
            dispatch(emptyStreaksDetail());
        }

    }, [dispatch, props.match.params.id]);

    //Whenver there is a change in streakDetails
    //then we want to update out description array
    //with the latest data 
    useEffect(() => {
        if (streakDetail.length > 0 && JSON.stringify(streaks) !== JSON.stringify(streakDetail)) {
            let streaksData = [...streakDetail];
            let descDetail = {};
            let collapseDetail = {}
            streaksData.forEach((detail) => {
                descDetail[detail._id] = detail.description;
                if (isSame(detail.date, moment().format()))
                    collapseDetail[detail._id] = false
                else
                    collapseDetail[detail._id] = true
            });
            setDesc({ ...desc, ...descDetail });
            setCollapseState({ ...collapseState, collapseDetail });
            setStreaks([...streaksData]);
        }
    }, [streakDetail, desc, streaks])



    useEffect(() => {
        if (streak && streak[0]
            // && streakDetail && streakDetail.length > 0
        ) {
            const { dateFrom, dateTo, days, rewards } = streak.length > 0 && streak[0];
            const weekDaysArr = [];
            const daysArr = [];
            const perDayPerc = (100 / (Number(days))).toFixed(2);
            const daysCompleted =
                streakDetail.length > 0
                    ?
                    (streak[0]?.tag === 'finished' ? streakDetail.length : streakDetail.length - 1)
                    :
                    0;
            const progress = daysCompleted * perDayPerc;

            for (let i = 0; i < days; i++) {
                let date = moment(dateFrom).add(i, 'days').format('D');
                let day = moment(dateFrom).add(i, 'days').format('ddd');

                weekDaysArr.push(day);
                daysArr.push(date);
            }

            const modifiedReward = rewards && rewards.map((reward) => {
                let from = moment(dateFrom);
                let rewardDate = moment(new Date(reward.date));
                const daysDiffOfReward = rewardDate.diff(from, 'days') + 1;
                const perDayPerc = perPerDay(dateFrom, dateTo);
                return { perc: Number(perDayPerc) * daysDiffOfReward, title: reward.title, date: rewardDate.format('DD-MM-YYYY') }
            })

            let progressData = {
                weekDaysArr,
                daysArr,
                perc: progress,
                rewards: modifiedReward || []
            }

            setProgressData(progressData);
        }

    }, [streak, streakDetail])


    /**
     * 
     * @param {Object} detail - Object of detail we want to update
     */
    const updateStreakDetail = (detail) => {
        dispatch(updateStreakDetailData({
            description: desc[detail._id]
        }, detail._id, detail.streakId));
    }

    /**
   * 
   * @param {Object} streak - data we want to update  
   */
    const updateStreak = (streak) => {
        if (streak?.tag !== 'unfinished')
            dialogForCreateAndUpdateStreak('update', streak, streak._id);
    }

    const checkingStatusForStreak = (date) => {
        let status = '';
        if (isSame(date, moment().format()))
            status = 'Active';
        else if (isAfter(date, moment().format()))
            status = 'Upcoming';
        else
            status = 'Active';
        return status;
    }

    const checkingStatus = (date) => {
        let status = '';
        if (isSame(date, moment().format()))
            status = 'Active';
        else if (isAfter(date, moment().format()))
            status = 'Upcoming';
        else
            status = 'Past';
        return status;
    }


    const collapseContainer = (dataId) => {
        let obj = { ...collapseState, [dataId]: !collapseState[dataId] }
        setCollapseState({ ...obj });
    }


    const dayContainerJsx = () => {
        return (
            <>
                {
                    streakDetail.length > 0
                        ?
                        streakDetail.map((detail, index) => {
                            const status = checkingStatus(detail.date);
                            return (
                                <div key={index}>
                                    <div className='d-flex justify-space-between mt-30 date-data'>
                                        <span className='rob-bold-12-black'>{moment(detail.date).format('ll')}</span>
                                        <div onClick={() => collapseContainer(detail._id)}>
                                            {
                                                collapseState[detail._id]
                                                    ?
                                                    <i className="demo-icon icon-expand-more" />
                                                    :
                                                    <i className="demo-icon icon-expand-less" />
                                            }
                                        </div>
                                    </div>

                                    {
                                        !collapseState[detail._id]
                                            ?
                                            <div className='d-flex flex-dir-col mt-16 day-represent'>
                                                <div className='left-line'></div>
                                                <div className='d-flex justify-space-between flex-1 day-data'>
                                                    <h4>{`Day ${index + 1}`}</h4>

                                                    {
                                                        status === 'Past'
                                                            ?
                                                            (
                                                                streak[0]?.tag === 'unfinished'
                                                                    ?
                                                                    <i className="demo-icon icon-close-circle circle-icon" />
                                                                    :
                                                                    <i className="demo-icon icon-check-circle circle-icon" />
                                                            )
                                                            :
                                                            <div className='circle'>
                                                            </div>
                                                    }
                                                </div>

                                                <div className='today-task'>
                                                    {
                                                        status === 'Past'
                                                            ?
                                                            <p className='size-14 mt-10'>{desc?.[detail?._id]}</p>
                                                            :
                                                            <InputElement
                                                                placeholder={'Write details about today\'s task...'}
                                                                uid={'fullName'}
                                                                type="text"
                                                                value={desc?.[detail?._id]}
                                                                containerClass={'mt-10'}
                                                                onChange={(e) => {
                                                                    setDesc({ ...desc, [detail?._id]: e.target.value })
                                                                }}
                                                            />
                                                    }

                                                    {
                                                        desc?.[detail._id] && desc?.[detail._id].length > 0 && status === 'Active'
                                                            ?
                                                            <div className='center-items btn-container'>
                                                                <OutlinedPrimaryButton
                                                                    name={'OK'}
                                                                    click={() => updateStreakDetail(detail)}
                                                                    btnContainerClass="okay-btn mt-20"
                                                                    btnClass=''
                                                                />
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>

                                            </div>
                                            :
                                            null
                                    }

                                </div>
                            )
                        })
                        :
                        <div className='h-100 w-100 d-flex center-items'>
                            <span className='rob-med-14-black' >Streak is not started yet</span>
                        </div>
                }

            </>
        );
    }

    const streakDetailJsx = () => {
        return (
            <div className='d-flex flex-1 flex-dir-col'>
                <div className='d-flex flex-1 justify-space-between detail-head-container'>
                    <h3 className='jos-18-primary'>{streak[0]?.title}</h3>
                    <div className='btn-container'>
                        {
                            streak[0]?.tag !== 'unfinished'
                            &&
                            <OutlinedPrimaryButton
                                name={'EDIT'}
                                click={() => updateStreak(streak[0])}
                                btnContainerClass="okay-btn"
                                btnClass=''
                            />
                        }
                    </div>
                </div>

                <div className='d-flex flex-auto'>
                    <p className='rob-reg-14-grey mt-10 detail-streak'>{streak[0]?.description}</p>
                </div>
                <div className='d-flex flex-1 justify-space-between detail-dates mt-20'>
                    <div className='d-flex date-container'>
                        <div className='center-items icon-container'>
                            <i className="demo-icon  icon-flag" />
                        </div>
                        <div className='flex-dir-col info-container'>
                            <span className='rob-med-10-primary'>Start Date:</span>
                            <span className='rob-reg-14-black'>{moment(streak[0]?.dateFrom).format('ll')}</span>

                        </div>
                    </div>
                    <div className='d-flex date-container'>
                        <div className='center-items icon-container'>
                            <i className="demo-icon  icon-flag" />
                        </div>
                        <div className='flex-dir-col info-container'>
                            <span className='rob-med-10-primary'>End Date:</span>
                            <span className='rob-reg-14-black'>{moment(streak[0]?.dateTo).format('ll')}</span>

                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const performanceDetailJsx = () => {
        return (
            <div className='d-flex flex-1 flex-dir-col w-100'>
                <div className='d-flex justify-space-between detail-head-container'>
                    <h3 className='jos-18-primary'>Performance</h3>
                </div>

                <div className='progress-data flex-auto mt-20'>

                    <div className='dates-info'>

                        <div className='d-flex days'>
                            {
                                progressData.weekDaysArr.map((day, index) => {
                                    return (
                                        <div key={index}>
                                            <span className='rob-med-12-black'>{day}</span>
                                            <div className='d-flex date-circles'>

                                                <div
                                                    className='center-items back-circle'
                                                    style={
                                                        index <
                                                            (streak[0]?.tag === 'finished'
                                                                ?
                                                                streakDetail.length
                                                                :
                                                                streakDetail.length - 1
                                                            )
                                                            ?
                                                            { background: 'var(--primaryColor)' }
                                                            :
                                                            {}}
                                                >
                                                    <div
                                                        className='center-items circle'
                                                        style={index >=
                                                            (streak[0]?.tag === 'finished'
                                                                ?
                                                                streakDetail.length
                                                                :
                                                                streakDetail.length - 1
                                                            )
                                                            ?
                                                            { background: '#E8EEF2', minWidth: '4rem', height: '4rem' }
                                                            :
                                                            {}}
                                                    >
                                                        <span className='rob-med-12-black'>{progressData.daysArr[index]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className='progress-container'>
                        <div className='d-flex justify-space-between'>
                            <span className='rob-med-10-primary'>Progress Bar</span>
                            <span className='rob-med-10-primary'>{progressData?.perc > 100 ? '100% done' : `${progressData?.perc?.toFixed(2)}% done`}</span>
                        </div>

                        <div className='prgress-slider'>
                            <div
                                className='inner-slider'
                                style={{ width: `${progressData.perc}%` }}
                            >
                                {streakDetail.length >= 2 && <i className="demo-icon icon-streak" />}
                            </div>

                            {
                                progressData.rewards.length > 0
                                    ?
                                    progressData.rewards.map((reward, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className='center-items trophy-container'
                                                style={{ left: `calc(${reward.perc}% - 3rem)` }}
                                            >
                                                <span className='rob-med-10-primary title'>{reward.date}</span>
                                                <i className="demo-icon icon-reward" />
                                            </div>
                                        );
                                    })
                                    :
                                    <div className='center-items trophy-container-no-hover'>
                                        <i className="demo-icon icon-flag" />
                                    </div>

                            }
                        </div>

                        <div className='center-items mt-20'>
                            <span className='rob-med-10-primary'>{streak[0]?.tag === 'unfinshed' ? 'Come On! You can Do It.' : (streak[0]?.tag === 'finished' ? 'Yay!! You have done it' : 'Better Luck next time !!')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Frame
            containerClass="streak"
            withHeader={true}
            withSearchBox={false}
            headerTitle={streak[0]?.title}
            withInternalNavigation={true}
            internalNavigation={location?.state?.from}
        >
            <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
                {
                    loading
                        ?
                        <div className="loader-container">
                            <ClipLoader loading size={40} color="var(--primaryColor)" />
                        </div>
                        :
                        <div className="d-flex streak-details-container">
                            <div className='left-container'>
                                <div className='d-flex justify-space-between container-heading'>
                                    <h3 className='jos-18-primary task-heading'>Tasks</h3>
                                    <span className='rob-med-12-primary streak-status'>State:
                                        {streak[0]?.tag ? streak[0]?.tag.toUpperCase() : checkingStatusForStreak(streak[0]?.dateFrom).toUpperCase()}</span>
                                </div>

                                <div className='task-container  mt-20'>
                                    {dayContainerJsx()}
                                </div>
                            </div>
                            <div className='flex-dir-col right-container'>
                                <div className='d-flex streak-detail-container'>
                                    {streakDetailJsx()}
                                </div>

                                <div className='d-flex performance-container'>
                                    {performanceDetailJsx()}
                                </div>
                            </div>
                        </div>
                }
            </ErrorBoundary>
        </Frame>
    );
}

export default withRouter(Streak);



