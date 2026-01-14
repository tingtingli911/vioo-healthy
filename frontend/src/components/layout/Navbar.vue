<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
    <div class="container max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-effect">
            <Sparkles class="w-5 h-5 text-primary-foreground" />
          </div>
          <span class="text-xl font-bold gradient-text">vioo</span>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="sm" @click="$emit('login')">
            登录
          </Button>
          <Button size="sm" class="rounded-full px-5" @click="$emit('login')">
            免费注册
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

defineEmits(['login'])
</script>
