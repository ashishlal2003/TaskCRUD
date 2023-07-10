import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function DataVisualization() {
  const [userData, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/admin/allUsers'); 
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTaskData = async () => {
      try {
        const response = await axios.get('/api/admin/all'); 
        setTaskData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
    fetchTaskData();
  }, []);

  useEffect(() => {
    if (userData.length > 0 && taskData.length > 0) {
      // Generate a bar chart using D3.js
      const barChartContainer = d3.select('#barChartContainer');
      const width = 400;
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const xScale = d3.scaleLinear()
        .domain([0, userData.length - 1])
        .range([margin.left, width - margin.right]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(taskData, d => d.count)])
        .range([height - margin.bottom, margin.top]);

      const barChart = barChartContainer.append('svg')
        .attr('width', width)
        .attr('height', height);

      barChart.selectAll('rect')
        .data(userData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => {
          const task = taskData.find(t => t.user === d._id);
          if (task) {
            return yScale(task.count);
          } else {
            return yScale(0); // Set y to 0 when task data is not found for a user
          }
        })
        .attr('width', (width - margin.left - margin.right) / userData.length)
        .attr('height', d => {
          const task = taskData.find(t => t.user === d._id);
          if (task) {
            return height - margin.bottom - yScale(task.count);
          } else {
            return 0; // Set height to 0 when task data is not found for a user
          }
        })
        .attr('fill', '#61CDBB');

      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => d + 1); // Increment the tick value by 1 to match the number of users

      const yAxis = d3.axisLeft(yScale)
        .ticks(5) // Adjust the number of ticks as per your preference

      barChart.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      barChart.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);
    }
  }, [userData, taskData]);

  return (
    <div>
      <h2>Data Visualization</h2>
      <div id="barChartContainer"></div>
    </div>
  );
}

export default DataVisualization;
