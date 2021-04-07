import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../actions/alertAction";
import { registerUser, updateUserProfile } from "../actions/authAction";
import Profile from "../components/Profile";

const ProfileScreen = ({ history }) => {
  const {
    alert: { alerts },
    authUser,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  /** handle submit */
  /** this is how to pass multiple parameters with 'e' object */
  const handleSubmit = ({ name, email, password, confirmPassword }) => {
    // const { name, email, password } = registrationInfo;
    if (password === confirmPassword) {
      /** post update */

      dispatch(updateUserProfile(name, email, password, authUser.user.token));
      /** go to "/" */
      // console.log({ name, email, password });
    } else {
      dispatch(setAlert("passwords does not match", "danger"));
    }
  };

  return (
    <Row>
      <Col xs={12} lg={4}>
        <h1>USER PROFILE</h1>
        {alerts &&
          alerts.map((alert, index) => (
            <Alert key={index} variant={alert.variant}>
              {alert.msg}
            </Alert>
          ))}
        <Profile handleSubmit={handleSubmit} componentType="UPDATE" />
      </Col>
      <Col></Col>
    </Row>
  );
};

export default ProfileScreen;
