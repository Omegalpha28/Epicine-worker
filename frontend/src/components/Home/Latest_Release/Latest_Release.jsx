import React, { useState } from "react";
import styles from "./Latest_Release.module.css";

export const Latest_Release = () => {

    return <div className={styles.box}>
        <div className={styles.main_box}>
            <h1 className={styles.title_box}>Latest Release</h1>
            <div className={styles.categories}>
                <button className={styles.movies}>Movies</button>
                <button className={styles.series}>Series</button>
            </div>
            <div className={styles.inside_box}>
                <h1>Elements</h1>
            </div>
        </div>
    </div>
}

// return (
//     <div className={styles.box}>
//         <div className={styles.main_box}>
//             <div className={styles.header}>
//                 <h1 className={styles.title_box}>Latest Release</h1>
//                 <div className={styles.categories}>
//                     <button className={styles.movies} onClick={() => fetchContent('movies')}>Movies</button>
//                     <button className={styles.series} onClick={() => fetchContent('series')}>Series</button>
//                 </div>
//             </div>
//             <div className={styles.inside_box}>
//                 {loading ? (
//                     <h1>Loading...</h1>
//                 ) : error ? (
//                     <h1>{error}</h1>
//                 ) : movies.length > 0 ? (
//                     <div className={styles.movie_list}>
//                         {movies.map((movie) => (
//                             <div key={movie.id} className={styles.movie_item}>
//                                 <img
//                                     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                                     alt={movie.title || movie.name}
//                                 />
//                                 <h3 className={styles.movie_title}>{movie.title || movie.name}</h3>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <h1>No Movies Available</h1>
//                 )}
//             </div>
//         </div>
//     </div>
// );