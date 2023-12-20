<script setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>

<template>
  <AppPage>
    <n-card title="当前信息">
      <n-space size="large">
        <n-avatar round :size="60" :src="userStore.avatar" />
        <div class="profile-container">
          <div>
            <span>用户名：{{ userStore.name || '' }}</span>
            <n-button style="margin-left: 12px">修改密码</n-button>
          </div>
          <div>
            <n-button>修改密码</n-button>
          </div>
        </div>
      </n-space>
    </n-card>

    <!-- 个人资料中心 -->
    <n-card title="个人资料中心">
      <n-table class="table-container" :bordered="false" :single-line="false">
        <tr>
          <th class="table-item">昵称</th>
          <td class="table-item">{{ userStore.name }}</td>
        </tr>
        <tr>
          <th class="table-item">性别</th>
          <td class="table-item">{{ userStore.gender || '未填写' }}</td>
        </tr>
        <tr>
          <th class="table-item">地址</th>
          <td class="table-item">{{ userStore.address || '未填写' }}</td>
        </tr>
        <tr>
          <th class="table-item">邮箱</th>
          <td class="table-item">{{ userStore.email || '未填写' }}</td>
        </tr>
      </n-table>
    </n-card>
  </AppPage>
</template>

<style scoped>
.profile-container {
  margin-left: 12px;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
}
.table-item {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
