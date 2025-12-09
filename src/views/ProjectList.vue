<template>
  <div>
    <h2 class="title">Project List</h2>
    <ActionButton
      text="Add project"
      variant="primary"
      @click="openProjectModal"
    />
    <Modal v-model="isProjectModalOpen">
      <ProjectForm
        @submit="handleSubmit"
        :project="editingProject"
        v-if="projectToDelete"
      />
    </Modal>
    <Modal v-model="isModalDelete"
      ><DeleteForm
        @submit="handleDeleteProject"
        :project="projectToDelete"
        @cancel="isModalDelete = false"
      />
    </Modal>
    <ProjectsTable
      :projects="projects"
      @edit="editProject"
      @delete="deleteProject"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import ActionButton from "@/components/ActionButton.vue";
import ProjectForm from "@/components/ProjectForm.vue";
import DeleteForm from "@/components/DeleteForm.vue";
import ProjectsTable from "@/components/ProjectsTable.vue";

import { ref, computed, onMounted } from "vue";
import { useProjectStore } from "@/stores/projectsStore";
import { useTasksStore } from "@/stores/tasksStore";
import type { Project } from "@/types/project";

const isProjectModalOpen = ref(false);
const isModalDelete = ref(false);
const projectToDelete = ref<Project | null>(null);
const editingProject = ref<Project | null>(null);

const projectStore = useProjectStore();

const projects = computed(() => projectStore.projects);

const openProjectModal = () => {
  isProjectModalOpen.value = true;
  editingProject.value = null;
};

const editProject = (project: Project) => {
  editingProject.value = project;
  isProjectModalOpen.value = true;
};

const deleteProject = async (project: Project) => {
  isModalDelete.value = true;
  projectToDelete.value = project;
};

const handleDeleteProject = async () => {
  if (projectToDelete.value) {
    await projectStore.deleteProject(projectToDelete.value.id);
  }
  isModalDelete.value = false;
};

const handleSubmit = async (data: {
  id?: string;
  name: string;
  status: string;
}) => {
  if (data.id) {
    await projectStore.updateProject(data.id, data);
  } else {
    await projectStore.addProject(data);
  }

  isProjectModalOpen.value = false;
};

onMounted(() => {
  projectStore.fetchProjects();
});
</script>
