import React, { useEffect, useState } from "react";
import PosterCard from "../components/PosterCard";
import { getAllMovies } from "../api/apiCalls";
import { useDispatch } from "react-redux";
import { addData } from "../toolkit/slice/ApiData";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movies?.length > 0) {
      return;
    }
    getAllMovies()
      .then((res) => res.json())
      .then((json) => {
        setMovies(json?.results);
        setTotalPage(json?.total_pages);
      })
      .catch((e) => console.log(e));
  }, []);
  const PaginationHandle = (page) => {
    getAllMovies(page)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json?.results);
        setTotalPage(json?.total_pages);
      })
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    PaginationHandle(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    PaginationHandle(currentPage - 1);
  };
  return (
    <div>
      <section>
        <div className="container-fluid">
          <div className="row ">
            {!movies ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: 500 }}
              >
                <div class="loader"></div>
              </div>
            ) : (
              movies?.map((el) => (
                <div
                  className="col-6 col-md-3 col-sm-4 col-lg-3 col-xl-2"
                  key={el.id}
                  onClick={() => dispatch(addData(el))}
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
      {movies ? (
        <div className="bg-danger d-flex justify-content-center py-2">
          <div className="d-flex gap-2 align-items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3"
            >
              Prev
            </button>
            <span>{currentPage}</span> / <span>{totalPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPage}
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
};

export default Home;
