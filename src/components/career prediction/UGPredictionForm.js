import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import classes from "./UserDetailsForm.module.css";
import RadioButton from "../UI/RadioButton";
import AutoCompleteFieldUG from "./AutoCompleteFieldUG";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";
import NumberQuestion from "./NumberQuestion";
import { predictionQuestions_1 } from "./predictionQuestions";
import SliderQuestion from "./SliderQuestion";
const UGPredictionForm = () => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, user?.isLoggedIn]);
  const answerSelectHandler = (question, answer) => {
    setAnswers((prevState) => {
      return { ...prevState, [`${question}`]: answer };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setError(false);
    setResponseError(false);
    setLoading(true);
    const questions = [];
    predictionQuestions_1.forEach((question) => {
      questions.push(question.headerLabel);
    });
    const questionsAnswered = Object.keys(answers);

    if (questions.length !== questionsAnswered.length) {
      setError(true);
      setLoading(false);
      setResponseError(false);
      return;
    }
    let questionNotAnswered = false;
    const answersArray = questions.map((question) => {
      if (answers[question] === null || answers[question].length === 0) {
        questionNotAnswered = true;
        return null;
      } else {
        return answers[question];
      }
    });

    if (questionNotAnswered) {
      setError(true);
      setLoading(false);
      setResponseError(false);
      return;
    }
    console.log([
      ...answersArray.slice(0, 28),
      Math.random() < 0.5 ? "work" : "salary",
      ...answersArray.slice(28),
    ]);
    axios
      .post("http://127.0.0.1:5000/cses", {
        input: [
          ...answersArray.slice(0, 28),
          Math.random() < 0.5 ? "work" : "salary",
          ...answersArray.slice(28),
        ],
      })
      .then((response) => {
        const mlOutput = response.data;
        dispatch(
          userActions.addPathway({
            prediction: mlOutput.prediction,
            mean: 0,
            jobsAvailable: mlOutput.data_acquired,
          })
        );
        console.log(mlOutput);
        navigate("/predict-career/pathway");
        axios
          .post(
            "https://sih-api.herokuapp.com/api/output",
            {
              prediction: mlOutput.prediction,
              mean: 0,
              whole1: mlOutput.data_acquired,
            },
            {
              headers: {
                Authorization: "Bearer " + user.userAuthInfo.token,
              },
            }
          )
          .then((response) => {});
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setResponseError("Something went wrong :(");
      });
    // https://forestclassifier-api.herokuapp.com/post
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Fill the details</h5>
        <div className={classes.radioQuestions}>
          {predictionQuestions_1.map((question, index) => {
            switch (question.type) {
              case "radio":
                return (
                  <RadioButton
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "number":
                return (
                  <NumberQuestion
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "range":
                return (
                  <SliderQuestion
                    key={index}
                    {...{ ...question, error }}
                    onSelectAnswer={answerSelectHandler}
                    error={error}
                    chosenOption={answers[question.headerLabel]}
                  />
                );
              case "text":
                return (
                  <NumberQuestion
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "textarea":
                return (
                  <NumberQuestion
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "select":
                return (
                  <AutoCompleteFieldUG
                    key={index}
                    {...{ ...question, error }}
                    onEnterAnswer={answerSelectHandler}
                    error={error}
                    chosenOption={answers[question.headerLabel]}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
        {responseError ? (
          <div className={classes.responseError}>{responseError}</div>
        ) : null}
        <div className={classes.userDetailsForm_actions}>
          <Button
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
            // onClick={submitHandler}
            onClick={() => {
              navigate("/predict-career/pathway");
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "25px!important", height: "25px!important" }}
                color="inherit"
              />
            ) : (
              "predict"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UGPredictionForm;
