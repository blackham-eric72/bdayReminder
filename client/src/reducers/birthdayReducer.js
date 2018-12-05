import {
  GET_BIRTHDAYS,
  BIRTHDAY_LOADING,
  CLEAR_CURRENT_BIRTHDAY,
  GET_SINGLE_BIRTHDAY,
  DELETE_BIRTHDAY
} from '../actions/types';

const initialState = {
  birthdays: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BIRTHDAY_LOADING:
      return {
        ...state, //current state
        loading: true
      };
    case GET_BIRTHDAYS:
      return {
        ...state,
        birthdays: action.payload, //changes the state's 'birthdays' from null to what was returned from the GET request at '/api/birthday/mybirthdays'
        loading: false
      };
    case CLEAR_CURRENT_BIRTHDAY:
      return {
        ...state, //current state
        birthdays: null
      };

    case GET_SINGLE_BIRTHDAY:
      return {
        ...state,
        bday: action.payload,
        loading: false
      };

    case DELETE_BIRTHDAY:
      return {
        ...state,
        birthdays: state.birthdays.filter(bday => bday._id !== action.payload)
      };

    default:
      return state;
  }
}
