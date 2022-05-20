import { Button, Grid } from "@mui/material";
import classes from "./JobCard.module.css";
import SuitCaseIcon from "../../assets/suitcase.svg";
import LocationIcon from "../../assets/location.svg";

const JobCard = (props) => {
  return (
    <Grid
      item
      sx={{ marginTop: "2.8rem" }}
      className={classes.jobCardContainer}
    >
      <h3>{props.careerName}</h3>
      <div className={classes.jobDetails}>
        <div>
          <img
            src={SuitCaseIcon}
            style={{ position: "relative", top: "-1px" }}
            alt=""
          />{" "}
          &nbsp;{props.companyName.toLowerCase()}
        </div>
        <div>
          <img src={LocationIcon} alt="" /> {props.location}
        </div>
      </div>
      <div className={classes.jobDesc}>{props.jobDescription}</div>
      <div className={classes.jobActions}>
        <a target="_blank" rel="noopener noreferrer" href={props.link}>
          <Button>Apply on Indeed</Button>
        </a>
      </div>
    </Grid>
  );
};

export default JobCard;
