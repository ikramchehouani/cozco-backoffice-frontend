import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCog, FaUserTie, FaColumns, FaThList } from 'react-icons/fa';
import { Menu, MenuItem, ProSidebarProvider, SubMenu } from 'react-pro-sidebar';
import styled from 'styled-components';
import './Sidebar.css';

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #ffdb58;
    padding: 5px;
    border-radius: 10px;
  }
`;

const Sidebar = ({ collapsed, onToggle }) => {
  const styles = {
    sideBarHeight: {
      height: '100vh',
    },
    menuIcon: {
      padding: '10px',
      cursor: 'pointer',
      color: '#fff',
    },
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ProSidebarProvider style={styles.sideBarHeight}>
        <div style={styles.menuIcon} className="menu-icon" onClick={onToggle}>
          <AiOutlineMenu />
        </div>
        <Menu iconShape="square">
          <Menuitem icon={<FaColumns />}>Tableau de bord</Menuitem>
          <Menuitem icon={<FaUserTie />} href="/employees">
            Administrateurs
          </Menuitem>
          <Menuitem icon={<FaThList />} href="/employees">
            Articles
          </Menuitem>
          <Menuitem icon={<FaCog />}>Profile</Menuitem>
        </Menu>
      </ProSidebarProvider>
    </div>
  );
};

export default Sidebar;
