import React from "react";
import styles from "./Footer.module.scss";
import tmdbLogo from "../../../public/tmdb.svg";
import Image from "next/image";
const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div>
        <Image
          alt={`tmdb attribute`}
          src={tmdbLogo}
          width={200}
          height={100}
        ></Image>
      </div>
      <h5>
        This personal fun project uses free and public API provided by{" "}
        <a href="https://www.themoviedb.org/">https://www.themoviedb.org</a>
      </h5>
    </div>
  );
};

export default Footer;
