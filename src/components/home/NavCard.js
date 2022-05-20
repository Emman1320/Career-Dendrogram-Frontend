import React from "react";
import classes from "./NavCard.module.css";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavCard = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cardClickHandler = () => {
    if (props.to === "/predict-career")
      if (user.isLoggedIn)
        if (user.userPath.prediction.length || user.userPath.path.length)
          navigate("/predict-career/pathway");
        else navigate("/predict-career");
      else {
        props.onEnterOut();
        setTimeout(() => {
          navigate("/login");
        }, 400);
      }
    else {
      props.onEnterOut();
      setTimeout(() => {
        navigate(props.to);
      }, 400);
    }
  };
  return (
    <div
      onClick={cardClickHandler}
      style={{ animationDelay: `${props.transitionDelay}s` }}
      className={`${classes.box} ${classes[props.color]}`}
    >
      <h2>{props.header}</h2>
      <p className={classes.details}>{props.details}</p>
      <p className={classes.moreInfoText}>
        Click for more info <ChevronRight />
      </p>
      <img className={classes.icon} src={props.imageSrc} alt="" />
    </div>
  );
};
export default NavCard;
