import React from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import { useState } from "react";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  onPageChange: (pageNum: number) => void;
};

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handleClick = (pageNum: number) => {
    onPageChange(pageNum);
  };

  return (
    <div className={styles.mainContainer}>
      {pages
        .slice(
          currentPage < 5 ? 0 : currentPage - 5,
          currentPage <= 5
            ? totalPage > 10
              ? 10
              : totalPage
            : Math.min(totalPage, currentPage + 5)
        )
        .map((page, index) => {
          return (
            <button
              className={classNames(styles.pButton, {
                [styles.active]: page === currentPage,
              })}
              onClick={() => handleClick(page)}
              key={index}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
