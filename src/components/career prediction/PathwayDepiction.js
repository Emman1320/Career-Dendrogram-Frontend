import classes from "./Pathway.module.css";
import { FlagCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLayoutEffect, useRef } from "react";

const Pathway = (props) => {
  const pathButtonRef = useRef();
  useLayoutEffect(() => {
    props.setPopper(pathButtonRef.current);
  }, []);
  return (
    <div className={classes.pathway}>
      <svg className={classes.svgPathway} xmlns="http://www.w3.org/2000/svg">
        <path d="M 5 80 C 30 -20 130 -20 155 80 S 280 180 305 80" />
      </svg>
      <svg
        className={classes.svgPathwayOverlay}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{
            strokeDashoffset: props.strokeDashoffset,
          }}
          d="M 5 80 C 30 -20 130 -20 155 80 S 280 180 305 80"
        />
      </svg>
      <div className={classes.pathwayButtons}>
        {[1, 2, 3].map((step) => (
          <IconButton
            sx={{
              backgroundColor: `${
                props.currentStep >= step ? "#dfffe0c7" : "#eeeeeec7"
              }`,
              transform: window.innerWidth < 500 ? "scale(1.2)" : "",
            }}
            onClick={props.handleClick(step)}
            key={step}
            {...{ ref: step === 1 ? pathButtonRef : null }}
          >
            <FlagCircle
              className={props.currentStep >= step ? classes.active : ""}
            />
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default Pathway;
