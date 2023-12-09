<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <p class="fw-semibold mb-0">{{ task.taskName }}</p>
        <div>
          <i
            @click="taskStore.removeTask(task.id)"
            class="bi bi-trash-fill"
          ></i>
          <i
            @click="taskStore.toggleFav(task.id)"
            class="bi bi-heart-fill ms-2"
            :class="{ 'text-warning': task.isFav }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";

const props = defineProps(["task"]);

const taskStore = useTaskStore();
</script>

<style scoped></style>
