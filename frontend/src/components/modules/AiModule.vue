<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-health-ai to-health-ai/70 flex items-center justify-center">
        <Sparkles class="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-foreground">智能健康管家</h1>
        <p class="text-sm text-muted-foreground">AI驱动的个性化健康建议</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="action in quickActions"
        :key="action.label"
        class="health-card flex flex-col items-center gap-2 py-4 hover:bg-secondary/50"
      >
        <component :is="action.icon" :class="['w-5 h-5', action.color]" />
        <span class="text-[10px] font-medium text-foreground">{{ action.label }}</span>
      </button>
    </div>

    <!-- Daily Tips -->
    <div class="space-y-3">
      <div class="flex items-center gap-2 px-1">
        <Lightbulb class="w-4 h-4 text-health-ai" />
        <h3 class="text-sm font-medium text-foreground">今日健康建议</h3>
      </div>
      <div
        v-for="(tip, index) in dailyTips"
        :key="index"
        class="health-card"
      >
        <div class="flex gap-3">
          <div class="w-10 h-10 rounded-xl bg-health-ai/10 flex items-center justify-center flex-shrink-0">
            <component :is="tip.icon" class="w-5 h-5 text-health-ai" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-medium text-foreground">{{ tip.title }}</h4>
              <span :class="[
                'text-[10px] px-1.5 py-0.5 rounded-full',
                tip.priority === '重要' 
                  ? 'bg-health-glucose/15 text-health-glucose' 
                  : tip.priority === '推荐'
                  ? 'bg-health-ai/15 text-health-ai'
                  : 'bg-muted text-muted-foreground'
              ]">
                {{ tip.priority }}
              </span>
            </div>
            <p class="text-xs text-muted-foreground mt-1 leading-relaxed">
              {{ tip.content }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Section -->
    <div class="space-y-3">
      <div class="flex items-center gap-2 px-1">
        <MessageCircle class="w-4 h-4 text-health-ai" />
        <h3 class="text-sm font-medium text-foreground">健康对话</h3>
      </div>
      
      <div class="health-card space-y-4 max-h-72 overflow-y-auto">
        <div
          v-for="(msg, index) in chatHistory"
          :key="index"
          :class="[
            'flex',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            ]"
          >
            <p class="whitespace-pre-line leading-relaxed">{{ msg.content }}</p>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="flex gap-2">
        <input
          v-model="message"
          type="text"
          placeholder="询问健康相关问题..."
          class="flex-1 h-12 px-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          @keyup.enter="sendMessage"
        />
        <Button size="icon" class="h-12 w-12 rounded-xl" @click="sendMessage">
          <Send class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles, MessageCircle, Lightbulb, Send, Heart, Salad, Moon, Dumbbell } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const message = ref('')

const quickActions = [
  { icon: Salad, label: "饮食建议", color: "text-health-ai" },
  { icon: Dumbbell, label: "运动计划", color: "text-health-weight" },
  { icon: Moon, label: "睡眠分析", color: "text-health-report" },
  { icon: Heart, label: "心血管", color: "text-health-glucose" },
]

const dailyTips = [
  {
    title: "今日运动目标",
    content: "建议步行8000步或进行30分钟中等强度有氧运动",
    icon: Dumbbell,
    priority: "推荐",
  },
  {
    title: "血糖控制提醒",
    content: "晚餐建议选择低GI食物，如糙米、燕麦等，避免精制碳水",
    icon: Salad,
    priority: "重要",
  },
  {
    title: "睡眠质量提升",
    content: "最近睡眠时长良好，建议保持22:30前入睡的习惯",
    icon: Moon,
    priority: "建议",
  },
]

const chatHistory = ref([
  { role: "assistant", content: "您好！我是vioo智能健康助手。基于您最近的健康数据，我发现有几点需要关注。您想了解哪方面的建议？" },
  { role: "user", content: "帮我分析一下我最近的血糖情况" },
  { role: "assistant", content: "根据您过去7天的血糖记录分析：\n\n✅ 空腹血糖平均5.4mmol/L，控制良好\n⚠️ 餐后2小时血糖偶有超过8.0mmol/L\n\n建议：\n1. 晚餐减少精制碳水比例\n2. 餐后30分钟进行轻度活动\n3. 增加膳食纤维摄入" },
])

const sendMessage = () => {
  if (!message.value.trim()) return
  // TODO: 实现发送消息逻辑
  message.value = ''
}
</script>
