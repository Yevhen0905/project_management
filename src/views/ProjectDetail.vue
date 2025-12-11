<template>
  <div>
    <div class="title_wrapper">
      <h2 class="title">Project {{ currentProject.name }}</h2>
      <ToggleSwitch v-model="tasksViewMode" />
    </div>
    <div class="wrapper_actions">
      <div class="filters">
        <GeneralInput v-model="filterTitle" placeholder="Filter by title" />
        <GeneralSelect v-model="filterStatus" :options="statusOptions" />
      </div>
      <div class="actions">
        <ActionButton
          text="Back to projects"
          variant="back"
          @click="router.back()"
        />
        <ActionButton
          text="Add task"
          variant="primary"
          @click="openTaskModal"
        />
      </div>
    </div>
    <Modal v-model="isTaskModalOpen">
      <TaskForm @submit="handleSubmit" :task="editingTask" />
    </Modal>
    <Modal v-model="isModalDelete"
      ><DeleteForm
        @submit="handleDeleteTask"
        :task="taskToDelete"
        @cancel="isModalDelete = false"
      />
    </Modal>
    <TaskTable
      v-if="tasksViewMode"
      :tasks="filteredTasks"
      @edit="editTask"
      @delete="deleteTask"
    />
    <KanbanBoard v-else :tasks="filteredTasks" />
  </div>
</template>

<script setup lang="ts">
import ActionButton from "../components/ActionButton.vue";
import Modal from "../components/Modal.vue";
import DeleteForm from "@/components/DeleteForm.vue";
import TaskForm from "../components/TaskForm.vue";
import TaskTable from "../components/TaskTable.vue";
import KanbanBoard from "../components/KanbanBoard.vue";
import GeneralInput from "../components/GeneralInput.vue";
import GeneralSelect from "../components/GeneralSelect.vue";
import ToggleSwitch from "../components/ToggleSwitch.vue";

import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef } from "ag-grid-community";

import { useTasksStore } from "@/stores/tasksStore";
import { useProjectStore } from "@/stores/projectsStore";
import type { Task } from "@/types/task";
import { useLocalStorage } from "@/composables/useLocalStorage";

const filterTitle = ref("");
const filterStatus = ref("");
const taskToDelete = ref<Task | null>(null);
const isTaskModalOpen = ref(false);
const isModalDelete = ref(false);
const tasksViewMode = useLocalStorage<boolean>("tasksViewMode", true);
const editingTask = ref<Task | null>(null);
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "To do", label: "To do" },
  { value: "In progress", label: "In progress" },
  { value: "Done", label: "Done" },
];

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();
const projectStore = useProjectStore();

const projectId = route.params.id as string;

const currentProject = computed(
  () =>
    projectStore.projects.find((p) => p.id === projectId) || {
      name: "...",
    }
);

const filteredTasks = computed(() => {
  return tasksStore.tasks
    .filter((task: Task) => task.projectId === projectId)
    .filter((task: Task) =>
      task.assignee.toLowerCase().includes(filterTitle.value.toLowerCase())
    )
    .filter((task: Task) =>
      filterStatus.value ? task.status === filterStatus.value : true
    );
});

const openTaskModal = () => {
  editingTask.value = null;
  isTaskModalOpen.value = true;
};

const editTask = (task: Task) => {
  editingTask.value = task;
  isTaskModalOpen.value = true;
};

const deleteTask = async (task: Task) => {
  taskToDelete.value = task;
  isModalDelete.value = true;
};

const handleDeleteTask = async () => {
  if (taskToDelete.value) {
    await tasksStore.deleteTask(taskToDelete.value.id);
  }
  isModalDelete.value = false;
};

const handleSubmit = async (data: {
  id?: string;
  projectId: string;
  name: string;
  status: string;
  deadline: string;
}) => {
  if (data.id) {
    await tasksStore.updateTask(data.id, data);
  } else {
    const payload = {
      ...data,
      projectId,
    };
    await tasksStore.addTask(payload);
  }

  isTaskModalOpen.value = false;
};

onMounted(() => {
  projectStore.fetchProjects();
  tasksStore.fetchTasks();
});
</script>

<style scoped lang="scss">
.title_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
  }
}
</style>
