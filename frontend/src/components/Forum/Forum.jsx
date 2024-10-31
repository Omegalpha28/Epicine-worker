import React, { useState, useEffect } from 'react';
import useTheme from "../set_theme";
import styles from "./Forum.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Join_Us } from "../Joinus/join_us";
import { CreatePost } from './create_post/create_post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Forum = () => {
  const [isDark, setIsDark] = useTheme();
  const [filData, setFilData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal

  useEffect(() => {
    fetchPopularFilms();
  }, []);

  const fetchPopularFilms = async () => {
    try {
      const response = await fetch("http://localhost:5555/get/fil/popular");
      const data = await response.json();
      setFilData(data);
      setNoResults(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des films populaires", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await fetch(`http://localhost:5555/get/search/fil?recherche=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.length === 0) {
          setNoResults(true);
          setFilData([]);
        } else {
          setNoResults(false);
          setFilData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la recherche des films", error);
      }
    } else {
      fetchPopularFilms();
    }
  };

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.inside_box}>
          <h1>Forum</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <button className={styles.createPostButton} onClick={() => setShowModal(true)}>Create Post +</button>
          <div className={styles.filList}>
            {filData.length > 0 ? (
              filData.map((fil) => (
                <div key={fil.id} className={styles.filCard}>
                  <Link to={`/fil/${fil.id}`} className={styles.filLink}>
                    <h2>{fil.title}</h2>
                    <p>{fil.description}</p>
                  </Link>
                </div>
              ))
            ) : noResults ? (
              <p>No results found</p>
            ) : null}
          </div>
        </div>
      </div>
      <Join_Us />
      {showModal && <CreatePost onClose={() => setShowModal(false)} />} {/* Affiche le modal */}
    </div>
  );
};
