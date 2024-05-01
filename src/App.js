import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import SearchPage from "./pages/SearchPage";
import Upcoming from "./pages/Upcoming";
import Navbar from "./components/Navbar";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/upcoming-movies" element={<Upcoming />} />
      </Routes>
    </>
  );
}

export default App;
