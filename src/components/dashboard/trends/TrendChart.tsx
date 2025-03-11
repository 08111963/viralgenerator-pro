
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
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Nessun dato disponibile</p>
      </div>
    );
  }

  const averageValue = data.reduce((sum, item) => sum + item.volume, 0) / data.length;

  return (
    <div className="space-y-4">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              horizontal={true} 
              vertical={false} 
            />
            <XAxis 
              dataKey="time"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#64748b' }}
              tickMargin={12}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#64748b' }}
              tickFormatter={(value) => value.toLocaleString()}
              tickMargin={12}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              wrapperStyle={{ paddingBottom: '20px' }}
            />
            <ReferenceLine 
              y={averageValue} 
              stroke="#94a3b8" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Media', 
                position: 'right',
                fill: '#94a3b8',
                fontSize: 12 
              }} 
            />
            {Object.entries(metrics).map(([key, { color, name }]) => (
              <Line
                key={key}
                type="monotone"
                dataKey="volume"
                stroke={color}
                name={name}
                strokeWidth={2}
                dot={{ r: 4, fill: color, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color }}
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
