<template>
  <div class="min-h-screen bg-background">
    <!-- Dashboard Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div class="container max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-effect">
              <Sparkles class="w-5 h-5 text-primary-foreground" />
            </div>
            <span class="text-xl font-bold gradient-text">vioo</span>
          </div>

          <div class="flex items-center gap-2">
            <Button variant="ghost" size="icon" class="rounded-full">
              <Bell class="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Settings class="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" class="rounded-full" @click="$emit('logout')">
              <LogOut class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="pt-24 pb-12 px-6">
      <div class="container max-w-6xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-10">
          <h1 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
            您好，欢迎回来 👋
          </h1>
          <p class="text-muted-foreground">
            今天是您健康管理的第 <span class="text-primary font-semibold">128</span> 天
          </p>
        </div>

        <!-- Health Metrics Overview -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div
            v-for="metric in healthMetrics"
            :key="metric.label"
            class="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-muted-foreground">{{ metric.label }}</span>
              <div class="flex items-center gap-1">
                <component :is="getTrendIcon(metric.trend)" />
                <span :class="[
                  'text-xs',
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-primary' : 
                  'text-muted-foreground'
                ]">
                  {{ metric.change }}
                </span>
              </div>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-bold text-foreground">{{ metric.value }}</span>
              <span class="text-sm text-muted-foreground">{{ metric.unit }}</span>
            </div>
          </div>
        </div>

        <!-- AI Suggestions Card -->
        <div class="mb-10 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles class="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 class="font-semibold text-foreground">AI 健康助手</h3>
              <p class="text-sm text-muted-foreground">今日健康建议</p>
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="(suggestion, index) in aiSuggestions"
              :key="index"
              class="flex items-start gap-3 p-3 rounded-xl bg-background/60 backdrop-blur"
            >
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-medium text-primary">{{ index + 1 }}</span>
              </div>
              <p class="text-sm text-foreground leading-relaxed">{{ suggestion }}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            class="mt-4 text-primary hover:text-primary gap-1"
            @click="$emit('navigate', 'ai')"
          >
            查看更多建议
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>

        <!-- Module Cards -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-foreground">功能模块</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <button
              v-for="module in modules"
              :key="module.id"
              @click="$emit('navigate', module.id)"
              class="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-transparent transition-all duration-300 text-left"
            >
              <!-- Gradient overlay on hover -->
              <div :class="[
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                module.color
              ]" />
              
              <div class="relative p-6 flex items-center gap-5">
                <div :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110',
                  module.bgColor
                ]">
                  <component :is="module.icon" :class="['w-7 h-7', module.textColor]" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-foreground mb-1">
                    {{ module.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    {{ module.subtitle }}
                  </p>
                </div>
                <ChevronRight class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex flex-wrap gap-3">
          <Button variant="outline" class="rounded-full gap-2">
            <Plus class="w-4 h-4" />
            记录体重
          </Button>
          <Button variant="outline" class="rounded-full gap-2">
            <Plus class="w-4 h-4" />
            记录血糖
          </Button>
          <Button variant="outline" class="rounded-full gap-2">
            <Plus class="w-4 h-4" />
            上传体检报告
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Sparkles, Scale, Droplets, ClipboardList, ArrowRight, Plus, Bell, Settings, LogOut, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineEmits(['navigate', 'logout'])

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
]

const healthMetrics = [
  { label: "体重", value: "68.5", unit: "kg", trend: "down", change: "-0.5" },
  { label: "BMI", value: "22.3", unit: "", trend: "stable", change: "0" },
  { label: "血糖(空腹)", value: "5.2", unit: "mmol/L", trend: "stable", change: "0" },
  { label: "健康评分", value: "86", unit: "分", trend: "up", change: "+2" },
]

const aiSuggestions = [
  "今日建议适量运动30分钟，有助于保持体重稳定",
  "您的空腹血糖在正常范围，继续保持良好的饮食习惯",
  "距离下次体检还有45天，建议提前预约",
]

const getTrendIcon = (trend) => {
  switch (trend) {
    case "up":
      return TrendingUp
    case "down":
      return TrendingDown
    default:
      return Minus
  }
}
</script>
