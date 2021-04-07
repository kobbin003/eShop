import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ dependent, time, msg, variant }) => {
  const [showAlert, setshowAlert] = useState(false);
  useEffect(() => {
    if (dependent) {
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, time);
    }
  }, [dependent, time]);
  return (
    <Alert variant={variant} show={showAlert}>
      {msg}
    </Alert>
  );
};

export default AlertMessage;
