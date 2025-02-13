import React from "react";
import style from "./page.module.scss";
import BackButton from "../../components/ui/BackButton/BackButton";
import WatchListItems from "@/app/components/WatchListItems/WatchListItems";

const WatchList = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <h1>My Watch List</h1>
        <BackButton />
      </div>
      <WatchListItems />
    </div>
  );
};

export default WatchList;
