import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import DistributionList from './components/DistributionList';
import FileUpload from './components/FileUpload';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-agent" element={<AgentForm />} />
          <Route path="/agent-list" element={<AgentList />} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/distribution-list" element={<DistributionList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;