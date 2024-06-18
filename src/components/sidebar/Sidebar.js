import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCog, FaColumns, FaThList, FaUsers } from 'react-icons/fa';
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
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
        </Menu>
      </ProSidebarProvider>
    </div>
  );
};

export default Sidebar;
