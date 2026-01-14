<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-foreground">血糖管理</h1>
        <p class="text-sm text-muted-foreground mt-1">监测血糖水平变化</p>
      </div>
      <Button class="gap-2 rounded-xl" @click="showAddDialog = true">
        <Plus class="w-4 h-4" />
        记录
      </Button>
    </div>

    <!-- Current Status -->
    <div class="health-card bg-health-glucose/10 border-health-glucose/20">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-health-glucose/15 flex items-center justify-center">
          <Droplets class="w-7 h-7 text-health-glucose" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground">最新血糖</p>
          <div class="flex items-baseline gap-1">
            <span class="stat-number text-3xl font-bold text-foreground">6.8</span>
            <span class="text-sm text-muted-foreground">mmol/L</span>
          </div>
          <p class="text-xs text-health-glucose mt-0.5">22:00 · 睡前</p>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="health-card text-center"
      >
        <p class="text-[10px] text-muted-foreground">{{ stat.label }}</p>
        <p class="stat-number text-lg font-semibold text-foreground mt-1">
          {{ stat.value }}
        </p>
        <span :class="[
          'text-[10px] font-medium mt-1 inline-block px-2 py-0.5 rounded-full',
          stat.status === '正常' ? 'bg-health-ai/10 text-health-ai' :
          stat.status === '偏高' ? 'bg-health-glucose/10 text-health-glucose' :
          'bg-health-weight/10 text-health-weight'
        ]">
          {{ stat.status }}
        </span>
      </div>
    </div>

    <!-- Chart -->
    <div class="health-card">
      <h3 class="text-sm font-medium text-foreground mb-4">今日血糖曲线</h3>
      <div class="h-52 relative">
        <svg viewBox="0 0 400 220" class="w-full h-full" preserveAspectRatio="none">
          <!-- 渐变定义 -->
          <defs>
            <linearGradient id="glucoseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="5%" :stop-color="'hsl(var(--health-glucose))'" stop-opacity="0.3" />
              <stop offset="95%" :stop-color="'hsl(var(--health-glucose))'" stop-opacity="0" />
            </linearGradient>
          </defs>
          
          <!-- Y轴网格线 -->
          <line v-for="i in 4" :key="`grid-y-${i}`" 
            :x1="0" :y1="i * 50" :x2="400" :y2="i * 50"
            stroke="hsl(var(--border))" stroke-width="0.5" opacity="0.3" />
          
          <!-- 参考线：餐后上限 7.8 -->
          <line 
            x1="0" 
            :y1="((12 - 7.8) / (12 - 4)) * 200" 
            x2="400" 
            :y2="((12 - 7.8) / (12 - 4)) * 200"
            :stroke="'hsl(var(--health-glucose))'"
            stroke-dasharray="3 3"
            stroke-opacity="0.5"
            stroke-width="1"
          />
          
          <!-- 参考线：空腹上限 6.1 -->
          <line 
            x1="0" 
            :y1="((12 - 6.1) / (12 - 4)) * 200" 
            x2="400" 
            :y2="((12 - 6.1) / (12 - 4)) * 200"
            :stroke="'hsl(var(--health-ai))'"
            stroke-dasharray="3 3"
            stroke-opacity="0.5"
            stroke-width="1"
          />
          
          <!-- 数据区域 -->
          <polygon 
            :points="chartAreaPoints" 
            fill="url(#glucoseGradient)" 
          />
          
          <!-- 数据线 -->
          <polyline 
            :points="chartLinePoints"
            fill="none"
            :stroke="'hsl(var(--health-glucose))'"
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
            :fill="'hsl(var(--health-glucose))'"
          />
          
          <!-- X轴标签 -->
          <text 
            v-for="(item, index) in glucoseData" 
            :key="`label-${index}`"
            :x="(index / (glucoseData.length - 1)) * 400" 
            y="215"
            :fill="'hsl(var(--muted-foreground))'"
            font-size="10"
            text-anchor="middle"
          >
            {{ item.time }}
          </text>
        </svg>
      </div>
      <div class="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
        <div class="flex items-center gap-1">
          <div class="w-3 h-0.5 bg-health-glucose rounded" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(var(--health-glucose)) 2px, hsl(var(--health-glucose)) 4px)" />
          <span>餐后上限 7.8</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-0.5 bg-health-ai rounded" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(var(--health-ai)) 2px, hsl(var(--health-ai)) 4px)" />
          <span>空腹上限 6.1</span>
        </div>
      </div>
    </div>

    <!-- Records -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-foreground">今日记录</h3>
      <div
        v-for="(record, index) in glucoseData"
        :key="index"
        class="health-card flex items-center justify-between py-3"
      >
        <div class="flex items-center gap-3">
          <Clock class="w-4 h-4 text-muted-foreground" />
          <div>
            <span class="text-sm font-medium text-foreground">{{ record.time }}</span>
            <span class="text-xs text-muted-foreground ml-2">{{ record.type }}</span>
          </div>
        </div>
        <span :class="[
          'stat-number text-lg font-medium',
          record.value > 7.8 ? 'text-health-glucose' : 'text-foreground'
        ]">
          {{ record.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Plus, Droplets, Clock } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const showAddDialog = ref(false)

const glucoseData = [
  { time: "6:00", value: 5.2, type: "空腹" },
  { time: "8:30", value: 7.8, type: "早餐后" },
  { time: "12:30", value: 8.1, type: "午餐后" },
  { time: "15:00", value: 6.2, type: "下午" },
  { time: "19:00", value: 9.2, type: "晚餐后" },
  { time: "22:00", value: 6.8, type: "睡前" },
]

const stats = [
  { label: "空腹血糖", value: "5.2", unit: "mmol/L", status: "正常" },
  { label: "餐后血糖", value: "8.4", unit: "mmol/L", status: "偏高" },
  { label: "日均血糖", value: "7.2", unit: "mmol/L", status: "良好" },
]

// 计算图表数据点
const chartPoints = computed(() => {
  const min = 4
  const max = 12
  const range = max - min
  
  return glucoseData.map((item, index) => ({
    x: (index / (glucoseData.length - 1)) * 400,
    y: 200 - ((item.value - min) / range) * 200,
    value: item.value
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
