import React, { useEffect, useState } from "react";

import { loginCookie, loginUser, registerUser } from "../../services/apiService";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import _cookie from "cookie";

import styles from "./Form.module.css";

const Form = () => {
  const [cookie, setCookie] = useCookies(["auth-token"]);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleInputChage = (e) => {
    e.preventDefault();
    console.log(e.target.type);
    e.target.type === "email"
      ? setEmail(e.target.value)
      : e.target.type === "password"
      ? setPassword(e.target.value)
      : setName(e.target.value);
  };

  const handleLogIn = async () => {
    const req = { email, password };

    try {
      const res = await loginUser(req);

      if (res.status === 200) history.push("/app");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    const req = { email, password, name };

    try {
      const res = await registerUser(req);

      setCookie("auth-token", res.data);

      history.push("/app");

      console.log(res, document.cookie);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.selection}>
          <p className={styles.loginTitle}>{isLogin ? "Log in" : "Register"}</p>
          <p className={styles.loginToggle} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? <p>Not a user? Register here!</p> : <p>Already a member? Log in!</p>}
          </p>
        </div>
        {isLogin ? (
          <>
            <fieldset className={styles.fieldset}>
              <legend>Email</legend>
              <input
                className={styles.inputBox}
                type="email"
                name="email"
                value={email}
                onChange={handleInputChage}
              />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Password</legend>
              <input
                className={styles.inputBox}
                type="password"
                name="password"
                value={password}
                onChange={handleInputChage}
              />
            </fieldset>

            <button className={styles.submit} onClick={handleLogIn}>
              {isLogin ? "Log in" : "Register"}
            </button>
          </>
        ) : (
          <>
            <fieldset className={styles.fieldset}>
              <legend>Email</legend>
              <input
                className={styles.inputBox}
                type="email"
                name="email"
                value={email}
                onChange={handleInputChage}
              />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Password</legend>
              <input
                className={styles.inputBox}
                type="password"
                name="password"
                value={password}
                onChange={handleInputChage}
              />
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>Name</legend>
              <input
                className={styles.inputBox}
                type="name"
                name="name"
                value={name}
                onChange={handleInputChage}
              />
            </fieldset>

            <button className={styles.submit} onClick={handleRegister}>
              {isLogin ? "Log in" : "Register"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
