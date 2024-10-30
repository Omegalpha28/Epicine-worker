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

export const OpenPost = () => {


    return (
        <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
          <Navbar />
        <div className={styles.inside_box}>
            <h1>Open Post</h1>
        </div>
        </div>
    );
};