import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentList = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('/api/agents');
                setAgents(response.data);
            } catch (err) {
                setError('Failed to fetch agents');
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Agent List</h2>
            <ul>
                {agents.map(agent => (
                    <li key={agent._id}>
                        {agent.name} - {agent.email} - {agent.mobileNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgentList;