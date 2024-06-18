import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/articles`)
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Attention',
      message: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      buttons: [
        {
          label: 'Confirmer',
          onClick: () => deleteArticle(id)
        },
        {
          label: 'Annuler',
          onClick: () => {}
        }
      ]
    });
  };

  const deleteArticle = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/article/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the article');
        }
        setArticles(articles.filter(article => article._id !== id));
        console.log(`Article with id ${id} deleted`);
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  const handleEdit = (id) => {
    navigate(`/admin/articles/${id}`);
  };

  const handleAddArticle = () => {
    navigate('/admin/articles/new');
  };

  const columns = [
    { field: 'title', headerName: 'Titre', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'author', headerName: 'Auteur', width: 150 },
    { field: 'createdAt', headerName: 'Date de création', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <EditIcon
              style={{ cursor: 'pointer' }}
              onClick={() => handleEdit(params.row._id)}
            />
          </div>
          <div>
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="articles-container">
      <h1>Articles</h1>
      <button onClick={handleAddArticle} className="add-article-button">
        <AddIcon />
      </button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={articles}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Articles;
