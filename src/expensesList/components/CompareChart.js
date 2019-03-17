import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CompareChart = ({ expenses }) => {
  return (
    <ComposedChart
      width={600}
      height={300}
      data={expenses}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="food" stackId="a" fill="#ffa18f" />
      <Bar dataKey="living" stackId="a" fill="#ff6f61" />
      <Bar dataKey="transport" stackId="a" fill="#c63d37" />
      <Line type="monotone" dataKey="living" stroke="#184a45" />
    </ComposedChart>
  );
};

export default CompareChart;
