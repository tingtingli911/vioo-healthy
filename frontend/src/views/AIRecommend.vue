<template>
  <div class="ai-recommend-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>AI 智能推荐</span>
        </div>
      </template>
      <div class="coming-soon">
        <el-empty description="AI 智能推荐功能开发中，敬请期待..." />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AIRecommend'
}
</script>

<style scoped>
.ai-recommend-container {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.coming-soon {
  padding: 60px 0;
  text-align: center;
}
</style>
