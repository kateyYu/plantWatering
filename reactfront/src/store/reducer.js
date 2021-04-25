import {
  START_WATERING,
  STOP_WATERING,
  SET_TIMER,
  INIT_LIST_ACTION
} from '../store/actionTypes';

const defaultState = {
  list: [],
  time: new Date()
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default (state = defaultState, action) => {
  if (action.type === START_WATERING) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list[action.index].IsWatering = true;
    return newState;
  }
  
  if (action.type === STOP_WATERING) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list[action.index].IsWatering = false;
    newState.list[action.index].WaterDateTime = new Date();
    return newState;
  }

  if (action.type === SET_TIMER) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.time = new Date();
    return newState;
  }

  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data;
    return newState;
  }
  return state;
}