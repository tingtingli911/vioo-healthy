import { Sparkles, Scale, Droplets, ClipboardList, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardsProps {
  onNavigate: (tab: string) => void;
}

const modules = [
  {
    id: "ai",
    title: "智能健康管理",
    description: "AI分析您的健康数据，提供个性化建议",
    icon: Sparkles,
    bgClass: "bg-health-ai-light",
    iconClass: "text-health-ai bg-health-ai/15",
    stats: "3条建议待查看",
  },
  {
    id: "weight",
    title: "体重管理",
    description: "记录体重变化，追踪BMI趋势",
    icon: Scale,
    bgClass: "bg-health-weight-light",
    iconClass: "text-health-weight bg-health-weight/15",
    stats: "已记录28天",
  },
  {
    id: "glucose",
    title: "血糖管理",
    description: "监测血糖水平，智能分析波动",
    icon: Droplets,
    bgClass: "bg-health-glucose-light",
    iconClass: "text-health-glucose bg-health-glucose/15",
    stats: "今日2次记录",
  },
  {
    id: "report",
    title: "体检报告管理",
    description: "上传体检报告，AI解读健康指标",
    icon: ClipboardList,
    bgClass: "bg-health-report-light",
    iconClass: "text-health-report bg-health-report/15",
    stats: "最近: 2024年12月",
  },
];

export function ModuleCards({ onNavigate }: ModuleCardsProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground px-1">健康模块</h2>
      <div className="space-y-3">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => onNavigate(module.id)}
              className={cn(
                "w-full health-card flex items-center gap-4 text-left",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={cn("module-icon", module.iconClass)}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm">
                  {module.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {module.description}
                </p>
                <p className="text-[10px] text-primary mt-1 font-medium">
                  {module.stats}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
