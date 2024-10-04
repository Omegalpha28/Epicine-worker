import { useEffect, useState } from "react";
import useTheme from "../set_theme";
import styles from "./TV_Shows.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Toggle } from "../Toggle/Toggle";
import app_styles from "../../App.module.css";
import { Join_Us } from "../Joinus/join_us";
import { Search_Content } from "../Home/Search_Content/Search_Content";
import { Link } from "react-router-dom";

export const TV_Shows = () => {
  const [isDark, setIsDark] = useTheme();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [shows, setShows] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5555/api/genres')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Erreur lors de la récupération des genres :', error));
  }, []);

  useEffect(() => {
    let url = selectedGenre
      ? `http://localhost:5555/api/tv/${selectedGenre}/${page}`
      : `http://localhost:5555/api/tv?page=${page}`;

    if (isFree) url += "&free=true";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setShows(data.results);
        setTotalPages(data.total_pages > 30 ? 30 : data.total_pages);
      })
      .catch(error => console.error('Erreur lors de la récupération des séries :', error));
  }, [selectedGenre, page, isFree]);

  // Effectuer la recherche
  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:5555/api/search/tv?query=${encodeURIComponent(searchQuery)}`)
        .then(response => response.json())
        .then(data => {
          setShows(data.results);
          setTotalPages(data.total_pages > 30 ? 30 : data.total_pages);
        })
        .catch(error => console.error('Erreur lors de la recherche des séries :', error));
    } else {
      // Si aucun terme de recherche, réinitialiser les séries
      setSelectedGenre(null);
      setPage(1);
    }
  }, [searchQuery]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setPage(1);
  };

  const handleFreeToggle = () => {
    setIsFree(!isFree);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const truncateTitle = (title) => {
    return title.length > 15 ? title.slice(0, 10) + "..." : title;
  };

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <div className={app_styles.App}>
        <Navbar
          isDark={isDark}
          setSearchQuery={setSearchQuery}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        {searchOpen && searchQuery && <Search_Content query={searchQuery} />}

        <div className={styles.inside_box}>
          <div className={styles.header}>
            <h1>Series</h1>
            <div className={styles.controls}>
              <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
              <button onClick={handleFreeToggle} className={styles.freeToggle}>
                {isFree ? "Show All TV Shows" : "Show Free TV Shows"}
              </button>
              <select onChange={handleGenreChange}>
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.shows}>
            {shows.map((show) => (
              <div key={show.id} className={styles.show_item}>
                <Link to={`/series/${show.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                </Link>
                <div>
                  <h3>{truncateTitle(show.name)}</h3>
                  <p>{show.first_air_date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>
      <Join_Us />
    </div>
  );
};
