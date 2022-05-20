import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import classes from "./UserDetailsForm.module.css";
import RadioButton from "../UI/RadioButton";
import AutoCompleteField from "./AutoCompleteField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";
import NumberQuestion from "./NumberQuestion";

const radioQuestions = [
  {
    headerLabel: "Your 12th CGPA",
    options: [
      { label: "100 - 80", value: 2 },
      { label: "79 - 50", value: 1 },
      { label: "Below 50", value: 0 },
    ],
  },
  {
    headerLabel: "Economic Stability",
    options: [
      { label: "Economically weak", value: 0 },
      {
        label: "Transient poor (Hard situations might make them poor)",
        value: 1,
      },
      { label: "Non poor (Rich)", value: 2 },
    ],
  },
  {
    headerLabel: "Personality Extraversion",
    options: [
      { label: "Extrovert", value: 0 },
      {
        label: "Ambivert",
        value: 1,
      },
      { label: "Introvert", value: 2 },
    ],
  },
  {
    headerLabel: "Agreeableness",
    options: [
      { label: "Agreeable", value: 0 },
      {
        label: "Slightly agreeable",
        value: 1,
      },
      { label: "Disagree mostly", value: 2 },
    ],
  },
  {
    headerLabel: "Openness",
    options: [
      { label: "Open in nature", value: 0 },
      {
        label: "Opens for need",
        value: 1,
      },
      { label: "Closed nature", value: 2 },
    ],
  },
];

const UserDetailsForm = () => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [
    navigate,
    user.isLoggedIn,
    user.userPath.path.length,
    user.userPath.prediction.length,
  ]);
  const answerSelectHandler = (question, answer) => {
    setAnswers((prevState) => {
      return { ...prevState, [`${question}`]: answer };
    });
  };
  const submitHandler = (event) => {
    setError(false);
    setResponseError(false);
    setLoading(true);
    const questions = [];
    radioQuestions.forEach((question) => {
      questions.push(question.headerLabel);
    });
    questions.push("Area of interest");
    const questionsAnswered = Object.keys(answers);

    if (
      questions.length !== questionsAnswered.length ||
      answers["Area of interest"] === null ||
      answers["Area of interest"] === undefined
    ) {
      setError(true);
      setLoading(false);
      setResponseError(false);
      return;
    }
    const answersArray = questions.map((question) => +answers[question]);
    axios
      .post("https://forestclassifier-api.herokuapp.com/post", {
        input: [...answersArray],
      })
      .then((response) => {
        const mlOutput = response.data;
        dispatch(
          userActions.addPathway({
            prediction: mlOutput.prediction,
            mean: mlOutput.mean,
            path: mlOutput.whole1[0].slice(1),
          })
        );
        axios
          .post(
            "https://sih-api.herokuapp.com/api/output",
            { ...mlOutput },
            {
              headers: {
                Authorization: "Bearer " + user.userAuthInfo.token,
              },
            }
          )
          .then((response) => {
            navigate("/predict-career/pathway");
          });
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
          {radioQuestions.map((radioQuestion, index) => (
            <RadioButton
              key={index}
              {...{
                ...radioQuestion,
                index,
                onSelectAnswer: answerSelectHandler,
                error,
                selectedAnswer: answers[radioQuestion.headerLabel],
              }}
            />
          ))}
        </div>

        <AutoCompleteField
          onEnterInterest={answerSelectHandler}
          error={error}
          chosenInterest={answers["Area of interest"]}
        />
        <NumberQuestion />
        {responseError ? (
          <div className={classes.responseError}>{responseError}</div>
        ) : null}
        <div className={classes.userDetailsForm_actions}>
          <Button
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
            onClick={submitHandler}
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

export default UserDetailsForm;
