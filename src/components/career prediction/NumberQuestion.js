import { FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./UserDetailsForm.module.css";

const NumberQuestion = (props) => {
  const [focus, setFocus] = useState(false);
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
      <FormLabel
        sx={{ color: focus ? "#1976d2" : "", transition: "color 0.2s ease" }}
        id={props.headerLabel}
      >
        {props.headerLabel}*
      </FormLabel>
      <TextField
        variant={props.type === "textarea" ? "outlined" : "standard"}
        // label={props.headerLabel}
        sx={{ marginTop: props.type === "textarea" ? "1rem" : "0" }}
        type={props.type}
        multiline={props.type === "textarea"}
        rows={props.type === "textarea" ? 4 : 1}
        size="small"
        onChange={(event) => {
          if (+event.target.value)
            props.onSelectAnswer(props.headerLabel, +event.target.value);
        }}
        error={props.error && !props.selectedAnswer}
        fullWidth
        helperText={
          props.error && !props.selectedAnswer ? "Enter a valid answer" : ""
        }
        placeholder={
          props.headerLabel.toLowerCase().includes("percentage")
            ? "Enter percentage"
            : props.paramLabel || "Enter answer"
        }
      />
    </div>
  );
};

export default NumberQuestion;
