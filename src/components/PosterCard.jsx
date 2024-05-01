import React from "react";
import { Link } from "react-router-dom";
import { baseUrlImage } from "../utils/private";
import { FaStar } from "react-icons/fa";

const PosterCard = ({ title, rating, imageUrl, id }) => {
  return (
    <div
      className="posterCard hover-overlay ripple position-relative my-2 "
      data-mdb-ripple-color="light"
    >
      <Link to={`/movie-detail/${id}`}>
        <img
          src={`${baseUrlImage}${imageUrl}`}
          className="poster-img rounded"
        />
      </Link>
      <div className="w-100 position-absolute bottomCard">
        <div>
          <span className="d-flex align-items-center gap-2">
            <FaStar color="orange" /> {rating}
          </span>
          <span className="d-block fw-semibold">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
