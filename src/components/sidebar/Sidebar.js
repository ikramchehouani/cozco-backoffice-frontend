import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCog, FaColumns, FaThList, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Sign out failed');
      }

      logout();
      navigate('/login'); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ProSidebarProvider>
        <div className="menu-icon" onClick={onToggle}>
          <AiOutlineMenu />
        </div>
        <Menu iconShape="square">
          <MenuItem className="menu-item" icon={<FaColumns />} href="/admin/dashboard">
            Tableau de bord
          </MenuItem>
          <MenuItem className="menu-item" icon={<FaUsers />} href="/admin/administrators">
            Administrateurs
          </MenuItem>
          <MenuItem className="menu-item" icon={<FaThList />} href="/admin/articles">
            Articles
          </MenuItem>
          <MenuItem className="menu-item" icon={<FaCog />}>
            Profile
          </MenuItem>
          <div className="menu-footer">
            <MenuItem className="menu-item" onClick={handleSignOut} icon={<FaSignOutAlt />}>
              Se déconnecter
            </MenuItem>
          </div>
        </Menu>
      </ProSidebarProvider>
    </div>
  );
};

export default Sidebar;
