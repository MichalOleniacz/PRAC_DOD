import React, { useEffect } from "react";
import Form from "../../components/Form/Form";
import _cookie from "cookie";
import { loginCookie, loginUser, registerUser } from "../../services/apiService";
import { useHistory } from "react-router-dom";

import styles from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    const logInWithCookie = async () => {
      const cookies = _cookie.parse(document.cookie);
      if (cookies) {
        const res = await loginCookie(cookies["auth-token"]);

        if (res.status === 200) history.location("/app");
      }
    };

    logInWithCookie();
  });

  return (
    <div className={styles.wrapper}>
      <Form />
    </div>
  );
};

export default Login;
