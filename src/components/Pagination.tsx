import React from 'react';

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, paginate, currentPage, handleNextPage, handlePreviousPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={handlePreviousPage}
            className={`px-3 py-2 leading-tight border border-gray-300 ${
              currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight border border-gray-300 ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 leading-tight border border-gray-300 ${
              currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
