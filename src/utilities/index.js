import Modal from "components/modal";
import {store}  from 'index.js';

//LIBRARIES
import moment from 'moment';


//Actions
import { createStreakData } from "redux/actions/streak";

//FUNCTIONS
export const errorHandler = (error, errorInfo) => {
  console.log('LOGGING', error, errorInfo)
}

export const dialogCreateStreak = () => {
  Modal.show({
    title: 'New Streak',
    icon: 'icon-streak',
    primaryButtonText: 'ADD',
    secondaryButtonText: "Cancel",
    content: [
      {
        uid: "title",
        type: "text",
        eleType: "input",
        placeholder: 'STREAK NAME'
      },
      {
        group: true,
        items: [{
          uid: "date-from",
          type: "text",
          eleType: "input",
          min: moment(new Date()).format('YYYY-MM-DD'),
          placeholder: 'FROM',
          icon: 'icon-calendar'
        },
        {
          uid: "date-to",
          type: "text",
          eleType: "input",
          min: moment(new Date()).format('YYYY-MM-DD'),
          placeholder: 'TO',
          icon: 'icon-calendar'
        }
        ]
      },
    ],
    btnClickHandler: (data) => {
      if (data.type === "primary") {
        delete data.type
        store.dispatch(createStreakData(data));
      }
      Modal.hide();
    },
  });
};