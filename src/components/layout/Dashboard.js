import Footer from "./Footer";
import Navbar from "./Navbar";
import classes from "./Dashboard.module.css";
import { useLocation, useParams } from "react-router-dom";
import { Fragment, useLayoutEffect, useState } from "react";
import NavCard from "../home/NavCard";

let history = [];
export default function Dashboard(props) {
  const [animation, setAnimation] = useState("");
  const { careerPath, subDomain } = useParams();
  const location = useLocation();
  useLayoutEffect(() => {
    history.push(location.pathname);
    // console.log(location.pathname);
    if (
      location.pathname === "/predict-career" ||
      location.pathname ===
        `/career-library/${careerPath
          ?.replaceAll(" ", "%20")
          .replaceAll("|", "%7C")}/${subDomain
          ?.replaceAll(" ", "%20")
          .replaceAll("|", "%7C")}` ||
      location.pathname === "/search"
    ) {
      if (history[history.length - 2]) {
        setAnimation(classes.predictCareer);
      } else {
        setAnimation(classes.predictCareerOpening);
      }
    } else if (
      location.pathname === "/" &&
      (history[history.length - 2] === "/predict-career" ||
        history[history.length - 2] === "/search")
    ) {
      setAnimation(classes.predictCareer_rev);
    }
    if (window.innerWidth > 800) {
      if (
        location.pathname === "/login" &&
        history[history.length - 2] === "/predict-career"
      ) {
        setAnimation(classes.predictCareer_rev + " " + classes.signIn);
      } else if (
        history[history.length - 2] === "/login" &&
        location.pathname === "/sign-up"
      ) {
        setAnimation(classes.home);
      } else if (
        history[history.length - 2] === "/login" &&
        location.pathname === "/"
      ) {
        setAnimation(classes.home);
      } else if (location.pathname === "/login") {
        setAnimation(classes.signIn);
      } else if (
        location.pathname === "/predict-career/pathway" &&
        history[history.length - 2] === "/predict-career"
        //   ||
        // location.pathname ===
        //   `/career-library/${careerPath
        //     ?.replaceAll(" ", "%20")
        //     .replaceAll("|", "%7C")}`
      ) {
        setAnimation(classes.predictCareer_rev);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const enterOutAnimation = () => {
    setAnimation(classes.homeAnimation);
  };
  return (
    <Fragment>
      <div
        className={`${classes.dashboardContainer} ${animation} ${
          classes[careerPath?.split(" ")[0]]
        } ${careerPath && classes.careerPath} ${
          subDomain && classes.subDomain
        }`}
      >
        <Navbar onEnterOut={enterOutAnimation} />

        <div className={classes.bottomContainer}>
          <h1>
            <div className={classes.inside}>{props.header}</div>
          </h1>
          <div className={classes.smallText}>
            <div className={classes.inside}>{props.smallText}</div>
          </div>
        </div>

        <div className={classes.bottomTriangle}></div>
      </div>
      {props.children}
      {/* <SearchResults /> */}
      {location.pathname === "/" ? (
        <div className={`${classes.navCards} ${animation}`}>
          <NavCard
            color="red"
            transitionDelay={0}
            onEnterOut={enterOutAnimation}
            to="/career-library"
            header="Career Library"
            details="Having a career that aligns with who you are will make you an energetic, positive, and makes your life outside of work better. "
            imageSrc="https://assets.codepen.io/2301174/icon-team-builder.svg"
          />
          <NavCard
            color="cyan"
            transitionDelay={0.2}
            onEnterOut={enterOutAnimation}
            to="/predict-career"
            header="Predict your career"
            details="These predictions if not planned for correctly, can have a direct impact on your career growth and job search"
            imageSrc="https://assets.codepen.io/2301174/icon-karma.svg"
          />
        </div>
      ) : null}
      <Footer />
    </Fragment>
  );
}
