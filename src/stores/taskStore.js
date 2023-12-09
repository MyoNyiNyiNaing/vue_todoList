import axios from "axios";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favTasks: (state) => {
      return state.tasks.filter((item) => item.isFav);
    },
    taskCount() {
      return this.tasks.length;
    },
    favCount() {
      return this.tasks.reduce((p, c) => (c.isFav ? p + 1 : p), 0);
    },
  },
  actions: {
    async getTask() {
      this.isLoading = true;

      const res = await axios.get("http://localhost:3000/tasks");
      this.tasks = res.data;

      this.isLoading = false;
    },

    async addTask(task) {
      const res = await axios.post("http://localhost:3000/tasks", task);
      if (res.status === 201) {
        this.tasks.push(task);
      }
    },

    async removeTask(id) {
      const res = await axios.delete("http://localhost:3000/tasks/" + id);
      if (res.status === 200) {
        this.tasks = this.tasks.filter((item) => item.id !== id);
      }
    },

    async toggleFav(id) {
      const task = this.tasks.find((item) => item.id === id);

      const res = await axios.patch("http://localhost:3000/tasks/" + id, {
        isFav: !task.isFav,
      });
      if (res.status === 200) {
        task.isFav = !task.isFav;
      }
    },
  },
});
