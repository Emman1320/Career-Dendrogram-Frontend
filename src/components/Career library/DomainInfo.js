import { CardHeader } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Graph from "../charts/Graph";
import Dashboard from "../layout/Dashboard";
import classes from "./DomainInfo.module.css";

const INCOME_CHART_DATA = [
  {
    name: "Bottom 10%",
    type: "area",
    data: [23, 11, 30, 15, 23, 10, 37, 21],
  },
  {
    name: "Median salary",
    type: "area",
    data: [30, 25, 40, 30, 45, 35, 54, 42],
  },
  {
    name: "Top 10%",
    type: "line",
    data: [40, 35, 56, 35, 58, 45, 69, 52],
  },
];
const JOB_CHART_DATA = [
  {
    name: "Job openings",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21],
  },
];

const skillsRequired = [
  "creativity",
  "Attention to detail",
  "Critical thinking",
  "Problem-solving",
  "Time management",
  "Mathematics",
  "Communication",
  "Leadership",
];

const DomainInfo = () => {
  const { careerPath, subDomain } = useParams();
  const careerPathData = useSelector(
    (state) => state.user.careerLibraryData[careerPath]
  );
  const subDomainsData = {};
  careerPathData?.subDomains?.forEach((subDomain) => {
    subDomainsData[subDomain.name] = { ...subDomain };
  });

  const subDomainData = subDomainsData[subDomain];

  return (
    <Dashboard>
      <div className={classes.domainInfoContainer}>
        <div className={classes.domainAbout}>
          {window.innerWidth <= 500 ? (
            <h1 className={classes.domainHeader}>{subDomain}</h1>
          ) : null}
          <div className={classes.domainImage}>
            <img src={subDomainData?.imageUrl} alt="" />
          </div>
          <div>
            {window.innerWidth >= 500 ? (
              <h1 className={classes.domainHeader}>{subDomain}</h1>
            ) : null}
            <div className={classes.domainDesc}>
              {subDomainData?.description}
            </div>
          </div>
        </div>
        <div className={classes.domainInfo}>
          <div className={classes.left}>
            <div className={classes.card}>
              <Graph
                cardHeader="Career Income"
                subHeader="for the past 8 years"
                chartData={INCOME_CHART_DATA}
                formatter={(y) => `$${y.toFixed(0)}k`}
                strokeWidth={[2, 2, 3]}
                fill={["gradient", "gradient", "solid"]}
              />
            </div>
            <div className={classes.currentYearSalaryInfo + " " + classes.card}>
              <h3>Career Income statistics for 2021</h3>
              <div>
                <div>
                  <h4>Bottom 10%</h4>
                  <div>$25K</div>
                </div>
                <div>
                  <h4>Median</h4>
                  <div>$40k</div>
                </div>
                <div>
                  <h4>Top 10%</h4>
                  <div>$100k</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.card + " " + classes.skillsRequired}>
              <h3>Skills Required</h3>
              <div>
                {skillsRequired.map((skill, index) => (
                  <div key={index} className={classes.chip}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.currentYearJobInfo + " " + classes.card}>
              <h3>Job Outlook for 2021</h3>
              <div>
                <div>
                  <h4>Projected growth</h4>
                  <div>+10%</div>
                </div>
                <div>
                  <h4>New Jobs</h4>
                  <div>1k</div>
                </div>
                <div>
                  <h4>Automation Risk</h4>
                  <div>60%</div>
                </div>
              </div>
            </div>
            <div className={classes.card}>
              <Graph
                cardHeader="Job openings"
                subHeader="for the past 8 years"
                chartData={JOB_CHART_DATA}
                formatter={(y) => `${y.toFixed(0)}k`}
                strokeWidth={[0, 2, 3]}
                fill={["solid", "gradient", "solid"]}
              />
            </div>
          </div>
        </div>
        <div className={classes.domainPathway}></div>
      </div>
    </Dashboard>
  );
};

export default DomainInfo;
