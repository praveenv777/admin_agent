import React, { useEffect, useState } from 'react';
import { fetchAgents, fetchDistributionList } from '../utils/api';
import AgentList from './AgentList';
import DistributionList from './DistributionList';

const Dashboard = () => {
    const [agents, setAgents] = useState([]);
    const [distributionLists, setDistributionLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const agentsData = await fetchAgents();
                const distributionData = await fetchDistributionList();
                setAgents(agentsData);
                setDistributionLists(distributionData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <h2>Agents</h2>
            <AgentList agents={agents} />
            <h2>Distribution Lists</h2>
            <DistributionList distributionLists={distributionLists} />
        </div>
    );
};

export default Dashboard;