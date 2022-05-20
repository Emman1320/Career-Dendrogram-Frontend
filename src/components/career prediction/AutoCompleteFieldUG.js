import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import classes from "./UserDetailsForm.module.css";
import {
  createTheme,
  FormLabel,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});
export default function AutocompleteField(props) {
  const [focus, setFocus] = React.useState(false);
  return (
    <ThemeProvider theme={theme}>
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
        <Autocomplete
          options={props.options}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            props.onEnterAnswer(props.headerLabel, newValue && newValue.value);
          }}
          aria-labelledby={props.headerLabel}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              error={
                props.error &&
                (props.chosenOption === undefined ||
                  props.chosenOption === null)
              }
              helperText={
                props.error &&
                (props.chosenOption === undefined ||
                  props.chosenOption === null)
                  ? "Enter a valid option"
                  : ""
              }
              variant="standard"
              label={""}
              placeholder={props.paramLabel}
            />
          )}
        />
      </div>
    </ThemeProvider>
  );
}
