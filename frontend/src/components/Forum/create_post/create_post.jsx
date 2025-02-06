import React, { useState, useEffect } from 'react';
import useTheme from "../../set_theme";
import styles from './create_post.module.css';
import { Navbar } from "../../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

export const CreatePost = ({ onClose }) => {
    const [isDark] = useTheme();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [closing, setClosing] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchType, setSearchType] = useState("movies");
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMediaList, setSelectedMediaList] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([]);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5555/api/${searchType}/search?query=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Error during search:", error);
            }
        };

        fetchSearchResults();
    }, [searchQuery, searchType]);

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError("Title is required!");
            return;
        }

        if (selectedMediaList.length === 0) {
            setError("You must select at least one movie or series!");
            return;
        }

        const postData = {
            title,
            description,
            film_id: selectedMediaList[0].id, // Sélectionner le premier élément de la liste
        };

        try {
            const response = await fetch('http://localhost:5555/add/fil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${errorData.message || response.statusText}`);
                throw new Error(`Error creating post: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            onClose(); // Fermer la modal ici
            navigate("/forum"); // Rediriger vers la page Forum
            window.location.reload(); // Recharger la page
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post."); // Gérer l'erreur
        }
    };


    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 500);
    };

    const openSearchModal = () => {
        setShowSearchModal(true);
    };

    const closeSearchModal = () => {
        setShowSearchModal(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleMediaSelect = (media) => {
        if (!selectedMediaList.find(item => item.id === media.id)) { // Check using the correct ID
            setSelectedMediaList(prev => [...prev, media]);
        }
        closeSearchModal();
    };

    const removeMedia = (mediaId) => {
        setSelectedMediaList(prev => prev.filter(media => media.id !== mediaId));
    };

    return (
        <div className={`${styles.modal} ${closing ? styles.close : ''}`} data-theme={isDark ? "dark" : "light"}>
            {/* <Navbar /> */}
            <div className={`${styles.inside_box} ${closing ? styles.close : ''}`}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1>Create Post</h1>
                {error && <p className={styles.error}>{error}</p>}
                <div>
                    <h2>Title</h2>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setError(""); }}
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <h2>Description</h2>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textAreaField}
                    />
                </div>
                <button className={styles.addPictureButton} onClick={openSearchModal}>
                    Add Movies/Series
                </button>
                {showSearchModal && (
                    <div className={styles.searchModal}>
                        <div className={styles.searchModalContent}>
                            <button className={styles.closeButton} onClick={closeSearchModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <h2>Choose Type</h2>
                            <select onChange={(e) => setSearchType(e.target.value)}>
                                <option value="movies">Movies</option>
                                <option value="series">Series</option>
                            </select>
                            <h2>Search</h2>
                            <input
                                type="text"
                                placeholder="Enter title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            <div className={styles.searchResults}>
                                {searchResults.map((item) => (
                                    <div key={item.id} onClick={() => handleMediaSelect(item)} className={styles.mediaItem}>
                                        {item.poster_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                                alt={item.title || item.name}
                                                className={styles.posterImage}
                                            />
                                        )}
                                        {/* <p>{item.title || item.name}</p> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.selectedMediaContainer}>
                    {selectedMediaList.map(media => (
                        <div key={media.id} className={styles.selectedMediaItem}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                                alt={media.title || media.name}
                                className={styles.selectedPosterImage}
                            />
                            <span>{media.title || media.name}</span>
                            <button onClick={() => removeMedia(media.id)} className={styles.removeMediaButton}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.createButton}
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};
