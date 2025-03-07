import React, { useState, useEffect } from 'react';
import { fetchDistributionList } from '../utils/api';
import './DistributionList.css';

const DistributionList = () => {
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeAgent, setActiveAgent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDistributionList();
                setDistributions(data);
                // Set first agent as active by default if data exists
                if (data && data.length > 0) {
                    setActiveAgent(data[0].agent.id);
                }
            } catch (err) {
                setError('Failed to load distribution data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading distribution data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    if (!distributions || distributions.length === 0) {
        return (
            <div className="container">
                <h1 className="page-title">Distribution Lists</h1>
                <div className="card empty-state">
                    <i className="fas fa-list"></i>
                    <h3>No data available</h3>
                    <p>Upload a CSV file to distribute leads among agents.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="page-title">Distribution Lists</h1>
            
            <div className="distribution-container">
                <div className="agent-tabs">
                    {distributions.map((item) => (
                        <button
                            key={item.agent.id}
                            className={`agent-tab ${activeAgent === item.agent.id ? 'active' : ''}`}
                            onClick={() => setActiveAgent(item.agent.id)}
                        >
                            <span className="agent-name">{item.agent.name}</span>
                            <span className="contact-count">{item.contacts.length} contacts</span>
                        </button>
                    ))}
                </div>
                
                <div className="contact-list-container">
                    {distributions.map((item) => (
                        item.agent.id === activeAgent && (
                            <div className="contact-list" key={item.agent.id}>
                                <div className="card agent-info-card">
                                    <div className="agent-info">
                                        <div className="agent-avatar">
                                            {item.agent.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3>{item.agent.name}</h3>
                                            <p>{item.agent.email}</p>
                                            <p>{item.agent.mobileNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {item.contacts.length > 0 ? (
                                    <div className="card">
                                        <table className="contacts-table">
                                            <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Phone</th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.contacts.map((contact, index) => (
                                                    <tr key={index}>
                                                        <td>{contact.firstName}</td>
                                                        <td>{contact.phone}</td>
                                                        <td>{contact.notes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="card empty-contacts">
                                        <p>No contacts assigned to this agent</p>
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributionList;