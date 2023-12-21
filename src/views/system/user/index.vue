<script setup>
import api from './api'

onMounted(async () => {
  // 此处可以调用API获取用户数据
  const usersData = await api.getAllUsers()
  console.log('usersData', usersData)
  // if (!roleData.code) {
  //   data.value = roleData.data
  // }
})
/**
 * 表格列定义
 */
// const columns = [
//   {
//     title: '角色名',
//     key: 'name',
//   },
//   {
//     title: '角色标识',
//     key: 'code',
//   },
//   {
//     title: '状态',
//     key: 'enable',
//     render(row) {
//       const isDisabled = row.id === 1

//       return h(NSwitch, {
//         value: isDisabled ? true : row.enable,
//         disabled: isDisabled,
//         'on-update:value': (value) => {
//           row.status = value
//           onStatusChange(row)
//         },
//       })
//     },
//   },
//   {
//     title: '操作',
//     key: 'operations',
//     render(row) {
//       const isDisabled = row.id === 1

//       return h(
//         NSpace,
//         {},
//         {
//           default: () => [
//             h(
//               NButton,
//               { type: 'warning', ghost: true, size: 'small' },
//               { default: () => '分配用户' }
//             ),
//             h(
//               NButton,
//               { type: 'success', ghost: true, size: 'small', disabled: isDisabled },
//               { default: () => '启用' }
//             ),
//             h(
//               NButton,
//               { type: 'error', ghost: true, size: 'small', disabled: isDisabled },
//               { default: () => '禁用' }
//             ),
//             // h(NButton, { type: 'warning', ghost: true, size: 'small' }, { default: () => '编辑' }),
//             // h(NButton, { type: 'error', ghost: true, size: 'small' }, { default: () => '删除' }),
//           ],
//         }
//       )
//     },
//   },
// ]

// 用户名
const searchText = ref('')

// 性别
const genderValue = ref(null)
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
// 状态
const stateValue = ref(null)
const stateOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '0' },
]

const onSearch = () => {
  console.log('onSearch')
}

const onClear = () => {
  console.log('onClear')
}
</script>

<template>
  <CommonPage title="用户管理">
    <n-space vertical>
      <!-- 搜索和筛选区域 -->
      <n-space>
        <n-input v-model:value="searchText" placeholder="输入用户名" />
        <n-select
          v-model:value="genderValue"
          style="width: 200px"
          :options="genderOptions"
          placeholder="选择性别"
          clearable
        />
        <n-select
          v-model:value="stateValue"
          style="width: 200px"
          :options="stateOptions"
          placeholder="选择状态"
          clearable
        ></n-select>
        <n-button @click="onSearch">搜索</n-button>
        <n-button type="info" @click="onClear">重置</n-button>
      </n-space>
      <!-- 表格区域 -->
      <!-- <n-data-table :columns="columns" :data="data">
        <template #header>
          <n-space>
            <span>用户管理</span>
            <n-button type="success">新增</n-button>
          </n-space>
        </template>
      </n-data-table> -->
    </n-space>
  </CommonPage>
</template>

<style lang="scss" scoped></style>
