import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const filteredTasks = ref([]);

  async function fetchAllTasks () {
    try{
      const response = await api.get('/tasks')
      tasks.value = response.data;
      filteredTasks.value = tasks.value;
    }catch(error){
      console.log('タスクデータの取得ができませんでした', error);
    }
  }

  async function filterTasks(genreId){
    const numericGenreId = Number(genreId);

    if(numericGenreId === 0){
      filteredTasks.value = [...tasks.value];
    } else{
      filteredTasks.value = tasks.value.filter(task => numericGenreId === task.genreId)
    }
  }

  return { tasks, filteredTasks, fetchAllTasks, filterTasks }
})