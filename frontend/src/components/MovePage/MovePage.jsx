import { useState } from "react";

export const useMoviePage = () => {
    const [activeMovieId, setActiveMovieId] = useState(null);

    const handleMovieClick = (movieId) => {
        setActiveMovieId(movieId);
    };

    return {
        activeMovieId,
        handleMovieClick
    };
};
