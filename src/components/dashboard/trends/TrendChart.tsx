import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, ReferenceLine } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm flex items-center gap-2">
            <span style={{ color: entry.color }}>●</span>
            <span className="font-medium">{entry.name}:</span>
            <span>{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface TrendChartProps {
  data: any[];
  metrics: {
    [key: string]: {
      color: string;
      name: string;
    };
  };
}

export const TrendChart = ({ data, metrics }: TrendChartProps) => {
  const averageValue = data.reduce((sum, item) => sum + item.volume, 0) / data.length;

  return (
    <div className="space-y-4">
      <div className="h-[500px]"> {/* Increased height significantly */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 30, right: 40, left: 40, bottom: 20 }} // Increased margins
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              horizontal={true} 
              vertical={false} 
            />
            <XAxis 
              dataKey="time"
              tick={{ fill: '#1e293b', fontSize: 16 }} // Increased font size
              tickLine={{ stroke: '#64748b', strokeWidth: 2 }}
              tickMargin={16} // Increased margin
              stroke="#64748b"
              strokeWidth={2}
            />
            <YAxis 
              tick={{ fill: '#1e293b', fontSize: 16 }} // Increased font size
              tickLine={{ stroke: '#64748b', strokeWidth: 2 }}
              tickFormatter={(value) => value.toLocaleString()}
              tickMargin={16} // Increased margin
              stroke="#64748b"
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={50} // Increased height
              formatter={(value) => <span className="text-lg font-medium">{value}</span>}
              wrapperStyle={{ paddingBottom: '30px' }}
            />
            <ReferenceLine 
              y={averageValue} 
              stroke="#94a3b8" 
              strokeWidth={2}
              strokeDasharray="3 3"
              label={{ 
                value: 'Media', 
                position: 'right',
                fill: '#1e293b',
                fontSize: 16,
                fontWeight: 600
              }} 
            />
            {Object.entries(metrics).map(([key, { color, name }]) => (
              <Line
                key={key}
                type="monotone"
                dataKey="volume"
                stroke={color}
                name={name}
                strokeWidth={4} // Increased line thickness
                dot={{ r: 8, fill: color, strokeWidth: 2 }} // Increased dot size
                activeDot={{ r: 10, fill: color }} // Increased active dot size
                animationDuration={1500}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
