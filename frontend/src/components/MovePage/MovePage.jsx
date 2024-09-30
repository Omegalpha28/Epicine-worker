// src/MoviePage.js
import { useState } from "react";

export const useMoviePage = () => {
    const [activeMovieId, setActiveMovieId] = useState(null);

    const handleMovieClick = (movieId) => {
        setActiveMovieId(movieId);
        console.log("ID du film actif:", movieId);
    };

    return {
        activeMovieId,
        handleMovieClick
    };
};
