import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import classes from "../career prediction/Pathway.module.css";

export default function DomainStepper(props) {
  return (
    <Box
      className={classes.stepper}
      sx={{ width: window.innerWidth > 500 ? "90%" : "105%" }}
    >
      <Stepper activeStep={[1, 2, 3]} alternativeLabel>
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
