<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex cursor-pointer items-center>
      <img :src="userStore.avatar" mr10 h-35 w-35 rounded-full />
      <div class="name-container">
        <div class="username">{{ userStore.name }}</div>
        <div class="role-name">{{ `[${userStore?.role[0]?.name}]` }}</div>
      </div>
    </div>
  </n-dropdown>

  <div>
    <n-modal v-model:show="showModal" class="role-modal" preset="dialog" title="Dialog">
      <template #header>
        <div>请选择角色</div>
      </template>
      <div class="role-container">
        <n-space vertical style="width: 100%">
          <n-button
            v-for="(role, index) in roles"
            :key="role.id"
            class="role-btn"
            :type="index === 0 ? 'primary' : ''"
          >
            <span class="name">{{ role.name }}</span>
          </n-button>
        </n-space>
      </div>
      <template #action>
        <div class="action-container">
          <n-button class="action-btn" type="primary" @click="handleClickFalse">确认</n-button>
          <n-button class="action-btn" @click="handleClickFalse">取消</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'

const userStore = useUserStore()

const router = useRouter()

// role
const roles = userStore.role

const options = [
  {
    label: '个人中心',
    key: 'personalCenter',
    icon: renderIcon('mdi:user', { size: '14px' }),
  },
  // {
  //   label: '切换角色',
  //   key: 'changeRole',
  //   icon: renderIcon('mdi:users', { size: '14px' }),
  // },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
  // 切换角色
  if (key === 'changeRole') {
    showModal.value = true
    // $dialog.confirm({
    //   title: '提示',
    //   type: 'info',
    //   content: '确认切换角色？',
    //   confirm() {
    //     userStore.changeRole()
    //     $message.success('已切换角色')
    //   },
    // })
  }
  // 个人中心
  if (key === 'personalCenter') {
    // 打开个人中心
    // if (isExternal(item.path)) {
    //   window.open(item.path)
    // } else {
    //   router.push(item.path)
    // }
    // const personPath = `/src/views/person/index.vue`
    // window.open(personPath)
    router.push('/person')
  }
}

const showModal = ref(false)

function handleClickFalse() {
  showModal.value = false
}
</script>

<style scoped>
.name-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .username {
    width: 68px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    text-align: center;
  }

  .role-name {
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
}

.role-modal {
  width: 360px;
}

.role-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  .role-btn {
    flex: 1;
    width: 100%;
    height: 40px;
  }
}

.action-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .action-btn {
    flex: 1;
    width: 100%;
    height: 40px;
  }
}
</style>
