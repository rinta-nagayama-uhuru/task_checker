<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import { useTaskStore } from '../stores/TaskStore';
import Task from './Task.vue'

const route = useRoute()
const taskStore = useTaskStore();

// URLのクエリパラメータから検索キーワードを取得
const searchQuery = computed(() => route.query.q || '')

onMounted(async () => {
  //初期検索の実行
  if (searchQuery.value) {
    await taskStore.taskSearch(searchQuery.value);
  }
})

const preformSearch = async (query) => {
  try {
    await taskStore.taskSearch(query);
  } catch (error) {
    console.log('検索に失敗しました', error)
  }
}

// URLのクエリが変更されたら検索を実行
watch(() => route.query.q, (newQuery) => {
  preformSearch(newQuery)
})
</script>

<template>
  <div class="main">
    <Header />
    <div class="contents">
      <div class="task_field" v-for="task in taskStore.searchResults" :key="task.id">
        <Task :task="task" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>