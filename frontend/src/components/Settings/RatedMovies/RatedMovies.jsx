import React, { useEffect, useState } from "react";
import styles from "./RatedMovies.module.css";
import styles_App from "../../../App.module.css";
import { Navbar } from "../../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons"; // Étoile pleine
import { faStar as RegularStar } from "@fortawesome/free-regular-svg-icons"; // Étoile vide

export const RatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentGroupPage, setCurrentGroupPage] = useState(1); // Contrôle du groupe de pages (5 pages par groupe)
  const [userRatings, setUserRatings] = useState({}); // Pour stocker les notes des utilisateurs

  const moviesPerPage = 20; // 20 films par page
  const pagesPerGroup = 5; // 5 pages par groupe
  const totalMoviesPerGroup = moviesPerPage * pagesPerGroup;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        setLoading(true);

        // Récupérer 5 pages de films (chaque page contenant `moviesPerPage` films)
        for (let i = 0; i < pagesPerGroup; i++) {
          const page = (currentGroupPage - 1) * pagesPerGroup + i + 1;
          const response = await fetch(`http://localhost:5555/api/movies?page=${page}`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          allMovies = [...allMovies, ...data.results];
        }

        setMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentGroupPage]);

  const handleRating = (movieId, rating) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  };

  const truncateTitle = (title) => {
    return title.length > 15 ? title.slice(0, 10) + "..." : title;
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className={styles_App.container}>
      <h1 className={styles.title}>Vous les avez adorés, vous avez été déçus ? Dites-le avec des étoiles !</h1>
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h3 className={styles.movieTitle}>{truncateTitle(movie.title)}</h3>
            <p className={styles.movieYear}>{new Date(movie.release_date).getFullYear()}</p>

            {/* Stars Rating */}
            <div className={styles.starsContainer}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name={`rating-${movie.id}`}
                      value={ratingValue}
                      className={styles.radioInput}
                      onClick={() => handleRating(movie.id, ratingValue)}
                      style={{ display: "none" }} // Hide the radio input
                    />
                    <FontAwesomeIcon
                      icon={ratingValue <= (userRatings[movie.id] || 0) ? SolidStar : RegularStar}
                      color={ratingValue <= (userRatings[movie.id] || 0) ? "#ffc107" : "#e4e5e9"}
                      size="lg"
                      className={styles.star}
                    />
                  </label>
                );
              })}
            </div>

            <button className={styles.watchButton}>Envie de voir</button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setCurrentGroupPage((prev) => Math.max(prev - 1, 1))}>Précédent</button>
        <button onClick={() => setCurrentGroupPage((prev) => prev + 1)}>Suivant</button>
      </div>
    </div>
  );
};
