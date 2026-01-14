import { Sparkles, Scale, Droplets, ClipboardList, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModulePageProps {
  moduleId: string;
  onBack: () => void;
}

const moduleConfig = {
  ai: {
    icon: Sparkles,
    title: "智能健康管理",
    description: "综合分析您的健康数据，提供个性化的日常建议和健康方案",
    color: "bg-primary/10 text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
  weight: {
    icon: Scale,
    title: "体重管理",
    description: "记录体重变化，追踪 BMI 趋势，科学管理体重目标",
    color: "bg-health-weight/10 text-health-weight",
    gradient: "from-health-weight/20 to-health-weight/5",
  },
  glucose: {
    icon: Droplets,
    title: "血糖管理",
    description: "监测血糖水平，分析血糖波动，智能提醒异常情况",
    color: "bg-health-glucose/10 text-health-glucose",
    gradient: "from-health-glucose/20 to-health-glucose/5",
  },
  report: {
    icon: ClipboardList,
    title: "体检报告管理",
    description: "上传体检报告，AI 解读健康指标，追踪历史变化",
    color: "bg-health-report/10 text-health-report",
    gradient: "from-health-report/20 to-health-report/5",
  },
};

export function ModulePage({ moduleId, onBack }: ModulePageProps) {
  const config = moduleConfig[moduleId as keyof typeof moduleConfig];
  
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className={`bg-gradient-to-b ${config.gradient} py-16 px-6`}>
        <div className="container max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>

          <div className="flex items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl ${config.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {config.title}
              </h1>
              <p className="text-muted-foreground">
                {config.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="py-16 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center">
            <div className={`w-20 h-20 rounded-2xl ${config.color} flex items-center justify-center mx-auto mb-6`}>
              <Icon className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {config.title}功能开发中
            </h2>
            <p className="text-muted-foreground mb-6">
              该模块正在建设中，敬请期待更多精彩功能
            </p>
            <Button onClick={onBack} variant="outline" className="rounded-full">
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
