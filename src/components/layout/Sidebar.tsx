import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaTasks, FaUsers, FaBars } from 'react-icons/fa';
import './Sidebar.css'; // Optional CSS for styling

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const FaBarsIcon = FaBars as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FaTachometerAlt1 = FaTachometerAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FaTasks1 = FaTasks as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FaUsers1 = FaUsers as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className={`d-flex ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar bg-dark text-white vh-100 p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{collapsed ? 'J' : 'JiraLite'}</h5>
          <button className="btn btn-sm btn-outline-light" onClick={toggleSidebar}>
            <FaBarsIcon />
          </button>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}>
              <FaTachometerAlt1 className="me-2" />
              {!collapsed && 'Dashboard'}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/kanban" className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}>
              <FaTasks1 className="me-2" />
              {!collapsed && 'Kanban Board'}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}>
              <FaUsers1 className="me-2" />
              {!collapsed && 'Users'}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-3">
        {/* You can render <Outlet /> here if using nested routes */}
      </div>
    </div>
  );
};

export default Sidebar;
