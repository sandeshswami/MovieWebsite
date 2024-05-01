import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../api/apiCalls";
import PosterCard from "../components/PosterCard";
import { addData, addTopRated } from "../toolkit/slice/ApiData";
import { useDispatch, useSelector } from "react-redux";

function TopRated() {
  const [topRated, setTopRated] = useState([]);
  const [totalPage, setTotalPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const topRatedMoviesRedux = useSelector(
    (state) => state.AllData.topRatedMovies
  );
  useEffect(() => {
    if (!topRatedMoviesRedux) {
      getTopRatedMovies()
        .then((res) => res.json())
        .then((res) => {
          setTopRated(res.results);
          setTotalPage(res?.total_pages);
          dispatch(addTopRated(res));
          setCurrPage(res?.page);
        })
        .catch((e) => console.log(e));
    }
    setTopRated(topRatedMoviesRedux?.results);
    setTotalPage(topRatedMoviesRedux?.total_pages);
    setCurrPage(topRatedMoviesRedux?.page);
  }, []);
  const PaginationHandle = (page) => {
    getTopRatedMovies(page)
      .then((res) => res.json())
      .then((json) => {
        setTopRated(json?.results);
        setTotalPage(json?.total_pages);
        dispatch(addTopRated(json));
        setCurrPage(json?.page);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [PaginationHandle]);
  const handleNextPage = () => {
    setCurrPage(currPage + 1);
    PaginationHandle(currPage + 1);
  };

  const handlePrevPage = () => {
    setCurrPage(currPage - 1);
    PaginationHandle(currPage - 1);
  };
  return (
    <section>
      <div className="container-fluid">
        <div className="row ">
          {!topRated ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 500 }}
            >
              <div class="loader"></div>
            </div>
          ) : (
            topRated?.map((el) => (
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
      {topRated ? (
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
    </section>
  );
}

export default TopRated;
