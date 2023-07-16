import { defineStore } from 'pinia'
import { sessionStore } from './sessions'
import useFilter from '~/utils/useFilter'

export const deviceStore = defineStore('devices', {
  state: () => ({
    items: {},
    selectedId: null,
    selectedIds: [],
  }),
  getters: {
    getItems: (state) => state.items,
    getSelectedId: (state) => state.selectedId,
    getSelectedIds: (state) => state.selectedIds,
  },
  actions: {
    refresh(payload: Array<any>) {
      this.$patch({ items: {} })
      //@ts-expect-error
      payload.forEach((item: any) => (this.$state.items[item.id] = item))
    },
    update(payload: Array<any>) {
      //@ts-expect-error
      payload.forEach((item: any) => (this.$state.items[item.id] = item))
      const filteredPositions = useFilter(this.items, sessionStore().positions)
      sessionStore().updateFilteredPositions(filteredPositions)
    },
    select(payload: any) {
      this.$state.selectedId = payload
    },
    selectId(payload: any) {
      this.$state.selectedId = payload
      this.$state.selectedIds = this.$state.selectedId
        ? [this.$state.selectedId]
        : []
    },
    selectedIds(payload: any) {
      this.$state.selectedIds = payload
      ;[this.$state.selectedId] = this.$state.selectedIds
    },
    remove(payload: any) {
      //@ts-expect-error
      delete this.$state.items[payload]
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})
