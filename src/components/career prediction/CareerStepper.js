import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import classes from "./Pathway.module.css";

// const steps = ["lorem", "Create an ad group", "Create an ad"];

export default function CareerStepper(props) {
  return (
    <Box
      className={classes.stepper}
      sx={{ width: window.innerWidth > 500 ? "90%" : "105%" }}
    >
      <Stepper activeStep={props.currentStep - 1}>
        {props.path.map((label, index) => {
          return (
            <Step
              sx={{
                maxWidth: window.innerWidth > 500 ? "30%" : "100%",
              }}
              key={label}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
