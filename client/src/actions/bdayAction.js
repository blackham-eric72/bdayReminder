import axios from 'axios';

import {
  ADD_BDAY,
  GET_ERRORS,
  // GET_BDAY,
  GET_BDAYS,
  BDAY_LOADING
} from './types';

// ADD bday

export const addBday = bdayData => dispatch => {
  axios
    .post('/api/birthday', bdayData)
    .then(res =>
      dispatch({
        type: ADD_BDAY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get BDAYS
export const getCurrentBirthdays = () => dispatch => {
  dispatch(setBirthdayLoading());
  axios
    .get('/api/birthday/mybirthdays')
    .then(res =>
      dispatch({
        type: GET_BDAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BDAYS,
        payload: {}
      })
    );
};

// Birthday loading
export const setBirthdayLoading = () => {
  return {
    type: BDAY_LOADING
  };
};
