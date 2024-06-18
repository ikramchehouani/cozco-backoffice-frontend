import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './EditArticle.css';

const AddArticle = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [article, setArticle] = useState({
    title: '',
    description: '',
    author: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(article),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Article created:', data);
        navigate('/admin/articles');
      })
      .catch(error => console.error('Error creating article:', error));
  };

  const handleCancelEdit = () => {
    navigate('/admin/articles');
  };

  return (
    <div className="edit-form">
      <h2>Ajouter un article</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Titre</label>
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Description</label>
        <textarea
          name="description"
          value={article.description}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Auteur</label>
        <input
          type="text"
          name="author"
          value={article.author}
          onChange={handleInputChange}
          required
        />
        <br />
        <div className="button-container">
          <button type="submit">Créer</button>
          <button type="button" onClick={handleCancelEdit}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
