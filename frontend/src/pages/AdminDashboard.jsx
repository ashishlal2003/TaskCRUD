import React from 'react';
import TaskOverview from '../components/admin/TaskOverview';
import TaskStats from '../components/admin/TaskStats';
import DataVisualization from '../components/admin/DataVisualization';

function AdminPage() {
  return (
    <>
    <head>
    <title>Admin Dashboard</title>
    </head>
    
    <div>
      <h1>Admin Dashboard</h1>
      <br />
      <TaskOverview />
      <TaskStats />
      <DataVisualization />
    </div>
    </>
  );
}

export default AdminPage;
