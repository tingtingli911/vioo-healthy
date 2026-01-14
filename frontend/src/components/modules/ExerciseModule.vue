<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-foreground">运动管理</h1>
        <p class="text-sm text-muted-foreground mt-1">记录和管理您的运动数据</p>
      </div>
      <Button class="gap-2 rounded-xl" @click="showAddDialog = true">
        <Plus class="w-4 h-4" />
        记录
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="health-card text-center"
      >
        <component :is="stat.icon" class="w-5 h-5 text-primary mx-auto mb-2" />
        <p class="stat-number text-xl font-semibold text-foreground">
          {{ stat.value }}
          <span class="text-xs text-muted-foreground ml-0.5">{{ stat.unit }}</span>
        </p>
        <p class="text-[10px] text-muted-foreground mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="health-card">
      <h3 class="text-sm font-medium text-foreground mb-4">本周运动时长</h3>
      <div class="h-48 relative">
        <svg viewBox="0 0 400 200" class="w-full h-full" preserveAspectRatio="none">
          <!-- 背景网格线 -->
          <defs>
            <linearGradient id="exerciseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :stop-color="'hsl(var(--primary))'" stop-opacity="0.2" />
              <stop offset="100%" :stop-color="'hsl(var(--primary))'" stop-opacity="0" />
            </linearGradient>
          </defs>
          
          <!-- Y轴网格线 -->
          <line v-for="i in 4" :key="`grid-y-${i}`" 
            :x1="0" :y1="i * 50" :x2="400" :y2="i * 50"
            stroke="hsl(var(--border))" stroke-width="0.5" opacity="0.3" />
          
          <!-- 数据区域 -->
          <polygon 
            :points="chartAreaPoints" 
            fill="url(#exerciseGradient)" 
            opacity="0.6"
          />
          
          <!-- 数据线 -->
          <polyline 
            :points="chartLinePoints"
            fill="none"
            :stroke="'hsl(var(--primary))'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          
          <!-- 数据点 -->
          <circle 
            v-for="(point, index) in chartPoints" 
            :key="`point-${index}`"
            :cx="point.x" 
            :cy="point.y" 
            r="4"
            :fill="'hsl(var(--primary))'"
          />
          
          <!-- X轴标签 -->
          <text 
            v-for="(item, index) in exerciseData" 
            :key="`label-${index}`"
            :x="(index / (exerciseData.length - 1)) * 400" 
            y="195"
            :fill="'hsl(var(--muted-foreground))'"
            font-size="11"
            text-anchor="middle"
          >
            {{ item.day }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Recent Records -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-foreground">最近记录</h3>
      <div
        v-for="(record, index) in recentRecords"
        :key="index"
        class="health-card flex items-center justify-between py-3"
      >
        <div class="flex items-center gap-3">
          <component :is="record.icon" class="w-5 h-5 text-primary" />
          <div>
            <span class="text-sm font-medium text-foreground">{{ record.type }}</span>
            <span class="text-xs text-muted-foreground ml-2">{{ record.date }}</span>
          </div>
        </div>
        <span class="stat-number text-lg font-medium text-foreground">
          {{ record.duration }} <span class="text-xs text-muted-foreground">分钟</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Plus, Activity, Calendar, Target } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const showAddDialog = ref(false)

const exerciseData = [
  { day: "周一", duration: 30 },
  { day: "周二", duration: 45 },
  { day: "周三", duration: 25 },
  { day: "周四", duration: 50 },
  { day: "周五", duration: 35 },
  { day: "周六", duration: 60 },
  { day: "周日", duration: 40 },
]

const stats = [
  { label: "本周总时长", value: "285", unit: "分钟", icon: Activity },
  { label: "本周目标", value: "300", unit: "分钟", icon: Target },
  { label: "已记录", value: "7", unit: "天", icon: Calendar },
]

const recentRecords = computed(() => {
  return exerciseData.slice().reverse().slice(0, 5).map(item => ({
    type: "有氧运动",
    date: item.day,
    duration: item.duration,
    icon: Activity
  }))
})

// 计算图表数据点
const chartPoints = computed(() => {
  const values = exerciseData.map(d => d.duration)
  const min = 0
  const max = Math.max(...values) + 10
  const range = max - min
  
  return exerciseData.map((item, index) => ({
    x: (index / (exerciseData.length - 1)) * 400,
    y: 200 - ((item.duration - min) / range) * 180,
    value: item.duration
  }))
})

// 生成折线路径点
const chartLinePoints = computed(() => {
  return chartPoints.value.map(p => `${p.x},${p.y}`).join(' ')
})

// 生成区域路径点（用于填充）
const chartAreaPoints = computed(() => {
  const points = chartPoints.value
  const firstX = points[0].x
  const lastX = points[points.length - 1].x
  return `${firstX},200 ${points.map(p => `${p.x},${p.y}`).join(' ')} ${lastX},200`
})
</script>
