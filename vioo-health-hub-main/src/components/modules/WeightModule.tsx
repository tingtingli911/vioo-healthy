import { Plus, TrendingDown, Target, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const weightData = [
  { date: "1/7", weight: 68.5 },
  { date: "1/8", weight: 68.3 },
  { date: "1/9", weight: 68.4 },
  { date: "1/10", weight: 68.1 },
  { date: "1/11", weight: 67.9 },
  { date: "1/12", weight: 67.8 },
  { date: "1/13", weight: 67.6 },
];

const stats = [
  { label: "当前体重", value: "67.6", unit: "kg", icon: TrendingDown },
  { label: "目标体重", value: "65.0", unit: "kg", icon: Target },
  { label: "已记录", value: "28", unit: "天", icon: Calendar },
];

export function WeightModule() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">体重管理</h1>
          <p className="text-sm text-muted-foreground mt-1">追踪您的体重变化趋势</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Plus className="w-4 h-4" />
          记录
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="health-card text-center">
              <Icon className="w-5 h-5 text-health-weight mx-auto mb-2" />
              <p className="stat-number text-xl font-semibold text-foreground">
                {stat.value}
                <span className="text-xs text-muted-foreground ml-0.5">{stat.unit}</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="health-card">
        <h3 className="text-sm font-medium text-foreground mb-4">近7天趋势</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                width={35}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value} kg`, '体重']}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--health-weight))"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--health-weight))', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--health-weight))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Records */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">最近记录</h3>
        {weightData.slice().reverse().slice(0, 5).map((record, index) => (
          <div key={index} className="health-card flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">{record.date}</span>
            <span className="stat-number text-lg font-medium text-foreground">
              {record.weight} <span className="text-xs text-muted-foreground">kg</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
