<template>
  <div>
    <h2>Project Detail: {{ projectId }}</h2>
    <ToggleSwitch v-model="isShowTaskTable" />
    <div class="filters">
      <input
        type="text"
        v-model="filterTitle"
        placeholder="Filter by title"
        class="filter-input"
      />
      <select v-model="filterStatus" class="filter-select">
        <option value="">All statuses</option>
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
    <AddButton text="Add task" variant="primary" @click="openCreateTaskModal" />
    <AddButton text="Back" variant="back" @click="router.back()" />
    <Modal v-model="isCreateTaskModalOpen">
      <TaskForm @created="isCreateTaskModalOpen = false" />
    </Modal>

    <TaskTable v-if="isShowTaskTable" :tasks="filteredTasks" />
    <KanbanBoard v-else :tasks="filteredTasks" />
    <!-- <div class="tasks-table-wrapper">
      <AgGridVue
        class="ag-theme-alpine"
        style="height: 400px; width: 100%"
        :columnDefs="columnDefs"
        :rowData="filteredTasks"
        :defaultColDef="defaultColDef"
        :rowDragManaged="true"
        :animateRows="true"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import AddButton from "../components/AddButton.vue";
import Modal from "../components/Modal.vue";
import TaskForm from "../components/TaskForm.vue";
import TaskTable from "../components/TaskTable.vue";
import KanbanBoard from "../components/KanbanBoard.vue";
import ToggleSwitch from "../components/ToggleSwitch.vue";

import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef } from "ag-grid-community";

import { useTasksStore } from "@/stores/tasksStore";
import type { Task } from "@/types/task";

const filterTitle = ref("");
const filterStatus = ref("");
const isShowTaskTable = ref(true);
const isCreateTaskModalOpen = ref(false);

const route = useRoute();
const router = useRouter();

const projectId = route.params.id as string;

const tasksStore = useTasksStore();
tasksStore.fetchTasks();

const filteredTasks = computed(() => {
  return tasksStore.tasks
    .filter((t: Task) => t.projectId === projectId)
    .filter((t: Task) =>
      t.title.toLowerCase().includes(filterTitle.value.toLowerCase())
    )
    .filter((t: Task) =>
      filterStatus.value ? t.status === filterStatus.value : true
    );
});

const openCreateTaskModal = () => {
  isCreateTaskModalOpen.value = true;
};

// const defaultColDef: ColDef = {
//   sortable: true,
//   resizable: true,
//   flex: 1,
// };

// const columnDefs: ColDef[] = [
//   {
//     headerName: "ID",
//     field: "id",
//     width: 100,
//     rowDrag: true,
//     comparator: (valueA: any, valueB: any) => {
//       return Number(valueA) - Number(valueB);
//     },
//   },
//   { headerName: "Title", field: "title" },
//   { headerName: "Assignee", field: "assignee" },
//   { headerName: "Status", field: "status" },
//   { headerName: "Due Date", field: "dueDate" },
// ];
</script>
