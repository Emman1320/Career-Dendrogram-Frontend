import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import classes from "./SignInForm.module.css";
import FacebookIcon from "./FacebookIcon";
import AppleIcon from "./AppleIcon";
import GoogleIcon from "./GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import axios from "axios";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmpty = (text) => text.trim().length === 0;
  const isPasswordCorrect = (password) => {
    if (password.length < 8) {
      setEnteredPassword("");
      setPasswordError("Password is less than 8 characters");
      return true;
    }
    return false;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setLoading(true);
    setResponseError(false);
    if (isEmpty(enteredEmail)) {
      setEnteredEmail("");
      setEmailError("Enter a valid email");
    }
    isPasswordCorrect(enteredPassword);
    if (isEmpty(enteredEmail) || isPasswordCorrect(enteredPassword)) {
      setLoading(false);
      setResponseError(false);
      return;
    }
    axios
      .post("https://sih-api.herokuapp.com/auth/login", {
        email: enteredEmail.trim(),
        password: enteredPassword,
      })
      .then((res) => {
        const userData = res.data;
        const expiryDate = new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        );
        localStorage.setItem("token", userData.token);
        localStorage.setItem("name", userData.name);
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        dispatch(
          userActions.login({
            userAuthInfo: { email: enteredEmail, password: enteredPassword },
          })
        );
        dispatch(
          userActions.login({
            userAuthInfo: {
              token: userData.token,
              userId: userData.userId,
              name: userData.name,
            },
          })
        );
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.message.includes(401)) {
          setPasswordError("Wrong Password");
        } else if (error.message.includes(422)) {
          setEmailError("User doesn't exist");
          setPasswordError(true);
        } else setResponseError("Something went wrong :(");
      });
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Sign in</h5>
        <div className={classes.thirdPartyServices}>
          <Button>
            <FacebookIcon />
          </Button>
          <Button>
            <AppleIcon />
          </Button>
          <Button>
            <GoogleIcon />
          </Button>
        </div>
        <form onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            size="small"
            onChange={(event) => {
              setEnteredEmail(event.target.value);
            }}
            value={enteredEmail}
            error={emailError}
            helperText={emailError}
            className={classes.textField}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            size="small"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
            }}
            value={enteredPassword}
            error={passwordError}
            helperText={passwordError}
          />
          {responseError ? (
            <div className={classes.responseError}>{responseError}</div>
          ) : null}
          <Button
            type="submit"
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "25px!important", height: "25px!important" }}
                color="inherit"
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className={classes.divider}>
          <hr />
          <div>
            <div>or</div>
          </div>
        </div>
        <Button
          className={classes.formButton + " " + classes.signUp}
          variant="contained"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
