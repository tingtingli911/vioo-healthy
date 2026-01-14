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
      <div class="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart :data="glucoseData">
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" :stopColor="'hsl(var(--health-glucose))'" :stopOpacity="0.3"/>
                <stop offset="95%" :stopColor="'hsl(var(--health-glucose))'" :stopOpacity="0"/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              :axisLine="false"
              :tickLine="false"
              :tick="{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }"
            />
            <YAxis 
              :domain="[4, 12]"
              :axisLine="false"
              :tickLine="false"
              :tick="{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }"
              :width="30"
            />
            <Tooltip 
              :contentStyle="{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                fontSize: '12px',
              }"
              :formatter="(value) => [`${value} mmol/L`, '血糖']"
            />
            <ReferenceLine 
              :y="7.8" 
              :stroke="'hsl(var(--health-glucose))'" 
              strokeDasharray="3 3" 
              :strokeOpacity="0.5"
            />
            <ReferenceLine 
              :y="6.1" 
              :stroke="'hsl(var(--health-ai))'" 
              strokeDasharray="3 3" 
              :strokeOpacity="0.5"
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              :stroke="'hsl(var(--health-glucose))'"
              :strokeWidth="2.5"
              fill="url(#glucoseGradient)"
              :dot="{ fill: 'hsl(var(--health-glucose))', strokeWidth: 0, r: 4 }"
              :activeDot="{ r: 6, fill: 'hsl(var(--health-glucose))' }"
            />
          </AreaChart>
        </ResponsiveContainer>
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
import { ref } from 'vue'
import { Plus, Droplets, Clock } from 'lucide-vue-next'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'
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
</script>
