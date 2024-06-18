import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../articles/Articles.css';

const Administrators = () => {
  const [administrators, setAdministrators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch administrators');
        }
        return response.json();
      })
      .then(data => {
        setAdministrators(data);
      })
      .catch(error => console.error('Error fetching administrators:', error));
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Attention',
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?',
      buttons: [
        {
          label: 'Confirmer',
          onClick: () => deleteAdministrator(id)
        },
        {
          label: 'Annuler',
          onClick: () => {}
        }
      ]
    });
  };

  const deleteAdministrator = (id) => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/delete-user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the user');
        }
        setAdministrators(administrators.filter(admin => admin._id !== id));
        console.log(`User with id ${id} deleted`);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEdit = (id) => {
    navigate(`/admin/administrators/${id}`);
  };

  const handleAddAdministrators = () => {
    navigate('/admin/administrators/new');
  };

  const columns = [
    { field: 'firstName', headerName: 'Prénom', width: 200 },
    { field: 'lastName', headerName: 'Nom', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
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
      <h1>Administrateurs</h1>
      <button onClick={handleAddAdministrators} className="add-article-button">
        <AddIcon />
      </button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={administrators}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Administrators;
