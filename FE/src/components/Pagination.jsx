import { useEffect, useState } from "react";
import "./pagination.css";

function Pagination(props) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const insertPages = () => {
      const pagesArray = [];
      for (let i = 1; i <= props.totalPage; i++) {
        pagesArray.push(i);
      }
      setPages(pagesArray);
    };
    insertPages();
  }, [props.totalPage]);

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              props.setCurrentPage(page);
            }}
            className={page === props.currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
