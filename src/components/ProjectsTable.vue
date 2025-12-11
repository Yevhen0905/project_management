<template>
  <div class="projects_table_wrapper">
    <div class="wrapper_actions">
      <div class="filters">
        <GeneralInput v-model="filterName" placeholder="Filter by name" />
        <GeneralSelect v-model="filterStatus" :options="statusOptions" />
      </div>
      <ActionButton
        text="Add project"
        variant="primary"
        @click="emit('add-project')"
      />
    </div>
    <div class="ag-theme-quartz">
      <AgGridVue
        class="grid_table"
        :columnDefs="columnDefs"
        :rowData="filteredProjects"
        :defaultColDef="defaultColDef"
        :rowDragManaged="true"
        :animateRows="true"
        :domLayout="'autoHeight'"
        @rowClicked="onRowClicked"
        @rowDragEnd="onRowDragEnd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GeneralInput from "./GeneralInput.vue";
import GeneralSelect from "./GeneralSelect.vue";
import EditDeleteButtons from "./EditDeleteButtons.vue";
import ActionButton from "@/components/ActionButton.vue";

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { AgGridVue } from "ag-grid-vue3";

import type { ColDef, RowDragEndEvent } from "ag-grid-community";
import { useTasksStore } from "@/stores/tasksStore";
import type { Project } from "@/types/project";
import { useDateFormatter } from "@/composables/useDateFormatter";

const props = defineProps<{
  projects: Project[];
}>();
const emit = defineEmits(["update-order", "add-project", "edit", "delete"]);

const router = useRouter();
const { formatDate } = useDateFormatter();
const tasksStore = useTasksStore();

const filterName = ref("");
const filterStatus = ref("");
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
];

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  flex: 1,
};

const columnDefs = ref<ColDef[]>([
  {
    headerName: "ID",
    field: "id",
    flex: 1,
    rowDrag: true,
    comparator: (valueA: any, valueB: any) => {
      return Number(valueA) - Number(valueB);
    },
  },
  { headerName: "Name", field: "name", flex: 1 },
  { headerName: "Tasks", field: "tasksCount", flex: 1 },
  { headerName: "Status", field: "status", flex: 1 },
  {
    headerName: "Created",
    field: "createdAt",
    flex: 1,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    headerName: "Actions",
    field: "actions",
    flex: 1,
    cellRenderer: EditDeleteButtons,
    cellRendererParams: (params) => ({
      rowData: params.data,
      onEdit: onEditProject,
      onDelete: onDeleteProject,
    }),
    resizable: false,
  },
]);

const projectsWithTaskCount = computed(() => {
  const list = props.projects.map((project) => {
    const count = tasksStore.tasks.filter(
      (t) => t.projectId === project.id
    ).length;
    return {
      ...project,
      tasksCount: count,
    };
  });

  return list.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

const filteredProjects = computed(() => {
  return projectsWithTaskCount.value.filter((project: Project) => {
    const byName = project.name
      .toLowerCase()
      .includes(filterName.value.toLowerCase());
    const byStatus = filterStatus.value
      ? project.status === filterStatus.value
      : true;
    return byName && byStatus;
  });
});

function onEditProject(project: Project) {
  emit("edit", project);
}

function onDeleteProject(project: Project) {
  emit("delete", project);
}

function onRowClicked(event: any) {
  router.push(`/project/${event.data.id}`);
}

onMounted(() => {
  tasksStore.fetchTasks();
});
</script>

<style scoped>
.projects_table_wrapper {
  width: 100%;
}

.filter_input {
  padding: 6px 10px;
  font-size: 14px;
  width: 200px;
}

.filter_select {
  padding: 6px 10px;
  font-size: 14px;
}
</style>
