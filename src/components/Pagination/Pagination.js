import React from "react";

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
            <a onClick={() => paginate(number)} className="page-link" href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
