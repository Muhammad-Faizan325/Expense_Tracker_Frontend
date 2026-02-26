import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ChartTooltip from '../ChartTooltip/ChartTooltip';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div className="relative w-full h-[350px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value" // FIX: "amount" ko "value" kar diya taake transform data match ho sake
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={110} 
            paddingAngle={0} 
            cornerRadius={0}
            minAngle={2}
            stroke="none"
            animationDuration={1000}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                className="focus:outline-none"
                stroke="none"
              />
            ))}
          </Pie>
          
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text Section */}
      {showTextAnchor && (
        <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-slate-500 text-[12px] font-bold uppercase tracking-[0.2em] mb-1">
            {label}
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            {totalAmount}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;