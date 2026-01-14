<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div :class="[
      'bg-gradient-to-b py-16 px-6',
      config.gradient
    ]">
      <div class="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('back')"
          class="mb-6 gap-2"
        >
          <ArrowLeft class="w-4 h-4" />
          返回首页
        </Button>

        <div class="flex items-start gap-5">
          <div :class="[
            'w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0',
            config.color
          ]">
            <component :is="config.icon" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-foreground mb-2">
              {{ config.title }}
            </h1>
            <p class="text-muted-foreground">
              {{ config.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="py-16 px-6">
      <div class="container max-w-4xl mx-auto">
        <component :is="moduleComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Sparkles, Scale, Droplets, ClipboardList, ArrowLeft } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import AiModule from '@/components/modules/AiModule.vue'
import WeightModule from '@/components/modules/WeightModule.vue'
import GlucoseModule from '@/components/modules/GlucoseModule.vue'
import ReportModule from '@/components/modules/ReportModule.vue'

const props = defineProps({
  moduleId: {
    type: String,
    required: true
  }
})

defineEmits(['back'])

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
}

const config = computed(() => {
  return moduleConfig[props.moduleId] || moduleConfig.ai
})

const moduleComponent = computed(() => {
  const components = {
    ai: AiModule,
    weight: WeightModule,
    glucose: GlucoseModule,
    report: ReportModule,
  }
  return components[props.moduleId] || AiModule
})
</script>
