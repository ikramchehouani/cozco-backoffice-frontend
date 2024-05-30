import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Open'}
      </button>
      <nav>
        <ul>
          <li><Link to="/admin">Dashboard Home</Link></li>
          <li><Link to="/admin/articles">Articles</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
