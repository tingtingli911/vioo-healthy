<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom">
    <div class="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="$emit('tab-change', item.id)"
        :class="[
          'flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200',
          activeTab === item.id 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'
        ]"
      >
        <div :class="[
          'relative p-1.5 rounded-xl transition-all duration-200',
          activeTab === item.id && 'bg-primary/10'
        ]">
          <component :is="item.icon" :class="[
            'w-5 h-5 transition-transform duration-200',
            activeTab === item.id && 'scale-110'
          ]" />
          <span v-if="item.id === 'ai' && activeTab === item.id" class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full pulse-ring" />
        </div>
        <span :class="[
          'text-[10px] font-medium transition-all duration-200',
          activeTab === item.id ? 'opacity-100' : 'opacity-70'
        ]">
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { Home, TrendingUp, Droplets, FileText, Sparkles } from 'lucide-vue-next'

defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['tab-change'])

const navItems = [
  { id: "home", label: "首页", icon: Home },
  { id: "weight", label: "体重", icon: TrendingUp },
  { id: "glucose", label: "血糖", icon: Droplets },
  { id: "report", label: "体检", icon: FileText },
  { id: "ai", label: "智能", icon: Sparkles },
]
</script>
