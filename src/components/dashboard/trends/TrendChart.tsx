
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
      <div className="h-[800px] w-full max-w-[1800px] mx-auto"> {/* Increased height and max-width further */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 60, right: 100, left: 100, bottom: 60 }} // Increased margins even more
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              horizontal={true} 
              vertical={false} 
            />
            <XAxis 
              dataKey="time"
              tick={{ fill: '#1e293b', fontSize: 24 }} // Increased font size further
              tickLine={{ stroke: '#64748b', strokeWidth: 3 }}
              tickMargin={30} // Increased margin
              stroke="#64748b"
              strokeWidth={3}
            />
            <YAxis 
              tick={{ fill: '#1e293b', fontSize: 24 }} // Increased font size further
              tickLine={{ stroke: '#64748b', strokeWidth: 3 }}
              tickFormatter={(value) => value.toLocaleString()}
              tickMargin={30} // Increased margin
              stroke="#64748b"
              strokeWidth={3}
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ fontSize: '22px' }} // Increased tooltip font size
            />
            <Legend 
              verticalAlign="top" 
              height={100} // Increased height further
              formatter={(value) => <span className="text-3xl font-medium">{value}</span>} // Increased legend text size
              wrapperStyle={{ paddingBottom: '60px' }}
            />
            <ReferenceLine 
              y={averageValue} 
              stroke="#94a3b8" 
              strokeWidth={3}
              strokeDasharray="3 3"
              label={{ 
                value: 'Media', 
                position: 'right',
                fill: '#1e293b',
                fontSize: 24,
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
                strokeWidth={6} // Increased line thickness
                dot={{ r: 12, fill: color, strokeWidth: 3 }} // Increased dot size
                activeDot={{ r: 14, fill: color }} // Increased active dot size
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
