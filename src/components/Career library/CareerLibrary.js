import { Grid } from "@mui/material";
import Dashboard from "../layout/Dashboard";
import CareerCard from "./CareerCard";
import OtherCareerImage from "../../assets/other careers.jpg";
import classes from "./CareerLibrary.module.css";

const CareerLibrary = () => {
  return (
    <Dashboard
      header="Career Library"
      smallText="Discover your perfect career🚀"
    >
      <Grid
        container
        justifyContent="center"
        spacing={{ md: 1, xs: 0 }}
        sx={{ marginTop: "-14rem !important", marginBottom: "8rem" }}
      >
        <CareerCard
          color="red"
          transitionDelay={0}
          // onEnterOut={enterOutAnimation}
          to="/career-library/Engineering"
          header="Engineering"
          details="Science can amuse and fascinate us all, but it is Engineering that changes the world."
          imageSrc="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />

        <CareerCard
          color="cyan"
          transitionDelay={0}
          // onEnterOut={enterOutAnimation}
          to="/career-library/Computer Science & It"
          header="Computer Science & It"
          details="The computer was born to solve problems that did not exist before. It is the blood and life of any hardware we have."
          imageSrc="https://rca-media2.rca.ac.uk/images/CSRC.original.2e16d0ba.fill-1440x530.jpg"
        />

        <CareerCard
          color="orange"
          transitionDelay={0}
          // onEnterOut={enterOutAnimation}
          to="/career-library/Business"
          header="Business"
          details="If opportunity doesn't knock, build a door.  Don't sit down and wait for the opportunities to come. Get up and make them."
          imageSrc="https://img.freepik.com/free-photo/business-man-holding-bright-light-bulb-hand_28629-1091.jpg?size=626&ext=jpg&ga=GA1.2.2111392594.1639612800"
        />
        <CareerCard
          color="red"
          transitionDelay={0}
          // onEnterOut={enterOutAnimation}
          to="/career-library/Medical Science"
          header="Medical Science"
          details="Health is Wealth! An industry that never fades away with time."
          imageSrc="https://cdn.pixabay.com/photo/2016/11/10/02/47/blood-1813410__340.jpg"
        />
        <CareerCard
          color="blue"
          transitionDelay={0}
          // onEnterOut={enterOutAnimation}
          to="/career-library/Others"
          header="Others"
          details="Life is all about choices!  Choose them carefully to live the one life that we're gifted with."
          imageSrc="https://www.york.ac.uk/media/study/courses/postgraduate/music/music-production-banner.jpg"
        />
      </Grid>
    </Dashboard>
  );
};

export default CareerLibrary;
