export const icons = [
  'icon-kayaking',
  'icon-surfing',
  'icon-scuba-diving'
];

export const theme = [
  '#F35B7F',
  '#235DDF',
  '#FFB907',
  '#9ACBCF',
  '#6B3671',
  '#FFDDD5',
  '#FFF8E8',
  '#E2EBFF',
  '#F35B7F',
  '#235DDF',
];


export const streakListTableHeadings = [
  {
    uid: '',
    data: ''
  },
  {
    uid: 'title',
    data: 'STREAK NAME'
  },
  {
    uid: 'startDate',
    data: 'START DATE'
  },
  {
    uid: 'endDate',
    data: 'END DATE'
  },
  {
    uid: 'running',
    data: 'RUNNING'
  },
  {
    uid: 'reward',
    data: 'REWARD'
  },
  {
    uid: 'action',
    data: 'ACTION'
  },
];

export const streakListTableHeadings2 = [
  {
    uid: '',
    data: ''
  },
  {
    uid: 'title',
    data: 'STREAK NAME'
  },
  {
    uid: 'startDate',
    data: 'START DATE'
  },
  {
    uid: 'endDate',
    data: 'END DATE'
  },
  {
    uid: 'running',
    data: 'RUNNING'
  },
  {
    uid: 'action',
    data: 'ACTION'
  },
];

export const rewardListTableHeadings = [
  {
    uid: '',
    data: ''
  },
  {
    uid: 'title',
    data: 'REWARD NAME'
  },
  {
    uid: 'associated',
    data: 'ASSOCIATED WITH'
  },
  {
    uid: 'date',
    data: 'DATE'
  },
  {
    uid: 'running',
    data: 'Days left'
  },
  {
    uid: 'progress',
    data: 'Progress'
  },
  {
    uid: 'action',
    data: 'ACTION'
  },
];


export const plansFeatures = {
  "free": {
    streaks: 2,
    rewards: 2,
    activities: false
  },
  "prime": {
    streaks: 100,
    rewards: 100,
    activities: true
  },
  "unlimited": {
    streaks: 100,
    rewards: 100,
    activities: true
  }
}

export const urls = {
  dev: 'http://localhost:5000',
  devMob: 'http://192.168.29.23:5000',
  preProd: 'https://habstreak-staging.herokuapp.com/',
  prod: 'https://habstreak.herokuapp.com/'
}

