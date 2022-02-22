import Modal from "components/modal";
import { store } from 'index.js';

//LIBRARIES
import moment from 'moment';


//Actions
import { createStreakData, updateStreakData } from "redux/actions/streak";

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
    type === 'create'
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
    title: type === 'create' ? "Create Streak" : 'Update Streak',
    icon: 'icon-streak',
    initialData: type === 'create' ? {} : {
      title: data?.title,
      dateFrom: moment(data?.startDate).format().split('T')[0],
      dateTo: moment(data?.endDate).format().split('T')[0],
      description: data?.description
    },
    primaryButtonText: type === 'create' ? "Create" : 'Update',
    secondaryButtonText: "Cancel",

    content: [
      ...contentData
    ],
    btnClickHandler: (data) => {
      if (data.type === "primary") {
        delete data.type
        if (type === 'create') {
          store.dispatch(createStreakData(data));
        }
        else
          store.dispatch(updateStreakData(data, streakId));
      }
      Modal.hide();
    },
  });
};