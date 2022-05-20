import { Button, Zoom, Paper, Popper, Typography } from "@mui/material";
import { useState } from "react";
import Dashboard from "../layout/Dashboard";
import Pathway from "./PathwayDepiction";
import classes from "./Pathway.module.css";
import CareerStepper from "./CareerStepper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
let tmp;

const CareerPathway = (props) => {
  let strokeDashoffset = 458;
  const navigate = useNavigate();
  const pathway = useSelector((state) => state.user.userPath);
  const [currentStep, setCurrentStep] = useState(1);
  const [openPopper, setOpenPopper] = useState(1);
  const [anchorEl, setAnchorEl] = useState("");
  if (!pathway.prediction.length || !pathway.path.length) {
    return (
      <Dashboard>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <h5>No pathway available</h5>
          </div>
        </div>
      </Dashboard>
    );
  }
  const handleClick = (step) => (event) => {
    setCurrentStep(step);
    setOpenPopper(false);
    tmp = event.currentTarget;
    setTimeout(() => {
      setAnchorEl(tmp);
      setOpenPopper(step);
    }, 150);
  };

  switch (currentStep) {
    case 1:
      strokeDashoffset = 458;
      break;
    case 2:
      strokeDashoffset = 458 / 2;
      break;
    case 3:
      strokeDashoffset = 0;
      break;

    default:
      break;
  }
  return (
    <Dashboard>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <h5>Here's our prediction!</h5>
          <div className={classes.careerName}>{pathway.prediction}</div>

          <div className={classes.pathwayContainer}>
            {pathway.path.map((stepText, index) => (
              <Popper
                style={{ zIndex: 100 }}
                disablePortal={true}
                key={index}
                open={openPopper === index + 1}
                anchorEl={anchorEl}
                placement="bottom"
                className={classes.popper}
                transition
                
              >
                {({ TransitionProps }) => (
                  <Zoom {...TransitionProps}>
                    <Paper>
                      <Typography
                        sx={{
                          p: 2,
                          fontSize: window.innerWidth > 500 ? "1rem" : "0.9rem",
                        }}
                      >
                        {stepText}
                      </Typography>
                    </Paper>
                  </Zoom>
                )}
              </Popper>
            ))}
            <Pathway
              setPopper={(item) => {
                setAnchorEl(item);
              }}
              {...{ strokeDashoffset, handleClick, currentStep }}
            />
            <CareerStepper currentStep={currentStep} path={pathway.path} />
            <Button
              className={classes.formButton + " " + classes.signIn}
              variant="contained"
              onClick={() => {
                navigate("/predict-career");
              }}
            >
              predict again
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CareerPathway;
