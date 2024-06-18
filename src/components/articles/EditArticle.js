import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditArticle.css';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    description: '',
    author: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/article/${id}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/article/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Article updated:', data);
        navigate('/admin/articles');
      })
      .catch(error => console.error('Error updating article:', error));
  };

  const handleCancelEdit = () => {
    navigate('/admin/articles');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-form">
      <h2>Modifier l'article</h2>
      {article && (
        <form onSubmit={handleFormSubmit}>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleInputChange}
          />
          <br />
          <label>Description</label>
          <textarea
            name="description"
            value={article.description}
            onChange={handleInputChange}
          />
          <br />
          <label>Auteur</label>
          <input
            type="text"
            name="author"
            value={article.author}
            onChange={handleInputChange}
          />
          <br />
          <div className="button-container">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={handleCancelEdit}>Annuler</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditArticle;
