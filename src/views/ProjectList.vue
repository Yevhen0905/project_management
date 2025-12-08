<template>
  <div>
    <h2 class="title">Project List</h2>
    <AddButton text="Add project" variant="primary" @click="openCreateModal" />
    <Modal v-model="isCreateModalOpen">
      <ProjectForm @created="isCreateModalOpen = false" />
    </Modal>
    <ProjectsTable :projects="projects" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProjectStore } from "@/stores/projectsStore";
import { useTasksStore } from "@/stores/tasksStore";

import Modal from "@/components/Modal.vue";
import AddButton from "../components/AddButton.vue";
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectsTable from "../components/ProjectsTable.vue";

const isCreateModalOpen = ref(false);

const projectStore = useProjectStore();
const tasksStore = useTasksStore();

projectStore.fetchProjects();
tasksStore.fetchTasks();

const projects = computed(() => projectStore.projects);
const tasks = computed(() => tasksStore.tasks);

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

onMounted(() => {
  projectStore.fetchProjects();
});
</script>
