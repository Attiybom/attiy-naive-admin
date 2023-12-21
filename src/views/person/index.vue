<script setup>
import { useUserStore } from '@/store'
import api from './api'
import { isValidEmail } from '@/utils'

const userStore = useUserStore()
console.log('userStore', userStore.profile)
let { profile = [], userId } = userStore

// 修改密码
const passwordRef = ref(null)

const showPasswordModal = ref(false)

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
const passwordRules = {
  oldPassword: [
    {
      required: true,
      trigger: 'input',
      // validator: (rule, value) => {
      //   return new Promise((resolve, reject) => {
      //     if (!passwordRegex.test(value)) {
      //       reject(Error('密码应该为英文与数字组合'))
      //     } else {
      //       resolve()
      //     }
      //   })
      // },
    },
  ],
  newPassword: [
    {
      required: true,
      trigger: 'input',
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!passwordRegex.test(value)) {
            reject(Error('密码应该为英文与数字组合'))
          } else {
            resolve()
          }
        })
      },
    },
  ],
  // confirmPassword: [
  //   { required: true, message: '请再次输入新密码', trigger: 'blur' },
  // ],
}

const passwordFormValue = reactive({
  oldPassword: '',
  newPassword: '',
})

const handleChangePassword = async () => {
  showPasswordModal.value = true
}

const handleCancel = () => {
  showPasswordModal.value = false
  // 置空
  passwordFormValue.oldPassword = ''
  passwordFormValue.newPassword = ''
}

const handleCancelPasswordModal = () => {
  // 置空
  passwordFormValue.oldPassword = ''
  passwordFormValue.newPassword = ''
}

const handleValidateClick = async (e) => {
  e.preventDefault()
  passwordRef.value?.validate((errors) => {
    if (!errors) {
      $message.success('Valid')
      const res = api.changePassword(passwordFormValue)
      if (res.data.code === 0) {
        $message.success('修改成功, 请重新登录')
        showPasswordModal.value = false
        // 置空
        passwordFormValue.oldPassword = ''
        passwordFormValue.newPassword = ''
      } else {
        $message.error(res.message)
      }
    } else {
      $message.error('请检查表单')
      console.log('errors', errors)
    }
  })
}

// 个人信息
const profileRef = ref(null)
const showProfileModal = ref(false)

const profileFormValue = reactive({
  nickName: profile?.nickName,
  gender: profile?.gender,
  address: profile?.address,
  email: profile?.email,
})

const genderOptions = [
  {
    label: '男',
    value: '1',
  },
  {
    label: '女',
    value: '2',
  },
]

const handleOpenProfileModal = () => {
  console.log('handleOpenProfileModal')
  showProfileModal.value = true
}

const handleCancelProfileModal = () => {
  console.log('handleCancelProfileModal')
  showProfileModal.value = false
}

const handleValidateProfileClick = async () => {
  console.log('handleValidateProfileClick')
  console.log('profileFormValue', profileFormValue, userId)
  const res = await api.updateProfile(userId, profileFormValue)
  console.log('res', res)
  if (res.data) {
    await userStore.getUserInfo()
    // 更新 profile
    console.log('userStore.profile', userStore.profile)
    profile = userStore.profile
    showProfileModal.value = false
  }
}

const profileRules = {
  email: [
    {
      required: false,
      trigger: 'input',
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!isValidEmail(value)) {
            reject(Error('邮箱格式无效'))
          } else {
            resolve()
          }
        })
      },
    },
  ],
}
</script>

<template>
  <AppPage>
    <n-card title="当前信息">
      <n-space size="large">
        <n-avatar round :size="60" :src="userStore.avatar" />
        <div class="profile-container">
          <div>
            <span>用户名：{{ userStore.name || '' }}</span>
            <n-button class="ml-12" type="primary" @click="handleChangePassword">修改密码</n-button>
          </div>
          <div>
            <n-button type="primary">修改头像</n-button>
          </div>
        </div>
      </n-space>
    </n-card>

    <!-- 修改密码modal -->
    <n-modal
      v-model:show="showPasswordModal"
      :mask-closable="false"
      :on-after-leave="handleCancelPasswordModal"
      preset="dialog"
      title="修改密码"
    >
      <n-form
        ref="passwordRef"
        label-position="left"
        :model="passwordFormValue"
        :rules="passwordRules"
      >
        <n-form-item label="原密码" path="oldPassword">
          <n-input
            v-model:value="passwordFormValue.oldPassword"
            type="password"
            placeholder="请输入原密码"
          />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input
            v-model:value="passwordFormValue.newPassword"
            type="password"
            placeholder="请输入新密码"
          />
        </n-form-item>
        <n-form-item class="btn-container">
          <n-button class="btn" type="primary" attr-type="submit" @click="handleValidateClick">
            验证
          </n-button>
          <n-button class="btn" attr-type="button" @click="handleCancel">取消</n-button>
        </n-form-item>
      </n-form>
    </n-modal>

    <!-- 个人资料中心 -->
    <n-card title="个人资料中心">
      <template #header-extra>
        <n-button type="primary" @click="handleOpenProfileModal">
          <TheIcon icon="material-symbols:edit-outline" :size="18" class="mr-5" />
          修改个人信息
        </n-button>
      </template>
      <n-table class="table-container" :bordered="false" :single-line="false">
        <tr>
          <th class="table-item">昵称</th>
          <td class="table-item">{{ profile.nickName || '未填写' }}</td>
        </tr>
        <tr>
          <th class="table-item">性别</th>
          <td class="table-item">{{ profile?.gender === 1 ? '男' : '女' }}</td>
        </tr>
        <tr>
          <th class="table-item">地址</th>
          <td class="table-item">{{ profile.address || '未填写' }}</td>
        </tr>
        <tr>
          <th class="table-item">邮箱</th>
          <td class="table-item">{{ profile.email || '未填写' }}</td>
        </tr>
      </n-table>
    </n-card>

    <!-- 个人信息模态框 -->
    <n-modal
      v-model:show="showProfileModal"
      :mask-closable="false"
      :on-after-leave="handleCancelProfileModal"
      preset="dialog"
      title="个人信息"
    >
      <n-form
        ref="profileRef"
        label-position="left"
        :model="profileFormValue"
        :rules="profileRules"
      >
        <n-form-item label="昵称" path="name">
          <n-input v-model:value="profileFormValue.nickName" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="性别">
          <n-select v-model:value="profileFormValue.gender" :options="genderOptions" />
        </n-form-item>
        <n-form-item label="地址">
          <n-input v-model:value="profileFormValue.address" placeholder="请输入地址" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="profileFormValue.email" placeholder="请输入邮箱" />
        </n-form-item>

        <n-form-item class="btn-container">
          <n-button
            class="btn"
            type="primary"
            attr-type="submit"
            @click="handleValidateProfileClick"
          >
            确定
          </n-button>
          <n-button class="btn" attr-type="button" @click="handleCancelProfileModal">取消</n-button>
        </n-form-item>
      </n-form>
    </n-modal>
  </AppPage>
</template>

<style scoped lang="scss">
.profile-container {
  margin-left: 12px;
}

.btn-container {
  display: flex;

  .btn {
    flex: 1;
  }
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
