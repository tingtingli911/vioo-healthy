import { Button } from "@/components/ui/button";
import { Sparkles, Scale, Droplets, ClipboardList, ArrowRight, Check, Shield, Brain, TrendingUp, Heart } from "lucide-react";

interface HomePageProps {
  onLogin: () => void;
}

const features = [
  {
    icon: Sparkles,
    title: "智能健康管理",
    description: "AI 分析健康数据，提供个性化建议",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Scale,
    title: "体重管理",
    description: "记录追踪体重变化与 BMI 趋势",
    color: "bg-health-weight/10 text-health-weight",
  },
  {
    icon: Droplets,
    title: "血糖管理",
    description: "监测血糖水平，智能分析波动",
    color: "bg-health-glucose/10 text-health-glucose",
  },
  {
    icon: ClipboardList,
    title: "体检报告",
    description: "上传体检报告，AI 解读健康指标",
    color: "bg-health-report/10 text-health-report",
  },
];

const benefits = [
  "数据安全加密存储",
  "AI 智能分析建议",
  "多维度健康追踪",
  "个性化健康方案",
];

const highlights = [
  {
    icon: Brain,
    title: "AI 智能分析",
    description: "基于先进的人工智能算法，深度分析您的健康数据，发现潜在风险",
  },
  {
    icon: Shield,
    title: "隐私安全保障",
    description: "采用银行级加密技术，您的健康数据只属于您自己",
  },
  {
    icon: TrendingUp,
    title: "趋势预测",
    description: "通过历史数据分析，预测健康趋势，提前预警异常",
  },
  {
    icon: Heart,
    title: "贴心健康助手",
    description: "24小时智能健康顾问，随时为您提供专业建议",
  },
];

export function HomePage({ onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>您的专属 AI 健康管理助手</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              让每一天的健康
              <br />
              <span className="gradient-text">都有智能守护</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              vioo 是专为个人打造的智能健康管理平台。整合体重、血糖、体检报告等多维健康数据，
              通过 AI 技术为您提供全方位的健康洞察与个性化管理方案。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2 glow-effect text-base" onClick={onLogin}>
                免费开始使用
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                了解更多
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-sm text-muted-foreground">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why vioo Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              为什么选择 <span className="gradient-text">vioo</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              我们致力于为每个人提供简单、智能、安全的健康管理体验
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-5 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">四大核心功能模块</h2>
            <p className="text-muted-foreground text-lg">全方位健康数据管理与智能分析</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="feature-card text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-5 mx-auto transition-transform group-hover:scale-110`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            开启您的智能健康之旅
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            立即注册，让 vioo 成为您的专属健康管理助手，用科技的力量守护您的每一天
          </p>
          <Button size="lg" className="rounded-full px-10 gap-2 glow-effect text-base" onClick={onLogin}>
            立即免费注册
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">vioo</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 vioo. 您的智能健康管理助手
          </p>
        </div>
      </footer>
    </div>
  );
}
