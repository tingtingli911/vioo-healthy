import { Button } from "@/components/ui/button";
import { Sparkles, Scale, Droplets, ClipboardList, ArrowRight, Plus, Bell, Settings, LogOut, TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const modules = [
  {
    id: "ai",
    icon: Sparkles,
    title: "智能健康",
    subtitle: "AI 分析与建议",
    color: "from-primary to-primary/70",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    id: "weight",
    icon: Scale,
    title: "体重管理",
    subtitle: "体重 & BMI 追踪",
    color: "from-health-weight to-health-weight/70",
    bgColor: "bg-health-weight/10",
    textColor: "text-health-weight",
  },
  {
    id: "glucose",
    icon: Droplets,
    title: "血糖管理",
    subtitle: "血糖监测分析",
    color: "from-health-glucose to-health-glucose/70",
    bgColor: "bg-health-glucose/10",
    textColor: "text-health-glucose",
  },
  {
    id: "report",
    icon: ClipboardList,
    title: "体检报告",
    subtitle: "报告解读管理",
    color: "from-health-report to-health-report/70",
    bgColor: "bg-health-report/10",
    textColor: "text-health-report",
  },
];

const healthMetrics = [
  { label: "体重", value: "68.5", unit: "kg", trend: "down", change: "-0.5" },
  { label: "BMI", value: "22.3", unit: "", trend: "stable", change: "0" },
  { label: "血糖(空腹)", value: "5.2", unit: "mmol/L", trend: "stable", change: "0" },
  { label: "健康评分", value: "86", unit: "分", trend: "up", change: "+2" },
];

const aiSuggestions = [
  "今日建议适量运动30分钟，有助于保持体重稳定",
  "您的空腹血糖在正常范围，继续保持良好的饮食习惯",
  "距离下次体检还有45天，建议提前预约",
];

export function DashboardPage({ onNavigate, onLogout }: DashboardPageProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-primary" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-effect">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">vioo</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              您好，欢迎回来 👋
            </h1>
            <p className="text-muted-foreground">
              今天是您健康管理的第 <span className="text-primary font-semibold">128</span> 天
            </p>
          </div>

          {/* Health Metrics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {healthMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggestions Card */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI 健康助手</h3>
                <p className="text-sm text-muted-foreground">今日健康建议</p>
              </div>
            </div>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/60 backdrop-blur"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="mt-4 text-primary hover:text-primary gap-1"
              onClick={() => onNavigate("ai")}
            >
              查看更多建议
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Module Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">功能模块</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => onNavigate(module.id)}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-transparent transition-all duration-300 text-left"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative p-6 flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl ${module.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-7 h-7 ${module.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full gap-2">
              <Plus className="w-4 h-4" />
              记录体重
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
              <Plus className="w-4 h-4" />
              记录血糖
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
              <Plus className="w-4 h-4" />
              上传体检报告
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
