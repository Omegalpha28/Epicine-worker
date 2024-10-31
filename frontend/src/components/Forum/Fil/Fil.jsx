import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Fil.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEdit, faTrash, faLock } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../../Navbar/Navbar';
import useTheme from '../../set_theme';

export const Fil = () => {
  const { id: postId } = useParams(); // Récupère l'ID du post depuis l'URL
  const postIdNumber = Number(postId); // Convertit en nombre
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [reply, setReply] = useState(""); // État pour la réponse
  const [replies, setReplies] = useState([]); // État pour les réponses
  const [isDark] = useTheme();

  // Récupérer le token
  const token = localStorage.getItem("token"); // Assure-toi que le token est bien stocké ici

  useEffect(() => {
    fetchPost();
    fetchReplies();
  }, [postIdNumber]); // Utilisez postIdNumber ici

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/fil/${postIdNumber}`); // Utilisez postIdNumber
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

  const fetchReplies = async () => {
    try {
      const response = await fetch(`http://localhost:5555/get/message?id_fil=${postIdNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (!response.ok) throw new Error("Failed to fetch replies.");
      const data = await response.json();
      setReplies(data);
    } catch (err) {
      console.error("Error fetching replies:", err);
      setError("Failed to load replies.");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5555/update/fil/${postIdNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, description }),
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
      const response = await fetch(`http://localhost:5555/close/fil/${postIdNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
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
      const response = await fetch(`http://localhost:5555/remove/fil/${postIdNumber}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      const result = await response.json();
      if (response.ok) window.location.reload();
      else setError(result.msg || "Failed to delete fil");
    } catch (err) {
      console.error("Error deleting fil:", err);
      setError("Failed to delete fil.");
    }
  };

  const handleReplySubmit = async () => {
    try {
      const response = await fetch("http://localhost:5555/add/message", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ text: reply, id_fil: postIdNumber }), // Utilisez postIdNumber
      });
      const result = await response.json();
      if (response.ok) {
        setReply(""); // Réinitialiser le champ de réponse
        fetchReplies(); // Recharger les réponses
      } else {
        setError(result.msg || "Failed to submit reply");
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
      setError("Failed to submit reply.");
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <Navbar />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <div className={styles.postActions}>
            <button className={styles.reportButton}>
              <FontAwesomeIcon icon={faFlag} />
            </button>
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
            <>
              <p className={styles.postDescription}>{post.description}</p>
              {post.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${post.poster_path}`}
                  alt={post.title}
                  className={styles.posterImage}
                />
              )}
            </>
          )}
        </div>

        <div className={styles.repliesSection}>
          <h3>Replies</h3>
          {replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply.id} className={styles.reply}>
                <p>{reply.text}</p>
              </div>
            ))
          ) : (
            <p>No replies yet.</p>
          )}
        </div>

        <div className={styles.replySection}>
          <h3>Reply to this post</h3>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={styles.replyInput}
            placeholder="Write your reply here..."
          />
          <button onClick={handleReplySubmit} className={styles.replyButton}>Submit Reply</button>
        </div>
      </div>
    </div>
  );
};
