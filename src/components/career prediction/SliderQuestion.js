import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import classes from "./UserDetailsForm.module.css";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "1",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 30,
    label: "3",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 50,
    label: "5",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 70,
    label: "7",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 90,
    label: "9",
  },
  {
    value: 100,
    label: "10",
  },
];

function valuetext(value) {
  return ``;
}
function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value);
}
export default function SliderQuestion(props) {
  const [focus, setFocus] = useState(false);
  const handleChange = (event, newValue) => {
    props.onSelectAnswer(props.headerLabel, newValue / 10);
  };

  return (
    <div
      className={classes.question}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
      <FormControl
        sx={{ width: "100%" }}
        error={props.error && props.chosenOption === undefined}
      >
        <FormLabel
          sx={{
            color: focus
              ? "#1976d2"
              : props.error && props.chosenOption === undefined
              ? "rgb(192 73 73)"
              : "",
            transition: "color 0.2s ease",
          }}
          id={props.headerLabel}
        >
          {props.headerLabel}*
        </FormLabel>
        <Box sx={{ width: "100%", padding: "0 10px" }}>
          <Slider
            aria-label="Always visible"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            step={null}
            marks={marks}
            valueLabelDisplay="auto"
          />
        </Box>
        <FormHelperText>
          {props.error && props.chosenOption === undefined
            ? "Enter a valid answer"
            : ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
// rgb(192 73 73)
