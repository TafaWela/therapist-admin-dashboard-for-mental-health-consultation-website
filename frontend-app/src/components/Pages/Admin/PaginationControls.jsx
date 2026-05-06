function PaginationControls({ currentPage, setCurrentPage, pageCount, startIndex, itemsPerPage, totalItems }) {
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[13px] font-medium text-gray-500 bg-gray-50/30 gap-3">
      <span>Showing {Math.min(startIndex + 1, totalItems)} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} patients</span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 hover:bg-gray-100'}`}
        >Prev</button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#5C2D91] text-white' : 'border border-gray-200 hover:bg-gray-100 text-gray-700'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
          className={`px-3 py-1 border rounded ${currentPage === pageCount ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 hover:bg-gray-100'}`}
        >Next</button>
      </div>
    </div>
  );
}

export default PaginationControls;