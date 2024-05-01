import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const divRef = useRef(null);
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      navigate(`/search?title=${search}`);
      setSearch("");
      setMobileMenu(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {isMobile ? (
        <header className="py-3">
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={"/"}
              className="fw-semibold fs-3 ps-2"
              onClick={() => setMobileMenu(false)}
            >
              MovieDB
            </Link>
            <span
              className="p-2 border px-3 me-3"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <RiCloseCircleLine className="fs-4" /> : <FiMenu />}
            </span>
          </div>
          {mobileMenu ? (
            <div
              className="bg-danger w-100 px-3 mt-2"
              ref={divRef}
              style={{ height: 187, zIndex: 1, top: 0 }}
            >
              <div className="li-decoration">
                <li
                  className="py-2 border-bottom"
                  onClick={() => setMobileMenu(false)}
                >
                  <Link to={"/"}>Popular</Link>
                </li>
                <li
                  className="py-2 border-bottom"
                  onClick={() => setMobileMenu(false)}
                >
                  <Link to={"/top-rated"}>Top Rated</Link>
                </li>
                <li
                  className="py-2 border-bottom"
                  onClick={() => setMobileMenu(false)}
                >
                  <Link to={"upcoming-movies"}>Up Coming</Link>
                </li>
                <div className="bg-white px-2 py-2 mt-2 w-100 position-relative">
                  <input
                    placeholder="Search Movie"
                    type="text"
                    className="border-0 w-100"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <span
                    className="SearchBtn text-white p-2 pointer position-absolute px-3"
                    style={{ top: 1, right: 1 }}
                    onClick={() => {
                      if (search) {
                        navigate(`/search?title=${search}`);
                        setSearch("");
                      }
                    }}
                  >
                    <BsSearch />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
      ) : (
        <header className="py-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <Link to={"/"} className="fw-semibold">
                MovieDB
              </Link>
              <div className="d-flex align-items-center gap-3">
                <div className="li-decoration d-flex gap-3">
                  <li>
                    <Link to={"/"}>Popular</Link>
                  </li>
                  <li>
                    <Link to={"/top-rated"}>Top Rated</Link>
                  </li>
                  <li>
                    <Link to={"upcoming-movies"}>Upcoming</Link>
                  </li>
                </div>
                <div className="bg-white px-2 py-2">
                  <input
                    placeholder="Search Movie"
                    type="text"
                    className="border-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <span
                    className="SearchBtn text-white p-2 pointer"
                    onClick={() => {
                      if (search) {
                        navigate(`/search?title=${search}`);
                        setSearch("");
                      }
                    }}
                  >
                    <BsSearch />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
