import { ADD_BDAY, GET_BDAYS, BDAY_LOADING } from '../actions/types';
const initialState = {
  bdays: [],
  bday: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action) {
    case BDAY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BDAYS:
      return {
        ...state,
        bdays: action.payload,
        loading: false
      };
    case ADD_BDAY:
      return {
        ...state,
        bdays: [action.payload, ...state.bdays]
      };
    default:
      return state;
  }
}
