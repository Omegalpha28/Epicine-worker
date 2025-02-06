import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faSolidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as faSolidThumbsDown } from '@fortawesome/free-solid-svg-icons';
import styles from './like.module.css';

export const Like = ({ movieId, IsDark }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const baseColor = !IsDark ? 'black' : 'white';

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5555/get/like?item_id=${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (data.isLiked) {
                    setIsLiked(true);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du like:", error);
            }
        };
        if (movieId) {
            fetchLikeStatus();
        }
    }, [movieId]);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false);
    };

    const handleDislikeClick = () => {
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false);
    };

    return (
        <div className={styles.likeContainer}>
            <FontAwesomeIcon
                icon={faSolidThumbsUp}
                className={styles.Solid}
                onClick={handleLikeClick}
                style={{ color: isLiked ? 'blue' : baseColor }}
            />
            <FontAwesomeIcon
                icon={faSolidThumbsDown}
                className={styles.Regular}
                onClick={handleDislikeClick}
                style={{ color: isDisliked ? 'red' : baseColor }}
            />
        </div>
    );
};

