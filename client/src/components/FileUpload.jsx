import React, { useState } from 'react';
import { uploadCSV } from '../utils/api';
import { validateCSVFile } from '../utils/validation';
import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            const validationResult = validateCSVFile(selectedFile);
            
            if (validationResult.valid) {
                setFile(selectedFile);
                setError('');
            } else {
                setFile(null);
                setError(validationResult.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            await uploadCSV(formData);
            setSuccess('File uploaded successfully! Data has been distributed among agents.');
            setFile(null);
            setFileName('');
        } catch (err) {
            setError(err.message || 'Failed to upload file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="page-title">Upload CSV File</h1>
            
            <div className="card file-upload-card">
                <div className="upload-instructions">
                    <h3><i className="fas fa-info-circle"></i> Instructions</h3>
                    <p>Upload a CSV file with the following columns:</p>
                    <ul>
                        <li><strong>FirstName</strong> - Text</li>
                        <li><strong>Phone</strong> - Number</li>
                        <li><strong>Notes</strong> - Text</li>
                    </ul>
                    <p>Accepted file formats: .csv, .xlsx, .xls</p>
                </div>
                
                {error && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}
                
                {success && (
                    <div className="alert alert-success">
                        <i className="fas fa-check-circle"></i> {success}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="file-input-container">
                        <input
                            type="file"
                            id="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="file" className="file-label">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <span>{fileName || 'Choose a file'}</span>
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn"
                        disabled={!file || loading}
                    >
                        {loading ? 'Uploading...' : 'Upload & Distribute'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FileUpload;