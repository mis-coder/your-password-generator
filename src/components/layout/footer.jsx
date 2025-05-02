import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>
        Built by{" "}
        <a href="https://www.antraverma.com/" target="_blank">
          Antra Verma
        </a>
      </p>
    </footer>
  );
};

export default Footer;
