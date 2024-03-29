import Modal from "components/modal";
import { store } from 'index.js';

//LIBRARIES
import moment from 'moment';

//Actions
import { createStreakData, updateStreakData, deleteStreakData, deleteStreakAndRewardData } from "redux/actions/streak";
import { createRewardData, updateRewardData, deleteRewardBulk, deleteRewardData } from "redux/actions/reward";

import size from 'lodash/size';
import { logoutCall } from "redux/actions/user";
import { logout } from "redux/api";

//FUNCTIONS
export const errorHandler = (error, errorInfo) => {
  console.log('LOGGING', error, errorInfo)
}

/**
 * 
 * @param {String} type - type of action we want to take ('create' or 'update')
 * @param {Object} data - Pre loaded data in case of update
 * @param {String} streakId - In case of update id of streak we want to update
 */
export const dialogForCreateAndUpdateStreak = (type = 'create', data, streakId) => {
  const contentData =
    type === 'create' || type === 'clone'
      ?
      [{
        uid: "title",
        type: "text",
        eleType: "input",
        placeholder: 'STREAK NAME',
        autoFocus: true
      },
      {
        group: true,
        range: true,
        items: [{
          uid: "dateFrom",
          type: "text",
          eleType: "input",
          placeholder: 'FROM',
          icon: 'icon-calendar'
        },
        {
          uid: "dateTo",
          type: "text",
          eleType: "input",
          placeholder: 'TO',
          icon: 'icon-calendar'
        }
        ]
      },
      {
        uid: "description",
        type: "text",
        eleType: "textArea",
        placeholder: 'DETAILS ABOUT STREAK'
      }]
      :
      [{
        uid: "title",
        type: "text",
        eleType: "input",
        placeholder: 'STREAK NAME',
        autoFocus: true
      },

      {
        uid: "description",
        type: "text",
        eleType: "textArea",
        placeholder: 'DETAILS ABOUT STREAK'
      },]


  Modal.show({
    title: type === 'update' ? "Update Streak" : 'Create Streak',
    icon: 'icon-streak',
    initialData:
      type === 'create'
        ?
        {} : (
          type === 'clone'
            ?
            {
              title: data?.title,
              dateFrom: '',
              dateTo: '',
              description: data?.description
            }
            :
            {
              title: data?.title,
              dateFrom: data?.startDate ? moment(data?.startDate).startOf('day').toString() : data?.dateFrom,
              dateTo: data?.endDate ? moment(data?.endDate).endOf('day').toString() : data?.dateTo,
              description: data?.description
            }

        ),
    primaryButtonText: type === 'update' ? "Update" : 'Create',
    secondaryButtonText: "Cancel",

    content: [
      ...contentData
    ],
    btnClickHandler: (data) => {
      // console.log('🚀 ~ file: index.js ~ line 109 ~ dialogForCreateAndUpdateStreak ~ data', data);
      data.dateFrom = moment(data.dateFrom).startOf('day').toString();
      data.dateTo = moment(data.dateTo).endOf('day').toString();

      if (data.type === "primary") {
        delete data.type
        if (type === 'create' || type === 'clone') {
          store.dispatch(createStreakData(data));
        }
        else
          store.dispatch(updateStreakData(data, streakId));
      }
      Modal.hide();
    },
  });
};

/**
 * 
 * @param {String} type - type of action we want to take ('create' or 'update')
 * @param {Object} data - Pre loaded data in case of update
 * @param {String} rewardId - In case of update id of streak we want to update
 * @param {Array} streaks - streaks for dropdown options
 */
export const dialogForCreateAndUpdateReward = (type = 'create', data = {}, rewardId = '', streaks) => {
  if (data && size(data) > 0) {
    var dataObj = {
      title: data.title,
      streakName: data.streak,
      pickDate: moment(data.date).format('YYYY-MM-DD'),
      minDate: new Date(data.streak.dateFrom) > new Date() ? new Date(data.streak.dateFrom) : new Date(),
      maxDate: new Date(data.streak.dateTo)
    }
  }

  const contentData =
    type === 'create'
      ?
      [{
        uid: "title",
        type: "text",
        eleType: "input",
        placeholder: 'REWARD NAME',
        autoFocus: true
      },
      {
        uid: "streakName",
        type: "text",
        eleType: "dropdown",
        placeholder: 'ASSOSIATED STREAK NAME',
        options: [...streaks].filter((streak) => streak.tag !== 'unfinished'),
      },

      {
        group: true,
        range: false,
        items: [
          {
            uid: "pickDate",
            type: "text",
            eleType: "input",
            placeholder: 'PICK DATE',
            icon: 'icon-calendar',
          }
        ]
      },
      ]
      :
      [
        {
          uid: "title",
          type: "text",
          eleType: "input",
          placeholder: 'REWARD NAME',
          autoFocus: true
        },

        {
          uid: "streakName",
          type: "text",
          eleType: "dropdown",
          placeholder: 'ASSOSIATED STREAK NAME',
          options: [...streaks],
        },

        {
          group: true,
          range: false,
          items: [
            {
              uid: "pickDate",
              type: "text",
              eleType: "input",
              placeholder: 'PICK DATE',
              icon: 'icon-calendar',
            }
          ]
        },
      ]


  Modal.show({
    title: type === 'create' ? "New Reward" : 'Update Reward',
    icon: 'icon-reward',
    primaryButtonText: type === 'create' ? "Create" : 'Update',
    secondaryButtonText: "Cancel",

    content: [
      ...contentData
    ],

    initialData: type === 'create' ? {} : { ...dataObj },
    btnClickHandler: (data) => {
      if (data.type === "primary") {
        delete data.type
        let rewardObj = {};
        if (data?.streakName?.userId)
          rewardObj.userId = data?.streakName?.userId;
        if (data?.title)
          rewardObj.title = data?.title

        rewardObj.streakId = (data.streakName && (data?.streakName?.id || data?.streakName?._id)) || '';
        if (data?.pickDate)
          rewardObj.date = moment(data?.pickDate).endOf('day').toString();
        rewardObj.rewardEarned = false

        if (size(rewardObj) === 5) {
          if (type === 'create') {
            store.dispatch(createRewardData(rewardObj));
          }
          else {
            store.dispatch(updateRewardData(rewardObj, rewardId));
          }
          Modal.hide();
        }
      }
      else {
        Modal.hide();
      }
    },
    dropdownHandler: (uid, selectedStreak) => {
      if (uid === 'streakName') {
      }
    }
  });
};



export const dialogForMessage = (history) => {
  const contentData =
    [{
      eleType: "text",
      text: 'Please create some streak before creating reward'
    }]

  Modal.show({
    title: 'Warning',
    icon: '',
    primaryButtonText: "Go to streak",
    secondaryButtonText: "Cancel",


    content: [
      ...contentData
    ],

    btnClickHandler: (data) => {
      if (data.type === "primary") {
        history.push('/streak-list');
      }
      Modal.hide();
    }
  });
};

export const dialogForPlanUpgrade = (history) => {
  const contentData =
    [{
      eleType: "text",
      text: 'Your plan will expire today, renew plan to keep enjoying prime features'
    }]

  Modal.show({
    title: 'Message',
    icon: '',
    primaryButtonText: "Renew Plan",
    secondaryButtonText: "Cancel",


    content: [
      ...contentData
    ],

    btnClickHandler: (data) => {
      if (data.type === "primary") {
        history.push('/profile');
      }
      Modal.hide();
    }
  });
};

export const dialogForError = (message) => {
  const contentData =
    [{
      eleType: "text",
      text: message
    }]

  Modal.show({
    title: 'Error',
    type: 'delete',
    icon: '',
    primaryButtonText: "OKAY",
    primaryButtonColor: '#d7443e',


    content: [
      ...contentData
    ],

    btnClickHandler: (data) => {
      Modal.hide();
    }
  });
};

export const dialogForUpgrade = (history) => {
  const contentData =
    [{
      eleType: "text",
      text: 'Upgrade plan to enjoy prime features'
    }]

  Modal.show({
    title: 'Information',
    icon: '',
    primaryButtonText: "Change Plan",
    secondaryButtonText: "Cancel",


    content: [
      ...contentData
    ],

    btnClickHandler: (data) => {
      if (data.type === "primary") {
        history.push('/profile');
      }
      // else  
      // history.push('/dashboard');
      Modal.hide();
    }
  });
};

/**
 * 
 * @param {Object} data - Object of data (either streak or reward)
 * @param {String} type  - type of dialog (reward or streak)
 */
export const dialogBeforDeletng = (data, type) => {
  Modal.show({
    type: 'delete',
    title: type === 'streak' ? 'Delete Streak' : 'Delete Reward',
    icon: 'icon-delete',
    primaryButtonText: type === 'streak' ? 'Delete Streak' : 'Delete Reward',
    primaryButtonColor: '#d7443e',
    secondaryButtonText: "Cancel",
    extraButtons: type === 'streak' ? [
      {
        text: 'Special Delete',
        btnClass: 'special-btn',
        uid: 'delete-streak-and-rewards',
        tooltip: true,
        tooltipData: 'Delete streak and rewards assosiated with it'
      }
    ] : [],
    content: [
      {
        eleType: 'text',
        text: `Are you sure you want delete streak ${data.title} ?`
      },
    ],
    btnClickHandler: (modalData) => {
      if (type === 'streak') {
        if (modalData.type === 'delete-streak-and-rewards') {
          store.dispatch(deleteStreakData(data._id));
          store.dispatch(deleteRewardBulk(data._id));
        }
        else if (modalData.type === "primary") {
          store.dispatch(deleteStreakAndRewardData(data._id))
        }
      }
      else {
        if (modalData.type === "primary") {
          store.dispatch(deleteRewardData(data._id));
        }
      }
      Modal.hide();
    },
  });
};

/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @returns 
 */
export const isSameOrBefore = (dateFrom, dateTo) => {
  if (moment(moment(dateFrom).format('YYYY-MM-DD')).isSameOrBefore(moment(dateTo).format('YYYY-MM-DD')))
    return true
  else
    return false
}

/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @returns 
 */
export const isBefore = (dateFrom, dateTo) => {
  if (moment(moment(dateFrom).format('YYYY-MM-DD')).isBefore(moment(dateTo).format('YYYY-MM-DD')))
    return true
  else
    return false
}

/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @returns 
 */
export const isSameOrAfter = (dateFrom, dateTo) => {
  if (moment(moment(dateFrom).format('YYYY-MM-DD')).isSameOrAfter(moment(dateTo).format('YYYY-MM-DD')))
    return true
  else
    return false
}

/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @returns 
 */
export const isAfter = (dateFrom, dateTo) => {
  if (moment(moment(dateFrom).format('YYYY-MM-DD')).isAfter(moment(dateTo).format('YYYY-MM-DD')))
    return true
  else
    return false
}


/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @returns 
 */
export const isSame = (dateFrom, dateTo) => {
  if (moment(moment(dateFrom).format('YYYY-MM-DD')).isSame(moment(dateTo).format('YYYY-MM-DD')))
    return true
  else
    return false
}

/**
 * 
 * @param {String} type - type of activity
 * @param {String} title - title of activity
 * @param {String} from - calling function from dashboard or recent activities
 * @returns 
 */
export const activityTitle = (type, title = '', from) => {
  switch (type) {
    case 'create-streak':
      return from === 'dashboard' ? 'Streak Created' : `A new streak named as ${title} is created`;
    case 'delete-streak':
      return from === 'dashboard' ? 'Streak Deleted' : `A streak named as ${title} is deleted`;
    case 'update-streak':
      return from === 'dashboard' ? 'Streak Updated' : `A streak named as ${title} is updated`;
    case 'create-reward':
      return from === 'dashboard' ? 'Reward Created' : `A new reward named as ${title} is created`;
    case 'delete-reward':
      return from === 'dashboard' ? 'Reward Deleted' : `A new reward named as ${title} is deleted`;
    case 'reward-earned':
      return from === 'dashboard' ? 'Reward Earned' : `A reward named as ${title} is earned`;
    case 'update-reward':
      return from === 'dashboard' ? 'Reward Updated' : `A reward named as ${title} is updated`;
    default:
      return 'No type is found'
  }
}

/**
 * 
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 * @param {String} days 
 * @returns 
 */
export const progressFun = (dateFrom, dateTo, days) => {
  let from = moment(new Date(dateFrom));
  let to = moment(new Date(dateTo));
  const daysDiff = to.diff(from, 'days') + 1;
  const perDayPerc = (100 / (daysDiff)).toFixed(2);
  const daysCompleted = Number(daysDiff) - Number(days);
  const progress = daysCompleted * perDayPerc;

  return progress;
}


export const perPerDay = (dateFrom, dateTo) => {
  let from = moment(dateFrom)
  let to = moment(dateTo);
  const daysDiff = to.diff(from, 'days') + 1;
  const perDayPerc = (100 / (daysDiff)).toFixed(2);

  return Number(perDayPerc);
}

export const logoutFun = (history, refreshToken) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (user.result.fromGoogle) {
    store.dispatch(logoutCall());

    if (window.ReactNativeWebView) {
      history.replace('/account');
    }
    else {
      history.replace('/');
    }
  }
  else {
    logout({ refreshToken })
      .then(() => {
        store.dispatch(logoutCall());

        if (window.ReactNativeWebView) {
          history.replace('/account');
        }
        else {
          history.replace('/');
        }
      })
  }

  if(window.ReactNativeWebView)
    sendEventToMobile('loggedOut');

}

export const streakTabData = () => {
  return [
    {
      title: 'Running',
      count: 0,
      active: true
    },
    {
      title: 'Upcoming',
      count: 0,
      active: false
    },
    {
      title: 'Finished',
      count: 0,
      active: false
    },
    {
      title: 'Unfinished',
      count: 0,
      active: false
    }

  ]
}

export const rewardTabData = () => {
  return [
    {
      title: 'To Buy',
      count: 0,
      active: true
    },
    {
      title: 'Earned',
      count: 0,
      active: false
    }
  ]
}

export const activeTab = (activeTabText, tabData = [...streakTabData()]) => {
  const tab = [...tabData];

  const modifiedTabData = tab.map((item) => {
    if (item.title === activeTabText)
      item.active = true
    else
      item.active = false

    return item;
  })

  return modifiedTabData;
}

export const planDetail = () => {
  switch (store.getState().user.authData.result.planType) {
    case "free":
      return "free"
    case "prime":
      return "prime"
    default:
      return "free"
  }
}

/**
   * 
   * @param {String} jumpTo - to where to jump (signup or login) 
   */
export const jumpToAccount = (jumpTo, history) => {
  history.push({
    pathname: `/account`,
    state: { jumpTo },
  });
}

/**
 * 
 * @param {String} url
 */
export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}


export const goToHome = (history) => {
  history.replace('/');
}

export const sendEventToMobile = (eventName) => {
  const event = {
    event: eventName,
    data: {}
  }
  window.ReactNativeWebView.postMessage(JSON.stringify(event));
  return null;
}

