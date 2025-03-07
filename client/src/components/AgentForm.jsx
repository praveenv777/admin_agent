import React, { useState } from 'react';
import { addAgent } from '../utils/api';
import { validateEmail, validateMobileNumber, validatePassword } from '../utils/validation';
import './AgentForm.css';

const AgentForm = () => {
    const [agentData, setAgentData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgentData({
            ...agentData,
            [name]: value
        });
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!agentData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!agentData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(agentData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!agentData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!validateMobileNumber(agentData.mobileNumber)) {
            newErrors.mobileNumber = 'Please enter a valid mobile number with country code';
        }
        
        if (!agentData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(agentData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        setSuccess('');
        
        try {
            await addAgent(agentData);
            setSuccess('Agent created successfully!');
            setAgentData({
                name: '',
                email: '',
                mobileNumber: '',
                password: ''
            });
        } catch (error) {
            setErrors({ 
                submit: error.message || 'Failed to create agent. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="page-title">Add New Agent</h1>
            
            <div className="card agent-form-card">
                {success && (
                    <div className="alert alert-success">
                        <i className="fas fa-check-circle"></i> {success}
                    </div>
                )}
                
                {errors.submit && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle"></i> {errors.submit}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={agentData.name}
                            onChange={handleChange}
                            placeholder="Enter agent's full name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={agentData.email}
                            onChange={handleChange}
                            placeholder="Enter agent's email address"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number (with country code)</label>
                        <input
                            id="mobileNumber"
                            type="text"
                            name="mobileNumber"
                            className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                            value={agentData.mobileNumber}
                            onChange={handleChange}
                            placeholder="e.g. +91 9876543210"
                        />
                        {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={agentData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating Agent...' : 'Add Agent'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgentForm;