import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    
    // Don't show navigation on login page
    if (location.pathname === '/') {
        return null;
    }
    
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-logo">
                    <Link to="/dashboard">Admin Agent</Link>
                </div>
                
                <div className="navbar-menu">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </Link>
                    <Link to="/agent-list" className={location.pathname === '/agent-list' ? 'active' : ''}>
                        <i className="fas fa-users"></i> Agents
                    </Link>
                    <Link to="/file-upload" className={location.pathname === '/file-upload' ? 'active' : ''}>
                        <i className="fas fa-file-upload"></i> Upload CSV
                    </Link>
                    <Link to="/distribution-list" className={location.pathname === '/distribution-list' ? 'active' : ''}>
                        <i className="fas fa-list"></i> Distribution
                    </Link>
                    <Link to="/add-agent" className={location.pathname === '/add-agent' ? 'active' : ''}>
                        <i className="fas fa-user-plus"></i> Add Agent
                    </Link>
                </div>
                
                {user && (
                    <div className="navbar-user">
                        <span>Welcome, {user.name}</span>
                        <button onClick={logout} className="btn btn-sm">Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;