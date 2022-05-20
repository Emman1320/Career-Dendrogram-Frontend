import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

import "./Carousel.css";

const HeroCarousel = () => {
  const SettingsT = {
    autoPlay: true,
    animation: "slide",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true,
  };
  return (
    <div style={{ color: "#494949" }} className={"mobile"}>
      <Carousel className="SecondExample" {...SettingsT}>
        {items.map((item, index) => {
          return <Project item={item} key={index} />;
        })}
      </Carousel>
    </div>
  );
};

function Project({ item }) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: item.color,
      }}
      elevation={10}
    >
      <img
        src={item.src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Paper>
  );
}

const items = [
  {
    name: "Lear Music Reader",
    description: "A PDF Reader specially designed for musicians.",
    color: "#64ACC8",
    src: "https://images.immediate.co.uk/production/volatile/sites/4/2021/06/GettyImages-978768476-752f180.jpg?webp=true&quality=90&resize=940%2C399",
  },
  {
    name: "Hash Code 2019",
    description:
      "My Solution on the 2019 Hash Code by Google Slideshow problem.",
    color: "#7D85B1",
    src: "https://images.news18.com/ibnlive/uploads/2021/09/bamboo-day.jpg",
  },
  {
    name: "Terrio",
    description: "A exciting mobile game game made in the Unity Engine.",
    color: "#CE7E78",
    src: "https://cdn.britannica.com/28/75928-050-66951F06/species-bamboo-islands-Asia-oceans-Pacific-Indian.jpg",
  },
  {
    name: "React Carousel",
    description: "A Generic carousel UI component for React using material ui.",
    color: "#C9A27E",
    src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
  },
];

export default HeroCarousel;
