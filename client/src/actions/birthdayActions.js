import axios from 'axios';

import {
  GET_BIRTHDAYS,
  // GET_SINGLE_BIRTHDAY,
  BIRTHDAY_LOADING,
  DELETE_BIRTHDAY,
  CLEAR_CURRENT_BIRTHDAY,
  // CREATE_BIRTHDAY,
  GET_ERRORS
} from './types';

// Get current birthdays
export const getCurrentBirthdays = () => dispatch => {
  dispatch(setBirthdayLoading());
  axios
    .get('/api/birthday/mybirthdays')
    .then(res =>
      dispatch({
        type: GET_BIRTHDAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BIRTHDAYS,
        payload: {}
      })
    );
};

// Create Birthday
export const createBirthday = (birthdayData, history) => dispatch => {
  axios
    .post('/api/birthday', birthdayData)
    .then(res => {
      axios
        .get('/api/birthday/mybirthdays')
        .then(res =>
          dispatch({
            type: GET_BIRTHDAYS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_BIRTHDAYS,
            payload: {}
          })
        );
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Birthday
export const deleteBirthday = id => dispatch => {
  console.log('deleteBirthdayCalled');

  axios
    .delete(`/api/birthday/${id}`)
    .then(res => {
      console.log('DELETION SUCCESS');
      dispatch({
        type: DELETE_BIRTHDAY,
        payload: id
      });
    })
    .catch(err => {
      console.log('deletion Err');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get current birthdays
// export const getEditBirthday = bdayId => dispatch => {
//   dispatch(setBirthdayLoading());
//   axios
//     .get(`/api/birthday/edit-birthday/${bdayId}`)
//     .then(res =>
//       dispatch({
//         type: GET_SINGLE_BIRTHDAY,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_SINGLE_BIRTHDAY,
//         payload: {}
//       })
//     );
// };

// Birthday loading
export const setBirthdayLoading = () => {
  return {
    type: BIRTHDAY_LOADING
  };
};

// Clear Birthday
export const clearCurrentBirthday = () => {
  return {
    type: CLEAR_CURRENT_BIRTHDAY
  };
};
