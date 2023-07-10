import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

function TaskStats() {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    // Fetch task data from API
    // Example API request:
    // axios.get('/api/tasks')
    //   .then(response => setTaskData(response.data))
    //   .catch(error => console.log(error));

    // Dummy data for demonstration
    const dummyTaskData = [
      { user: 'User A', count: 10 },
      { user: 'User B', count: 15 },
      { user: 'User C', count: 5 },
    ];
    setTaskData(dummyTaskData);
  }, []);

  useEffect(() => {
    // Generate a bar chart using D3.js
    const barChartContainer = d3.select('#barChartContainer');
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const xScale = d3.scaleBand()
      .domain(taskData.map(d => d.user))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(taskData, d => d.count)])
      .range([height - margin.bottom, margin.top]);

    const barChart = barChartContainer.append('svg')
      .attr('width', width)
      .attr('height', height);

    barChart.selectAll('rect')
      .data(taskData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.user))
      .attr('y', d => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.count))
      .attr('fill', '#61CDBB');

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    barChart.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    barChart.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  }, [taskData]);

  return (
    <div>
      <h2>Task Statistics</h2>
      <div id="barChartContainer"></div>
    </div>
  );
}

export default TaskStats;
