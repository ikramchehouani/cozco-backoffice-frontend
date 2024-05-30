import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/images/cozco-logo.png';
import { IonIcon } from '@ionic/react';
import { menuOutline, closeOutline } from 'ionicons/icons';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="toggle-button" onClick={toggleSidebar}>
          <IonIcon icon={sidebarOpen ? closeOutline : menuOutline} />
        </button>
      </div>
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
