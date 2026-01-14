import { Lightbulb, AlertCircle, TrendingUp, Utensils } from "lucide-react";

const suggestions = [
  {
    id: 1,
    type: "insight",
    icon: TrendingUp,
    title: "体重趋势良好",
    content: "过去7天体重下降0.5kg，保持当前的饮食和运动习惯",
    color: "text-health-ai",
    bgColor: "bg-health-ai/10",
  },
  {
    id: 2,
    type: "alert",
    icon: AlertCircle,
    title: "血糖波动提醒",
    content: "昨日晚餐后血糖偏高，建议减少碳水化合物摄入",
    color: "text-health-glucose",
    bgColor: "bg-health-glucose/10",
  },
  {
    id: 3,
    type: "tip",
    icon: Utensils,
    title: "饮食建议",
    content: "今日推荐：增加绿叶蔬菜摄入，有助于稳定血糖",
    color: "text-health-weight",
    bgColor: "bg-health-weight/10",
  },
];

export function AiSuggestions() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">AI 健康建议</h2>
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={suggestion.id}
              className="health-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${suggestion.bgColor}`}>
                  <Icon className={`w-4 h-4 ${suggestion.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {suggestion.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
