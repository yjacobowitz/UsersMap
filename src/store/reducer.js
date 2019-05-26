import * as ACTION_TYPE from "./constants";
const initialState = {
  getUsersForCountryLoading: false,
  getUsersForCountryError: null,
  usersPerCountries: [],
  setUsersForCountryLoading: false,
  setUsersForCountryError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USERS_FOR_COUNTRY_STARTED:
      return { ...state, setUsersForCountryLoading: true };
    case ACTION_TYPE.SET_USERS_FOR_COUNTRY_SUCCESS:
      return { ...state, setUsersForCountryLoading: false };
    case ACTION_TYPE.SET_USERS_FOR_COUNTRY_ERROR:
      return {
        ...state,
        setUsersForCountryLoading: false,
        setUsersForCountryError: action.payload.error
      };
    case ACTION_TYPE.GET_USERS_FOR_COUNTRY_STARTED:
      return { ...state, getUsersForCountryLoading: true };
    case ACTION_TYPE.GET_USERS_FOR_COUNTRY_SUCCESS:
      return {
        ...state,
        getUsersForCountryLoading: false,
        usersPerCountries: action.payload.usersPerCountries
      };
    case ACTION_TYPE.GET_USERS_FOR_COUNTRY_ERROR:
      return {
        ...state,
        getUsersForCountryLoading: false,
        getUsersForCountryError: action.payload.error
      };
    default:
      return state;
  }
};
