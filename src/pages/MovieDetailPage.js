import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastDetails, getMovieDetail } from "../api/apiCalls";
import { baseUrlImage } from "../utils/private";
import { useSelector } from "react-redux";

function MovieDetailPage() {
  const params = useParams();
  const { id } = params;
  const [movieDetail, setMovieDetail] = useState("");
  const [cast, setCast] = useState(null);
  const movieData = useSelector((state) => state.AllData.movieDetail);
  useEffect(() => {
    if (id == movieData?.id) {
      setMovieDetail(movieData);
      getCastDetails(id)
        .then((res) => res.json())
        .then((res) => setCast(res))
        .catch((e) => console.log(e));
      return;
    }
    getMovieDetail(id)
      .then((res) => res.json())
      .then((res) => {
        setMovieDetail(res);
        getCastDetails(id)
          .then((res) => res.json())
          .then((res) => setCast(res))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, [movieData, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div className="container-fluid">
        <div
          style={{
            backgroundImage: `url(${baseUrlImage}${movieDetail?.backdrop_path})`,
          }}
          className="movieDetailBG p-2"
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="d-flex gap-3">
                <img
                  src={`${baseUrlImage}${movieDetail?.poster_path}`}
                  height={200}
                  alt="poster"
                />
                <div>
                  <h2 className="d-block">{movieDetail?.title}</h2>
                  <span className="d-block mt-1 mt-sm-3">
                    Rating : {movieDetail?.vote_average}
                  </span>
                  <span className="d-block mt-1 mt-sm-3">
                    {movieDetail?.runtime} min{" "}
                    {movieDetail?.genres?.map((el) => (
                      <span key={el.id}>{el.name}</span>
                    ))}
                  </span>
                  <span className="d-block mt-1 mt-sm-3">
                    Release Date : {movieDetail?.release_date}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h3>Overview</h3>
                <p>{movieDetail?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!cast ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 300 }}
        >
          <div class="loader"></div>
        </div>
      ) : (
        <div className="container-fluid mt-3">
          <h2>Cast</h2>
          <div className="d-flex gap-3 w-100 overflow-y-scroll scrollbar-none">
            {cast?.cast?.map((el) => (
              <div key={el.cast_id}>
                {el?.profile_path ? (
                  <img
                    src={`${baseUrlImage}${el?.profile_path}`}
                    height={200}
                    className="rounded"
                  />
                ) : (
                  <img src="/noImage.png" height={200} className="rounded" />
                )}

                <div>
                  <span>{el.name}</span>
                  <span className="d-block">Character : {el.character}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieDetailPage;
