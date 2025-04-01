"use client";
import { Genre } from "@/app/types";
import styles from "./GenreButton.module.scss";
import { useState } from "react";
import classNames from "classnames";

const GenreButton = ({ genre }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    console.log("girdi", selected);
    setSelected(!genre.selected);
  };
  return (
    <div
      key={genre.id}
      className={`genreButton ${genre.selected ? "selected" : ""}`}
      //onClick={handleClick}
    >
      {genre.name}
    </div>
  );
};

export default GenreButton;
