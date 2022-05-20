import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material";

const areaOfInterests = [
  { value: 2, area: "Aerospace" },
  { value: 9, area: "Architect" },
  { value: 23, area: "Animals" },
  { value: 6, area: "Auto cad" },
  { value: 24, area: "Bio chemical" },
  { value: 27, area: "Business" },
  { value: 29, area: "Business Administration" },
  { value: 15, area: "Business and law" },
  { value: 16, area: "Cloud computing" },
  { value: 13, area: "Computer" },
  { value: 31, area: "Corporate laws" },
  { value: 17, area: "Cyber Security" },
  { value: 0, area: "DataScientist" },
  { value: 21, area: "Dental" },
  { value: 28, area: "Economics" },
  { value: 8, area: "Electronics" },
  { value: 1, area: "Entrepreneur" },
  { value: 26, area: "Finance" },
  { value: 22, area: "Homeopathic Medicine" },
  { value: 7, area: "IOT" },
  { value: 4, area: "Manufacture goods" },
  { value: 18, area: "Medicine" },
  { value: 20, area: "Nursing" },
  { value: 19, area: "Physiotherapy" },
  { value: 5, area: "Production" },
  { value: 3, area: "Sound" },
  { value: 10, area: "Structural Engineer" },
  { value: 25, area: "Surgery" },
  { value: 14, area: "Technology" },
  { value: 12, area: "Transporatation" },
  { value: 11, area: "Water management" },
];
const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});
export default function AutocompleteField(props) {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="Area of interest"
        options={areaOfInterests}
        getOptionLabel={(option) => option.area}
        onChange={(event, newValue) => {
          props.onEnterInterest("Area of interest", newValue && newValue.value);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            error={
              props.error &&
              (props.chosenInterest === undefined ||
                props.chosenInterest === null)
            }
            helperText={
              props.error &&
              (props.chosenInterest === undefined ||
                props.chosenInterest === null)
                ? "Enter your area of Interest"
                : ""
            }
            variant="standard"
            label="Choose your area of interests"
            placeholder="Add your area of interests"
          />
        )}
      />
    </ThemeProvider>
  );
}
