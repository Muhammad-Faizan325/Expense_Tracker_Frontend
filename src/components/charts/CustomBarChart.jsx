import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";

const CustomBarChart = ({ data, type }) => {
  // SaaS Design Colors
  const mainColor = "#8B5CF6"; 

  // 1. Dynamic Key Detection: Agar 'type' pass nahi kiya toh data check karega
  const dataKeyToUse = type || (data && data[0] && data[0].month ? "month" : "category");

  return (
    <div className="bg-white mt-6 w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
          barSize={data?.length > 15 ? undefined : 40} //
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          
          <XAxis 
            dataKey={dataKeyToUse} //
            tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }} 
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd" 
            minTickGap={25} 
            dy={10}
          />
          
          <YAxis 
            tick={{ fontSize: 11, fill: "#64748b" }} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`} //
          />
          
          <Tooltip 
            cursor={{ fill: '#f8fafc', radius: 10 }} 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
            }}
          />

          <Bar 
            dataKey="amount" 
            radius={[8, 8, 0, 0]} //
          >
            {data?.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={mainColor}
                fillOpacity={index === data.length - 1 ? 1 : 0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;