import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CareerPrediction from "./components/career prediction/CareerPrediction";
import CareerPathway from "./components/career prediction/CareerPathway";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user-slice";
import axios from "axios";
import CareerLibrary from "./components/Career library/CareerLibrary";
import CareerDomain from "./components/Career library/CareerDomain";
import DomainInfo from "./components/Career library/DomainInfo";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUsersListHandler = useCallback(async () => {
    axios
      .get("https://sih-api.herokuapp.com/portal/data")
      .then((response) => {
        const careerLibraryData = response.data.data;
        const convertedData = {};
        careerLibraryData.forEach((career) => {
          convertedData[career.domainName] = { ...career };
        });
        dispatch(
          userActions.addCareerLibraryData({ careerLibraryData: convertedData })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    if (localStorage.getItem("token")) {
      dispatch(
        userActions.login({
          userAuthInfo: {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name"),
          },
        })
      );
      const expiryDate = localStorage.getItem("expiryDate");
      if (new Date(expiryDate) <= new Date()) {
        dispatch(userActions.logout());
        return;
      }
    }
    if (user.userAuthInfo.token && user.isLoggedIn) {
      //get request
      axios
        .get("https://sih-api.herokuapp.com/api/output", {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("token") || user.userAuthInfo.token),
          },
        })
        .then((response) => {
          const mlOutput = response.data.result;
          dispatch(
            userActions.addPathway({
              prediction: mlOutput.prediction,
              mean: mlOutput.mean,
              path: mlOutput.whole1[0].slice(1),
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, user.isLoggedIn, user.userAuthInfo.token]);

  useEffect(() => {
    fetchUsersListHandler();
  }, [fetchUsersListHandler]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Dashboard
              smallText="Picking the right career is what makes one’s life successful."
              header="Predict your career now!"
            />
          }
        />
        <Route path="/career-prediction" />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/predict-career" element={<CareerPrediction />} />
        <Route path="/predict-career/pathway" element={<CareerPathway />} />
        <Route path="/career-library" element={<CareerLibrary />} />
        <Route path="/career-library/:careerPath" element={<CareerDomain />} />
        <Route
          path="/career-library/:careerPath/:subDomain"
          element={<DomainInfo />}
        />
      </Routes>
    </Router>
  );
};

export default App;
