import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  USER_REQUEST_FAILED,
  REQUEST_USER,
  USER_AUTHENTICATED,
  UPDATE_USER_PROFILE,
  SET_ALERT,
} from "../constants/type";
import axios from "axios";
import { setAlert } from "./alertAction";
import { useParams } from "react-router";

export const registerUser = (name, email, password, history) => async (
  dispatch
) => {
  dispatch({
    type: REQUEST_USER,
  });
  try {
    const config = {
      url: "/api/users/",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: { name, email, password },
    };
    const { data } = await axios(config);
    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
    dispatch({
      type: USER_AUTHENTICATED,
    });

    /** go to "/" if authenticated */
    history.push("/");

    /** set it in localstrage */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error);
    // const errorMessage = error.response.data.message;
    const errorMessages = error.response.data.errors;
    dispatch({
      type: USER_REQUEST_FAILED,
      payload: errorMessages || [{ msg: error.message }],
    });
    errorMessages.forEach(({ msg }) => dispatch(setAlert(msg, "danger", 6000)));
  }
};

export const loginUser = (
  { email, password },
  history,
  location,
  match
) => async (dispatch) => {
  dispatch({
    type: REQUEST_USER,
  });
  try {
    const config = {
      url: "/api/users/login",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: { email, password },
    };
    const { data } = await axios(config);

    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
    dispatch({
      type: USER_AUTHENTICATED,
    });

    /** go to "/" if authenticated */
    // console.log("location", location);
    // console.log("match", match);
    history.push("/");

    /** set it in localstrage */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error);
    // const errorMessage = error.response.data.message;
    const errorMessages = error.response.data.errors;
    errorMessages.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: USER_REQUEST_FAILED,
      payload: errorMessages || [{ msg: error.message }],
    });
    // dispatch(setAlert(errorMessage, "danger"));
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    const config = {
      url: "/api/users/profile",
      method: "get",
      header: { authorization: `Bearer ${token}` },
    };
    const payload = await axios(config);
    dispatch({
      type: GET_USER,
      payload,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response.data.message;

    dispatch({
      type: USER_REQUEST_FAILED,
      payload: errorMessage || [{ msg: error.message }],
    });
    dispatch(setAlert(errorMessage, "danger"));
  }
};

export const updateUserProfile = (name, email, password, token) => async (
  dispatch
) => {
  dispatch({ type: REQUEST_USER });
  console.log("updateProfile");
  try {
    const config = {
      method: "put",
      url: "/api/users/update",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: { name, email, password },
    };
    const { data } = await axios(config);
    console.log("profileupdate", data);

    /** update user profie */
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: data.user,
    });

    /** show updated alert */
    dispatch(setAlert(data.msg, "success"));
  } catch (error) {
    console.error(error);
    const errorMessages = error.response.data.errors;
    errorMessages.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));

    dispatch({
      type: USER_REQUEST_FAILED,
      payload: errorMessages || [{ msg: error.message }],
    });
  }
};
