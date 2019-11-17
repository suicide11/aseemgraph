import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import axios from 'axios'

export default class allPlaceChart extends PureComponent {
    state={
        data:[],
        ready:false
    }
    
  render() {
    console.log(this.props)
    return (
    <div className="container-fluid">
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
        <Bar dataKey="max" fill="#8884d8" />
        <Bar dataKey="min" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
    );
  }
}
