import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import './pagination.scss'; 

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="pagination__navigation">
          <GrPrevious />
      </button>
      <ul className="pagination__list">
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination__item ${number === currentPage ? 'active' : ''}`}>
            {number}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="pagination__navigation">
          <GrNext />
      </button>
    </div>
  );
}

export default Pagination;
