import React, { useEffect, useState } from "react";
import PosterCard from "../components/PosterCard";
import { addData, addUpcomingMovies } from "../toolkit/slice/ApiData";
import { getUpcomingMovies } from "../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);
  const [totalPage, setTotalPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const upcomingMoviesRedux = useSelector(
    (state) => state.AllData.upcomingMovies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!upcomingMoviesRedux) {
      getUpcomingMovies()
        .then((res) => res.json())
        .then((res) => {
          setUpcoming(res.results);
          setTotalPage(res?.total_pages);
          dispatch(addUpcomingMovies(res));
          setCurrPage(res?.page);
        })
        .catch((e) => console.log(e));
    }
    setUpcoming(upcomingMoviesRedux?.results);
    setTotalPage(upcomingMoviesRedux?.total_pages);
    setCurrPage(upcomingMoviesRedux?.page);
  }, []);
  const PaginationHandle = (page) => {
    getUpcomingMovies(page)
      .then((res) => res.json())
      .then((json) => {
        setUpcoming(json?.results);
        setTotalPage(json?.total_pages);
        dispatch(addUpcomingMovies(json));
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
          {!upcoming ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 500 }}
            >
              <div class="loader"></div>
            </div>
          ) : (
            upcoming?.map((el) => (
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
      {upcoming ? (
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

export default Upcoming;
