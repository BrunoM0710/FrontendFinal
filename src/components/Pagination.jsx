const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="btn btn-secondary"
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </button>

      <button
        className="btn btn-primary"
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
