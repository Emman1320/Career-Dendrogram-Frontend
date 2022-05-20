/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import classes from "./Footer.module.css";
import { Link } from "@mui/material";
const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.links}>
        <div className={classes.link}>
          <Link>Company</Link>
        </div>
        <div className={classes.link}>
          <Link>About Us</Link>
        </div>
        <div className={classes.link}>
          <Link>Team</Link>
        </div>
        <div className={classes.link}>
          <Link>Product</Link>
        </div>
        <div className={classes.link}>
          <Link>Blog</Link>
        </div>
      </div>
      <div className={classes.socialMediaContainer}>
        <Facebook />
        <Twitter />
        <Instagram />
        <Pinterest />
        <LinkedIn />
      </div>
    </div>
  );
};

export default Footer;
