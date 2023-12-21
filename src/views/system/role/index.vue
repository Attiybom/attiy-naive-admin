<script setup>
import { NDataTable, NButton, NInput, NSelect, NSpace, NSwitch } from 'naive-ui'
import api from './api'

onMounted(async () => {
  // 此处可以调用API获取用户数据
  const roleData = await api.getAllRoles()

  if (!roleData.code) {
    data.value = roleData.data
  }
})

// 示例数据
const data = ref([
  // { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', operations: '操作' },
  // { id: 2, name: '质量保证', code: 'ROLE_QA', operations: '操作' },
  // 其他数据...
])

// 表格列定义
const columns = [
  {
    title: '角色名',
    key: 'name',
  },
  {
    title: '角色标识',
    key: 'code',
  },
  {
    title: '状态',
    key: 'enable',
    render(row) {
      const isDisabled = row.id === 1

      return h(NSwitch, {
        value: isDisabled ? true : row.enable,
        disabled: isDisabled,
        'on-update:value': (value) => {
          row.status = value
          onStatusChange(row)
        },
      })
    },
  },
  {
    title: '操作',
    key: 'operations',
    render(row) {
      const isDisabled = row.id === 1

      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              { type: 'warning', ghost: true, size: 'small' },
              { default: () => '分配用户' }
            ),
            h(
              NButton,
              { type: 'success', ghost: true, size: 'small', disabled: isDisabled },
              { default: () => '启用' }
            ),
            h(
              NButton,
              { type: 'error', ghost: true, size: 'small', disabled: isDisabled },
              { default: () => '禁用' }
            ),
            // h(NButton, { type: 'warning', ghost: true, size: 'small' }, { default: () => '编辑' }),
            // h(NButton, { type: 'error', ghost: true, size: 'small' }, { default: () => '删除' }),
          ],
        }
      )
    },
  },
]

// 搜索文本和角色筛选
const searchText = ref('')
const roleFilter = ref(null)
const roleOptions = [
  { label: '超级管理员', value: 'SUPER_ADMIN' },
  { label: '质量保证', value: 'ROLE_QA' },
  // 其他选项...
]

// 状态改变事件处理
const onStatusChange = (row) => {
  console.log('状态改变:', row)
  // 此处可以调用API更新用户状态
}

// 搜索按钮点击事件
const onSearch = () => {
  console.log('执行搜索...', searchText.value, roleFilter.value)
}

// 重置按钮点击事件
const onClear = () => {
  searchText.value = ''
  roleFilter.value = null
}

const stateValue = ref(null)
const stateOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '0' },
]
</script>

<template>
  <CommonPage title="角色管理">
    <n-space vertical>
      <!-- 搜索和筛选区域 -->
      <n-space>
        <n-input v-model:value="searchText" placeholder="输入用户名" />
        <n-select
          v-model:value="roleFilter"
          style="width: 200px"
          :options="roleOptions"
          placeholder="选择角色"
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
      <n-data-table :columns="columns" :data="data">
        <template #header>
          <n-space>
            <span>用户管理</span>
            <n-button type="success">新增</n-button>
          </n-space>
        </template>
      </n-data-table>
    </n-space>
  </CommonPage>
</template>

<style lang="scss" scoped></style>
