import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});
const RadioButton = ({
  headerLabel,
  options,
  onSelectAnswer,
  error,
  index,
  selectedAnswer,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl
        id={index}
        error={error && !selectedAnswer}
        sx={{ margin: "1rem 0" }}
      >
        <FormLabel id="demo-radio-buttons-group-label">
          {headerLabel}*
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) => {
            onSelectAnswer(headerLabel, e.target.value);
          }}
        >
          {options.map((option) => (
            <FormControlLabel
              sx={{ marginRight: { xs: 0 } }}
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText>
          {error && !selectedAnswer ? "Enter a valid answer" : ""}
        </FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
};

export default RadioButton;
