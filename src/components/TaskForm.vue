<template>
  <form @submit.prevent="addTaskHandler">
    <div class="input-group">
      <input
        type="text"
        v-model="taskName"
        class="form-control"
        placeholder="I need to ...."
      />
      <button class="btn btn-warning">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { v4 as uuidv4 } from 'uuid';

const taskName = ref("");

const taskStore = useTaskStore();

const addTaskHandler = () => {
  if (taskName.value.length) {
    taskStore.addTask({
      id: uuidv4(),
      taskName: taskName.value,
      isFav: false,
    });
    taskName.value = ''
  }
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
