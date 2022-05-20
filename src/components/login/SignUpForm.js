import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import classes from "./SignUpForm.module.css";
import FacebookIcon from "./FacebookIcon";
import AppleIcon from "./AppleIcon";
import GoogleIcon from "./GoogleIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isEmpty = (text) => text.trim().length === 0;
  const isPasswordCorrect = () => {
    if (enteredPassword.length < 8) {
      setEnteredPassword("");
      setPasswordError("Password is less than 8 characters");
      return true;
    } else if (enteredPassword !== enteredConfirmPassword) {
      setEnteredConfirmPassword("");
      setConfirmPasswordError("Passwords are not matching");
      return true;
    }

    return false;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setUserNameError(false);
    setLoading(true);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setResponseError(false);
    if (isEmpty(enteredUserName)) {
      setEnteredUserName("");
      setUserNameError("Enter a valid user name");
    }
    if (isEmpty(enteredEmail)) {
      setEnteredEmail("");
      setEmailError("Enter a valid email");
    }
    isPasswordCorrect();
    if (
      isEmpty(enteredUserName) ||
      isEmpty(enteredEmail) ||
      isPasswordCorrect()
    ) {
      setResponseError(false);
      setLoading(false);
      return;
    }
    axios
      .post("https://sih-api.herokuapp.com/auth/signup", {
        name: enteredUserName.trim(),
        email: enteredEmail.trim(),
        password: enteredPassword,
        cpassword: enteredConfirmPassword,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.message.includes(422)) {
          setUserNameError(true);
          setEmailError(true);
          setResponseError("User name or Email already exists");
        } else setResponseError("Something went wrong :(");
      });
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Sign up</h5>
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
            label="User Name"
            size="small"
            type="text"
            onChange={(event) => {
              setEnteredUserName(event.target.value);
            }}
            value={enteredUserName}
            error={userNameError}
            helperText={userNameError}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            label="Email"
            size="small"
            type="email"
            onChange={(event) => {
              setEnteredEmail(event.target.value);
            }}
            value={enteredEmail}
            error={emailError}
            helperText={emailError}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            label="Password"
            size="small"
            type="password"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
            }}
            value={enteredPassword}
            error={passwordError}
            helperText={passwordError}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            label="Confirm password"
            size="small"
            type="password"
            onChange={(event) => {
              setEnteredConfirmPassword(event.target.value);
            }}
            value={enteredConfirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordError}
          />
          {responseError ? (
            <div className={classes.responseError}>{responseError}</div>
          ) : null}
          <Button
            type="submit"
            className={classes.formButton + " " + classes.signUp}
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "25px!important", height: "25px!important" }}
                color="inherit"
              />
            ) : (
              "Sign Up"
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
          onClick={() => {
            navigate("/login");
          }}
          className={classes.formButton + " " + classes.signIn}
          variant="contained"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
