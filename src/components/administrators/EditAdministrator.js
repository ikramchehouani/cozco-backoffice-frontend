import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import './EditArticle.css';

const EditAdministrator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [administrator, setAdministrator] = useState({
    lastName: '',
    firstName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setAdministrator(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdministrator(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log(administrator)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/update-user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(administrator),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated:', data);
        navigate('/admin/administrators');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleCancelEdit = () => {
    navigate('/admin/administrators');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-form">
      <h2>Modifier l'utilisateur</h2>
      {administrator && (
        <form onSubmit={handleFormSubmit}>
          <label>Nom</label>
          <input
            type="text"
            name="lastName"
            value={administrator.lastName}
            onChange={handleInputChange}
          />
          <br />
          <label>Prénom</label>
          <textarea
            name="firstName"
            value={administrator.firstName}
            onChange={handleInputChange}
          />
          <br />
          <label>email</label>
          <input
            type="text"
            name="email"
            value={administrator.email}
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

export default EditAdministrator;
