import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function TaskOverview() {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('/api/admin/all');
        setTaskData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTaskData();
  }, []);

  useEffect(() => {
    const generatePieChart = () => {
      const pieChartContainer = d3.select('#pieChartContainer');
      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const colorScale = d3.scaleOrdinal()
        .domain(taskData.map(d => d.status ? 'completed' : 'in progress'))
        .range(['#61CDBB', '#FFD700']);

      const pie = d3.pie().value(d => d.count);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const pieChart = pieChartContainer.select('svg');

      if (pieChart.empty()) {
        pieChartContainer.append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
      }

      const arcs = pieChart.select('g')
        .selectAll('arc')
        .data(pie(getTaskCounts()))
        .enter()
        .append('g');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(d.data.status));

      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => `${d.data.status} (${d.data.count})`);
    };

    const getTaskCounts = () => {
      const completedCount = taskData.filter(task => task.status).length;
      const inProgressCount = taskData.filter(task => !task.status).length;

      return [
        { status: 'completed', count: completedCount },
        { status: 'in progress', count: inProgressCount },
      ];
    };

    if (taskData.length > 0) {
      generatePieChart();
    }
  }, [taskData]);

  return (
    <div>
      <h2>Overview Dashboard</h2>
      <div id="pieChartContainer"></div>
    </div>
  );
}

export default TaskOverview;
