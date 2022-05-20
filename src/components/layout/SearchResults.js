import React, { useState } from "react";
import "./style.css";

const SearchResultCard = () => {
  const [animation, setAnimation] = useState("");
  const onMouseOverHandler = () => {
    setAnimation("mouseOver");
  };
  const onMouseLeaveHandler = () => {
    setAnimation("mouseLeave");
  };
  return (
    <div
      className={`card ${animation}`}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="additional">
        <div className="user-card">
          <img
            className="career_img"
            src="https://www.careerhunter.io/uploads/images/211/Astronaut.jpg"
            alt=""
          />
        </div>
        <div className="more-info">
          <h1>Astronaut</h1>
          <div className="coords">
            <span>NASA</span>
            <span>Since 1957</span>
          </div>
          <div className="coords">
            <span>Commander</span>
            <span> Washington, D.C., US</span>
          </div>
          <div className="stats">
            <div>
              <div className="title">PEOPLE HIRED</div>
              <i className="fa fa-trophy"></i>
              <div className="value">10</div>
            </div>
    
            <div>
              <div className="title">JOB available</div>
              <i className="fa fa-coffee"></i>
              <div className="value">5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="general">
        <h1>Astronaut</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
          volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut
          pulvinar.
        </p>
      </div>
    </div>
  );
};

const SearchResults = () => {
  return (
    <div className="formContainer">
      <div className="form">
        <SearchResultCard />
      </div>
    </div>
  );
};

export default SearchResults;
