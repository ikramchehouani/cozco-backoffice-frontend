import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
    console.log(`Deleting article with id ${id}`);
    // Implement delete functionality here
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
      <button onClick={handleAddArticle} className="add-article-button">Add Article</button>
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
