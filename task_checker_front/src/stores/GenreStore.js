import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([]);

  async function fetchAllGenres () {
    try{
      const response = await api.get('/genres')
      genres.value = response.data;
    }catch(error){
      console.log('タスクデータが取得できませんでした', error);
    }
  }
  return { genres, fetchAllGenres}
})