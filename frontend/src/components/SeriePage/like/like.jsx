import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as RegularStar } from '@fortawesome/free-regular-svg-icons';
import styles from './like.module.css';
import likeIcon from '../../../../assets/like_icon/like.png';
import dislikeIcon from '../../../../assets/like_icon/dislike.png';
import likeNoIcon from '../../../../assets/like_icon/like_no.png';
import addToCollectionIcon from '../../../../assets/like_icon/plus.png';
import notAddToCollectionIcon from '../../../../assets/like_icon/plus2.png';

export const Like = ({ serieId }) => {
    const [likeState, setLikeState] = useState('like_no');
    const [isInCollection, setIsInCollection] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleLike = () => {
        if (likeState === 'like') {
            setLikeState('dislike');
        } else if (likeState === 'dislike') {
            setLikeState('like_no');
        } else {
            setLikeState('like');
        }
    };

    const toggleCollection = () => {
        setIsInCollection((prevState) => !prevState);
    };

    const toggleFavorite = () => {
        setIsFavorite((prevState) => !prevState);
    };

    return (
        <div className={styles.likeContainer}>
            <FontAwesomeIcon icon={isFavorite ? SolidStar : RegularStar} onClick={toggleFavorite} className={styles.favoriteIcon}/>
            <img src={likeState === 'like' ? likeIcon : likeState === 'dislike' ? dislikeIcon : likeNoIcon}  alt="like button" className={styles.likeIcon} onClick={toggleLike} />
            <img src={isInCollection ? addToCollectionIcon : notAddToCollectionIcon} alt="add to collection button" className={styles.addToCollectionIcon} onClick={toggleCollection} />
        </div>
    );
};
