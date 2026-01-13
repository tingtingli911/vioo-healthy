<template>
  <div class="weight-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>体重管理</span>
        </div>
      </template>
      <div class="coming-soon">
        <el-empty description="体重管理功能开发中，敬请期待..." />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Weight'
}
</script>

<style scoped>
.weight-container {
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
