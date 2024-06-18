import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AddAdministrator = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [administrator, setAdministrator] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'backoffice'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdministrator(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(administrator),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User created:', data);
        navigate('/admin/administrators');
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const handleCancelEdit = () => {
    navigate('/admin/administrators');
  };

  return (
    <div className="edit-form">
      <h2>Ajouter utilisateur</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Prénom</label>
        <input
          type="text"
          name="firstName"
          value={administrator.firstName}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Nom</label>
        <textarea
          name="lastName"
          value={administrator.lastName}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={administrator.email}
          onChange={handleInputChange}
          required
        />
        <label>Mot de passe</label>
        <input
          type="text"
          name="password"
          value={administrator.password}
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

export default AddAdministrator;
