import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCog, FaColumns, FaThList, FaUsers } from 'react-icons/fa';
import { Menu, MenuItem, ProSidebarProvider, SubMenu } from 'react-pro-sidebar';
import styled from 'styled-components';
import './Sidebar.css';

const Menuitem = styled(MenuItem)`
`;

const Sidebar = ({ collapsed, onToggle }) => {

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ProSidebarProvider>
        <div className="menu-icon" onClick={onToggle}>
          <AiOutlineMenu />
        </div>
        <Menu iconShape="square">
          <Menuitem icon={<FaColumns />} href="/admin/dashboard">Tableau de bord</Menuitem>
          <Menuitem icon={<FaUsers />} href="/employees">
            Administrateurs
          </Menuitem>
          <Menuitem icon={<FaThList />} href="/admin/articles">
            Articles
          </Menuitem>
          <Menuitem icon={<FaCog />}>Profile</Menuitem>
        </Menu>
      </ProSidebarProvider>
    </div>
  );
};

export default Sidebar;
