import React from "react";
import "./Pagination.css";

const Pagination = ({ categoriesPerPage, totalCategories, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCategories / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link mr-2 paginationBtn"
              href="#"
              style={{ backgroundColor: "#ecedfc", color: "#3f51b5" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
