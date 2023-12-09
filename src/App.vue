<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="pinia logo" />
      <h1 class="fs-2">Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <div class="task-container">
      <nav class="d-flex justify-content-end">
        <button
          @click="show = 'all'"
          class="btn btn-sm btn-outline-warning"
          :class="[show === 'all' ? 'btn-warning' : '']"
        >
          All
        </button>
        <button
          @click="show = 'fav'"
          class="btn btn-sm ms-2 btn-outline-warning"
          :class="[show === 'fav' ? 'btn-warning' : '']"
        >
          Favorite
        </button>
      </nav>

      <!-- loading -->
      <div class="loading" v-if="isLoading">Loading tasks...</div>

      <div>
        <!-- all task  -->
        <div v-if="show === 'all'">
          <p>You have {{ taskCount }} tasks left to do!</p>
          <template v-for="task in tasks">
            <Task :task="task" />
          </template>
        </div>

        <!-- fav task  -->
        <div v-if="show === 'fav'">
          <p>You have {{ favCount }} favorite tasks left to do!</p>
          <template v-for="task in favTasks">
            <Task :task="task" />
          </template>
        </div>
      </div>
      <button @click="taskStore.$reset" class="btn btn-sm btn-danger mt-2">
        Reset task
      </button>
    </div>
  </main>
</template>

<script setup>
import TaskForm from "./components/TaskForm.vue";
import Task from "./components/Task.vue";
import { useTaskStore } from "./stores/taskStore.js";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const { tasks, isLoading, favTasks, taskCount, favCount } = storeToRefs(taskStore);

onMounted(() => {
  taskStore.getTask();
});

const show = ref("all");
</script>

<style>
body {
  background: #f2f2f2;
  color: #444;
  margin: 0;
}
/* header  */
header {
  text-align: center;
  background: #e7e7e7;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

header img {
  max-width: 60px;
  transform: rotate(-10deg);
}

header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
}
/* new-task-form  */
.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}

.task-container {
  max-width: 600px;
  margin: 20px auto;
}

/* loading  */
.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}
</style>
