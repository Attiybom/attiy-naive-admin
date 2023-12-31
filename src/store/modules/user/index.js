import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { removeToken, toLogin } from '@/utils'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
    profile() {
      return this.userInfo?.profile || {}
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api.getUserInfo()
        const { id, username: name, roles: role, profile } = res.data
        const { avatar } = profile
        this.userInfo = { id, name, avatar, role, profile }
        return Promise.resolve(res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetTags } = useTagsStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetTags()
      resetPermission()
      resetRouter()
      this.$reset()
      toLogin()
    },
    // 切换角色
    async changeRole(role) {
      const { resetTags } = useTagsStore()
      const { resetPermission } = usePermissionStore()
      resetTags()
      resetPermission()
      resetRouter()
      this.$reset()
      this.userInfo.role = role
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
