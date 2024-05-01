import React, { useEffect, useState } from "react";
import useQuery from "../hook/Query";
import { getSearchResult } from "../api/apiCalls";
import PosterCard from "../components/PosterCard";

function SearchPage() {
  const query = useQuery();
  const title = query.get("title");
  const [searchResult, setSearchResult] = useState("");
  const [totalPage, setTotalPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    getSearchResult(title)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res);
        setTotalPage(res?.total_pages);
        setCurrPage(res.page);
      })
      .catch((e) => console.log(e));
  }, [title]);
  const PaginationHandle = (page) => {
    getSearchResult(title, page)
      .then((res) => res.json())
      .then((json) => {
        if (json.results) {
          setSearchResult(json);
          setTotalPage(json?.total_pages);
          setCurrPage(json?.page);
          return;
        }
        alert("No data Found");
      })
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  };
  const handleNextPage = () => {
    setCurrPage(currPage + 1);
    PaginationHandle(currPage + 1);
  };

  const handlePrevPage = () => {
    setCurrPage(currPage - 1);
    PaginationHandle(currPage - 1);
  };
  return (
    <div>
      <section>
        <div className="container-fluid">
          <div className="row ">
            {!searchResult?.results ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: 500 }}
              >
                <div class="loader"></div>
              </div>
            ) : (
              searchResult?.results?.map((el) => (
                <div
                  className="col-6 col-md-3 col-sm-4 col-lg-3 col-xl-2"
                  key={el.id}
                >
                  <PosterCard
                    title={el.title}
                    imageUrl={el.poster_path}
                    rating={el.vote_average}
                    id={el.id}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {searchResult?.results ? (
        <div className="bg-danger d-flex justify-content-center py-2">
          <div className="d-flex gap-2 align-items-center">
            <button
              onClick={handlePrevPage}
              disabled={currPage === 1}
              className="px-3"
            >
              Prev
            </button>
            <span>{currPage}</span> / <span>{totalPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currPage === totalPage}
              className="px-3"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchPage;
