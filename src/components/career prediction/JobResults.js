import { Grid } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobResults = () => {
  const [jobResults, setJobResults] = useState();
  const fetchJobResults = useCallback(async () => {
    axios
      .get("URL")
      .then((response) => {
          
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchJobResults();
  }, [fetchJobResults]);
  return (
    <Grid container justifyContent="center" spacing={{ md: 1, xs: 0 }}>
      {jobResults.map((job, index) => (
        <JobCard
          key={index}
          careerName={job.job_title}
          companyName={job.companyname}
          location={job.companylocation}
          jobDescription={job.description}
          link={job.link}
        />
      ))}
    </Grid>
  );
};

export default JobResults;
