import * as React from "react";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275, height: "100%" }} elevation={2}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.headerTop}
        </Typography>
        <Typography variant="h5" component="div">
          {props.mainHeader}
        </Typography>
        <Typography sx={{ mt: "1rem" }} variant="body2">
          {props.children}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button sx={{ fontWeight: 500, fontSize: 14, p: 1 }} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
