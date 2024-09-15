// src/components/PaginationButton.tsx
import React from "react";

interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5; // Maximum number of pages to show in pagination
  const responsiveVisiblePages = window.innerWidth < 768 ? 3 : maxVisiblePages;

  let pages = [];

  // Always show the first page
  pages.push(
    <button
      key={1}
      onClick={() => onPageChange(1)}
      className={`px-3 py-1 border border-gray-600 rounded-lg mx-1 hover:bg-gray-700 hover:text-white transition duration-300 ${
        currentPage === 1 ? 'bg-gray-500 text-white' : 'text-gray-300'
      }`}
    >
      1
    </button>
  );

  // Show ellipsis if page > maxVisiblePages
  if (currentPage > responsiveVisiblePages) {
    pages.push(<span key="start-ellipsis" className="px-3 py-1 text-gray-300">...</span>);
  }

  // Show pages around the active page
  const startPage = Math.max(currentPage - 2, 2);
  const endPage = Math.min(currentPage + 2, totalPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 border border-gray-600 rounded-lg mx-1 hover:bg-gray-700 hover:text-white transition duration-300 ${
          currentPage === i ? 'bg-gray-500 text-white' : 'text-gray-300'
        }`}
      >
        {i}
      </button>
    );
  }

  // Show ellipsis before the last page if there's a gap
  if (currentPage + 2 < totalPages - 1) {
    pages.push(<span key="end-ellipsis" className="px-3 py-1 text-gray-300">...</span>);
  }

  // Always show the last page if totalPages > 1
  if (totalPages > 1) {
    pages.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`px-3 py-1 border border-gray-600 rounded-lg mx-1 hover:bg-gray-700 hover:text-white transition duration-300 ${
          currentPage === totalPages ? 'bg-gray-500 text-white' : 'text-gray-300'
        }`}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center space-x-2 p-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border border-gray-600 rounded-lg mx-1 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Prev
      </button>
      {pages}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border border-gray-600 rounded-lg mx-1 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
