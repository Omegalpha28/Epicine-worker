import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [isDark] = useTheme();
  const [user, setUser] = useState(null); // Pour récupérer l'utilisateur actuel
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchReplies();
    fetchUser();
  }, [postIdNumber]);

  // Fonction pour récupérer les données du post
  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/fil/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post data.");

      const result = await response.json();
      if (result && result.data) {
        const postData = result.data;
        if ('title' in postData && 'description' in postData) {
          setPost(postData);
          setTitle(postData.title);
          setDescription(postData.description);
        } else {
          setError("Post data is incomplete.");
        }
      } else {
        setError("Post data is incomplete.");
      }
    } catch (err) {
      setError("Failed to load post.");
    }
  };

  // Fonction pour récupérer les réponses au post
  const fetchReplies = async () => {
    try {
      const response = await fetch(`http://localhost:5555/get/public/message?id_fil=${postIdNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (!response.ok) throw new Error("Failed to fetch replies.");

      const data = await response.json();
      if (Array.isArray(data)) {
        const repliesWithAuthors = await Promise.all(data.map(async (reply) => {
          try {
            // Récupère le nom de l'auteur avec son UUID
            const authorResponse = await fetch(`http://localhost:5555/user/${reply.auteur}`);
            if (authorResponse.ok) {
              const authorData = await authorResponse.json();
              return { ...reply, auteur: authorData.name }; // Remplace l'UUID par le nom
            }
          } catch (err) {
            console.error("Failed to fetch author name:", err);
          }
          return reply; // En cas d'erreur, garde l'UUID original
        }));
        setReplies(repliesWithAuthors);
      } else {
        setError("Unexpected reply format.");
      }
    } catch (err) {
      setError("Failed to load replies.");
    }
  };

  // Fonction pour récupérer l'utilisateur connecté
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5555/user", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      setUser(data);  // Sauvegarde les informations de l'utilisateur
    } catch (err) {
      setError("Failed to load user.");
    }
  };

  // Fonction pour soumettre une réponse
  const handleReplySubmit = async () => {
    try {
      const response = await fetch("http://localhost:5555/add/message", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ text: reply, id_fil: postIdNumber }),
      });
      if (response.ok) {
        setReply("");
        fetchReplies();
      } else {
        const result = await response.json();
        setError(result.msg || "Failed to submit reply");
      }
    } catch (err) {
      setError("Failed to submit reply.");
    }
  };

  // Fonction pour supprimer le post
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5555/remove/fil/${postIdNumber}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to delete post.");
      navigate('/Forum');
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  // Fonction pour mettre à jour le post
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5555/update/fil/${postIdNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Failed to update post.");
      setIsEditing(false);
      fetchPost();
    } catch (err) {
      setError("Failed to update post.");
    }
  };

  // Fonction pour signaler le post
  const handleReport = async () => {
    try {
      const response = await fetch(`http://localhost:5555/report/fil/${postIdNumber}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to report post.");
      setPost({ ...post, report: true });
    } catch (err) {
      setError("Failed to report post.");
    }
  };

  // Fonction pour fermer le post
  const handleClose = async () => {
    try {
      const response = await fetch(`http://localhost:5555/close/fil/${postIdNumber}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to close post.");
      setPost({ ...post, open: false });
    } catch (err) {
      setError("Failed to close post.");
    }
  };

  // Vérifier si l'utilisateur est l'auteur du post
  const canEditOrDelete = user && user.uuid === post?.auteur;

  if (error) return <div className={styles.error}>{error}</div>;
  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <Navbar />
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>{title || "Untitled"}</h2>
          <p className={styles.postDescription}>{description || "No description available."}</p>
        </div>

        <div className={styles.postActions}>
          <button onClick={handleReport} className={styles.reportButton}>
            <FontAwesomeIcon icon={faFlag} /> Report
          </button>

          {/* Afficher ces boutons seulement si l'utilisateur est l'auteur du post */}
          {canEditOrDelete && (
            <>
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </>
          )}

          <button onClick={handleClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faLock} /> Close
          </button>
        </div>

        <div className={styles.repliesSection}>
          <h3>Replies</h3>
          {replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply.id} className={styles.replyBubble}>
                <div className={styles.replyAuthor}>{reply.auteur} </div>
                <div className={styles.replyText}>{reply.text}</div>
              </div>
            ))
          ) : (
            <p>No replies yet.</p>
          )}
        </div>

        <div className={styles.replySection}>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={styles.replyInput}
            placeholder="Write your reply here..."
          />
        </div>
        <button onClick={handleReplySubmit} className={styles.replyButton}>Submit Reply</button>
      </div>
    </div>
  );
};
