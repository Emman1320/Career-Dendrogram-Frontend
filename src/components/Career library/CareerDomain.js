import { useParams } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import data from "../../data.json";
import CareerCard from "./CareerCard";
import classes from "./CareerDomain.module.css";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const cardColor = {
  Engineering: "orange",
  "Computer Science & It": "blue",
  Business: "blue",
  "Medical Science": "blue",
  Others: "blue",
};

const CareerDomain = () => {
  const { careerPath } = useParams();
  const careerLibraryData = useSelector(
    (state) => state.user.careerLibraryData
  );
  const careerData = careerLibraryData[careerPath];

  return (
    <Dashboard header={careerPath} smallText={careerData?.desc}>
      {/* <div className={classes.heroImage} style={{ background }}></div> */}
      <Grid
        container
        justifyContent="center"
        spacing={{ md: 1, xs: 0 }}
        sx={{ marginTop: "-1.5rem !important", marginBottom: "8rem" }}
      >
        {careerData?.subDomains?.map((subDomain, index) => (
          <CareerCard
            color={cardColor[careerPath]}
            key={index}
            transitionDelay={0}
            to={`/career-library/${careerPath}/${subDomain?.name}`}
            header={subDomain?.name}
            details={
              subDomain?.description.length > 175
                ? subDomain?.description.substring(
                    0,
                    window.innerWidth > 600 ? 175 : 140
                  ) + "..."
                : subDomain?.description
            }
            imageSrc={subDomain?.imageUrl}
          />
        ))}
      </Grid>
    </Dashboard>
  );
};

export default CareerDomain;
