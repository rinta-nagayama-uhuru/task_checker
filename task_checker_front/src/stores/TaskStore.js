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

  async function addTask(newTask) {
    try{
      const formData = new FormData();
      formData.append('name', newTask.name);
      formData.append('explanation', newTask.explanation);
      formData.append('deadlineDate', newTask.deadlineDate);
      formData.append('status', newTask.status);
      formData.append('genreId', newTask.genreId);
      formData.append('image_url', newTask.image_url);

      const response = await api.post('/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const addedTask = response.data;
    }catch(error){
      console.log('タスクデータの保存ができませんでした', error);
    }
  }

  return { tasks, filteredTasks, fetchAllTasks, filterTasks, addTask }
})