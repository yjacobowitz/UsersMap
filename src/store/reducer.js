import * as ACTION_TYPE from "./constants";
import { VIEW_USERS_PAGE } from "../utils/constants";
const initialState = {
  getUsersForCountryLoading: false,
  getUsersForCountryError: null,
  usersPerCountries: [],
  setUsersForCountryLoading: false,
  setUsersForCountryError: null,
  pageToDisplay: VIEW_USERS_PAGE
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REDUX_STORAGE_LOAD":
      return state;
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
    case ACTION_TYPE.PAGE_CHANGE:
      return { ...state, pageToDisplay: action.payload.page };
    default:
      return state;
  }
};
