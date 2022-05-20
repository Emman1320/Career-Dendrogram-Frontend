import classes from "./CareerCard.module.css";
import React from "react";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const CareerCard = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cardClickHandler = () => {
    if (props.to === "/predict-career")
      if (user.isLoggedIn)
        if (user.userPath.prediction.length || user.userPath.path.length)
          navigate("/predict-career/pathway");
        else navigate("/predict-career");
      else {
        // props.onEnterOut();
        setTimeout(() => {
          navigate("/login");
        }, 400);
      }
    else navigate(props.to);
  };
  return (
    <Grid item sx={{ width: 400, marginTop: "2.8rem" }}>
      <div
        onClick={cardClickHandler}
        style={{ animationDelay: `${props.transitionDelay}s` }}
        className={`${classes.box} ${classes[props.color]}`}
      >
        <div className={classes.careerImage}>
          <img src={props.imageSrc} alt="" className={classes.careerImage} />
        </div>
        <h2>{props.header}</h2>
        <p className={classes.details}>{props.details}</p>
        <p className={classes.moreInfoText}>
          Click for more info <ChevronRight />
        </p>
      </div>
    </Grid>
  );
};
export default CareerCard;
