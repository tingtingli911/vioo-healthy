import { Heart, Activity, Moon, Footprints } from "lucide-react";

const healthMetrics = [
  { 
    label: "今日心率", 
    value: "72", 
    unit: "bpm", 
    icon: Heart, 
    status: "正常",
    color: "text-health-glucose" 
  },
  { 
    label: "活动量", 
    value: "6,842", 
    unit: "步", 
    icon: Footprints, 
    status: "良好",
    color: "text-health-weight" 
  },
  { 
    label: "睡眠", 
    value: "7.5", 
    unit: "小时", 
    icon: Moon, 
    status: "充足",
    color: "text-health-report" 
  },
  { 
    label: "活力指数", 
    value: "85", 
    unit: "分", 
    icon: Activity, 
    status: "优秀",
    color: "text-health-ai" 
  },
];

export function HealthOverview() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {healthMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="health-card animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`module-icon bg-muted ${metric.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {metric.status}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="stat-number text-2xl font-semibold text-foreground">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
