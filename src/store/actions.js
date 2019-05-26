import * as ACTION_TYPE from "./constants";
import _ from "lodash";
import getCountryUsersSum from "../utils/getCountryUsersSum";
import postCountryUsersSum from "../utils/postCountryUsersSum";

export const setUsersForCountry = usersForCountry => (dispatch, getState) => {
  dispatch({ type: ACTION_TYPE.SET_USERS_FOR_COUNTRY_STARTED });
  postCountryUsersSum(usersForCountry, () => {
    dispatch({ type: ACTION_TYPE.SET_USERS_FOR_COUNTRY_SUCCESS });
  }).catch(error =>
    dispatch({ type: ACTION_TYPE.SET_USERS_FOR_COUNTRY_ERROR, error })
  );
};

export const getUsersForCountry = () => (dispatch, getState) => {
  dispatch({ type: ACTION_TYPE.GET_USERS_FOR_COUNTRY_STARTED });
  getCountryUsersSum(res => {
    const usersPerCountries = _.filter(res, usersPerCountry =>
      _.isInteger(usersPerCountry.users)
    );
    dispatch({
      type: ACTION_TYPE.GET_USERS_FOR_COUNTRY_SUCCESS,
      payload: { usersPerCountries }
    });
  }).catch(error =>
    dispatch({ type: ACTION_TYPE.GET_USERS_FOR_COUNTRY_ERROR, error })
  );
};

export const changePage = page => ({
  type: ACTION_TYPE.PAGE_CHANGE,
  payload: { page }
});
