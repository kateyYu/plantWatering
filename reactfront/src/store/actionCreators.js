import {
  START_WATERING,
  STOP_WATERING,
  SET_TIMER,
  INIT_LIST_ACTION,
  GET_INIT_LIST
} from '../store/actionTypes';

export const getStartWateringAction = (index) => ({
  type: START_WATERING,
  index
});

export const getStopWateringAction = (index) => ({
  type: STOP_WATERING,
  index
});

export const getSetTimerAction = () => ({
  type: SET_TIMER
});

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
});

export const getInitList = () => ({
  type: GET_INIT_LIST
});
