import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Fil.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEdit, faTrash, faLock } from '@fortawesome/free-solid-svg-icons';

export const Fil = () => {
  const { id: postId } = useParams(); // Récupère l'ID du post depuis l'URL
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/fil/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post data.");
      const data = await response.json();
      setPost(data);
      setTitle(data.title);
      setDescription(data.description);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError("Failed to load post.");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5555/update/fil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fil_id: postId, title, description }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsEditing(false);
        fetchPost();
      } else {
        setError(result.msg || "Update failed");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Update failed.");
    }
  };

  const handleClose = async () => {
    try {
      const response = await fetch("http://localhost:5555/close/fil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fil_id: postId }),
      });
      const result = await response.json();
      if (response.ok) fetchPost();
      else setError(result.msg || "Failed to close fil");
    } catch (err) {
      console.error("Error closing fil:", err);
      setError("Failed to close fil.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:5555/remove/fil", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fil_id: postId }),
      });
      const result = await response.json();
      if (response.ok) window.location.reload();
      else setError(result.msg || "Failed to delete fil");
    } catch (err) {
      console.error("Error deleting fil:", err);
      setError("Failed to delete fil.");
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <button className={styles.reportButton}>
          <FontAwesomeIcon icon={faFlag} />
        </button>
      </div>

      <div className={styles.postContent}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputField}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textareaField}
            />
          </div>
        ) : (
          <p className={styles.postDescription}>{post.description}</p>
        )}
        {post.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${post.poster_path}`}
            alt={post.title}
            className={styles.posterImage}
          />
        )}
      </div>

      <div className={styles.postActions}>
        {isEditing ? (
          <button onClick={handleUpdate} className={styles.updateButton}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
        <button onClick={handleClose} className={styles.closeButton}>
          <FontAwesomeIcon icon={faLock} /> Close
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};