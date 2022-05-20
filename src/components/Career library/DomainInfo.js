import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import classes from "./DomainInfo.module.css";

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
            {window.innerWidth > 500 ? (
              <h1 className={classes.domainHeader}>{subDomain}</h1>
            ) : null}
            <div className={classes.domainDesc}>
              {subDomainData?.description}
            </div>
          </div>
        </div>
        <div className={classes.domainPathway}></div>
      </div>
    </Dashboard>
  );
};

export default DomainInfo;
