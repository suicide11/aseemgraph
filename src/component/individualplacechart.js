import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class individualPlaceChart extends PureComponent {
  render() {
    return (
    <ResponsiveContainer>
      
      <BarChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" style={{display:"none"}} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="high" fill="#8884d8" />
        <Bar dataKey="low" fill="#82ca9d" />
        <Bar dataKey="dryDays" fill="magenta" />
        <Bar dataKey="snowDays" fill="red" />
        <Bar dataKey="rainfall" fill="blue" />
      </BarChart>
      </ResponsiveContainer>
    );
  }
}
