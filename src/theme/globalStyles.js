// material
import { useTheme } from "@mui/material/styles";
import { GlobalStyles as GlobalThemeStyles } from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <GlobalThemeStyles
      styles={{
        // Lazy Load Img
        ".blur-up": {
          WebkitFilter: "blur(5px)",
          filter: "blur(5px)",
          transition: "filter 400ms, -webkit-filter 400ms",
        },
        ".blur-up.lazyloaded ": {
          WebkitFilter: "blur(0)",
          filter: "blur(0)",
        },
      }}
    />
  );
}
