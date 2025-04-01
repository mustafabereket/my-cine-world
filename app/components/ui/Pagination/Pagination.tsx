import React from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const pages = new Array(totalPage).fill(true);

  const handleClick = (pageNum) => {
    onPageChange(pageNum);
  };

  return (
    <div className={styles.mainContainer}>
      {pages.map((page, index) => {
        return (
          <div
            className={classNames(styles.pButton, {
              [styles.active]: index + 1 === currentPage,
            })}
            onClick={() => handleClick(index + 1)}
            key={index + 1 + Math.random()}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
