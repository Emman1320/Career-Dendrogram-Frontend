import { Button, Grid } from "@mui/material";
import { Zoom, Paper, Popper, Typography } from "@mui/material";
import { useState } from "react";
import Pathway from "./PathwayDepiction";
import CareerStepper from "./CareerStepper";
import Dashboard from "../layout/Dashboard";
import classes from "./Pathway.module.css";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

let tmp;
const SamplePrediction = (props) => {
  let strokeDashoffset = 458;
  const navigate = useNavigate();
  //   const pathway = useSelector((state) => state.user.userPath);
  const [currentStep, setCurrentStep] = useState(1);
  const [openPopper, setOpenPopper] = useState(1);
  const [anchorEl, setAnchorEl] = useState("");
  // if (!pathway.prediction.length || !pathway.path.length) {
  //   if (!pathway?.prediction?.length) {
  //     return (
  //       <Dashboard>
  //         <div className={classes.formContainer}>
  //           <div className={classes.form}>
  //             <h5>No pathway available</h5>
  //           </div>
  //         </div>
  //       </Dashboard>
  //     );
  //   }
  const handleClick = (step) => (event) => {
    setCurrentStep(step);
    setOpenPopper(false);
    tmp = event.currentTarget;
    setTimeout(() => {
      setAnchorEl(tmp);
      setOpenPopper(step);
    }, 150);
  };

  switch (currentStep) {
    case 1:
      strokeDashoffset = 458;
      break;
    case 2:
      strokeDashoffset = 458 / 2;
      break;
    case 3:
      strokeDashoffset = 0;
      break;

    default:
      break;
  }
  const jobsArray = [
    {
      job_title: "Software Engineer",
      companyname: "United Technology-Dharapuram",
      companylocation: "Chennai, Tamil Nadu",
      description: "Good Communication and basic programming skills required.",
      link: "https://in.indeed.com/company/united-technology/jobs/Software-Engineer-e84b8c82f5a634a7?fccid=e7e0c08452d8e5c9&vjs=3",
    },
    // {
    //   job_title: "Software Engineer",
    //   companyname: "Miracle Software Systems India Private Limited",
    //   companylocation: "Visakhapatnam, Andhra Pradesh",
    //   description: "Establish multi-platform versions of the software package.",
    //   link: "https://in.indeed.com/company/Miracle-Software-Systems-India-Private-Limited/jobs/Software-Engineer-20603eb14abd7f83?fccid=117b2ccb728e8c5a&vjs=3",
    // },
    {
      job_title: "Trainee Software Engineer",
      companyname: "Impiger Technologies",
      companylocation: "Chennai, Tamil Nadu+1 location",
      description: "View all Impiger Technologies jobs - Chennai jobs",
      link: "https://in.indeed.com/rc/clk?jk=b7b75992e139c501&fccid=ed17f0fa52b777fb&vjs=3",
    },
    // {
    //   job_title: "Software Test Engineer",
    //   companyname: "Weetech infomedia Pvt Ltd",
    //   companylocation: "Chennai, Tamil Nadu",
    //   description:
    //     "Strong in observing/analyzing issues and communicating issues with clear and precise description.",
    //   link: "https://in.indeed.com/company/Weetech-infomedia-Pvt-Ltd/jobs/Software-Test-Engineer-f80290701a5d9a32?fccid=97e083e30c787898&vjs=3",
    // },
    // {
    //   job_title: "QE - Software Engineer",
    //   companyname: "Walmart Global Tech India",
    //   companylocation: "Bengaluru, Karnataka",
    //   description:
    //     "Work with talented engineers and product visionaries to contribute to the vision and design of our web and mobile properties.",
    //   link: "https://in.indeed.com/rc/clk?jk=98220cad86d340fe&fccid=0d167dde0758739a&vjs=3",
    // },
    // {
    //   job_title: "Software Developer",
    //   companyname: "LateShipment.com",
    //   companylocation: "Chennai, Tamil Nadu",
    //   description: "Job Types: Full-time, Regular / Permanent.",
    //   link: "https://in.indeed.com/company/LateShipment.com/jobs/Software-Developer-27dc85e839fa6b25?fccid=99a55176ff2b6758&vjs=3",
    // },
  ];
  const pathway = [
    "B.E(CSE)/B.Tech.(IT)",
    "ME/MS/M.Tech with specialisation-cloud computing, Data Science, Cyber security..",
    "internships",
  ];

  // console.log(pathway);
  return (
    <Dashboard>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <h5>Here's our prediction!</h5>
          <div className={classes.careerName}>Software Engineering</div>

          <div className={classes.pathwayContainer}>
            {pathway.map((stepText, index) => (
              <Popper
                style={{ zIndex: 100 }}
                disablePortal={true}
                key={index}
                open={openPopper === index + 1}
                anchorEl={anchorEl}
                placement="bottom"
                className={classes.popper}
                transition
              >
                {({ TransitionProps }) => (
                  <Zoom {...TransitionProps}>
                    <Paper>
                      <Typography
                        sx={{
                          p: 2,
                          fontSize: window.innerWidth > 500 ? "1rem" : "0.9rem",
                        }}
                      >
                        {stepText}
                      </Typography>
                    </Paper>
                  </Zoom>
                )}
              </Popper>
            ))}
            <Pathway
              setPopper={(item) => {
                setAnchorEl(item);
              }}
              {...{ strokeDashoffset, handleClick, currentStep }}
            />
            <CareerStepper currentStep={currentStep} path={pathway} />
            <Grid container justifyContent="center" spacing={{ md: 1, xs: 0 }}>
              {jobsArray.map((job, index) => (
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
            <Button
              className={classes.formButton + " " + classes.signIn}
              variant="contained"
              onClick={() => {
                navigate("/predict-career");
              }}
            >
              predict again
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default SamplePrediction;
