import { takeEvery,put } from 'redux-saga/effects';
import Axios from 'axios';
import { GET_INIT_LIST } from './actionTypes';
import { initListAction } from './actionCreators';

function* getInitList() {
  try {
    const res = yield Axios.get(process.env.REACT_APP_API + 'plant');
    const action = initListAction(res.data);
    yield put(action);
  } catch (e) {
    console.log(' network failure');
  }
}

function* sagas() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default sagas;
