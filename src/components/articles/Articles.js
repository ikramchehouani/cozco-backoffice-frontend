import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/articles`)
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'content', headerName: 'Content', width: 400 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
  ];

  return (
    <div className="articles-container">
      <h1>Articles</h1>
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
