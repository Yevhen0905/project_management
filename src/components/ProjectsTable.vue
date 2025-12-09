<template>
  <div class="projects_table_wrapper">
    <div class="filters">
      <GeneralInput v-model="filterName" placeholder="Filter by name" />
      <GeneralSelect v-model="filterStatus" :options="statusOptions" />
    </div>
    <div class="ag-theme-quartz" style="height: 500px">
      <AgGridVue
        class="grid_table"
        :columnDefs="columnDefs"
        :rowData="filteredProjects"
        :defaultColDef="defaultColDef"
        :rowDragManaged="true"
        :animateRows="true"
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

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { AgGridVue } from "ag-grid-vue3";

import type { ColDef, RowDragEndEvent } from "ag-grid-community";
import type { Project } from "@/types/project";
import { useDateFormatter } from "@/composables/useDateFormatter";

interface Props {
  projects: Project[];
}

const props = defineProps<Props>();
const emit = defineEmits(["update-order", "edit", "delete"]);

const router = useRouter();
const { formatDate } = useDateFormatter();

const filterName = ref("");
const filterStatus = ref("");
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
];

const filteredProjects = computed(() => {
  return props.projects.filter((project) => {
    const byName = project.name
      .toLowerCase()
      .includes(filterName.value.toLowerCase());
    const byStatus = filterStatus.value
      ? project.status === filterStatus.value
      : true;
    return byName && byStatus;
  });
});

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  flex: 1,
};

const columnDefs = ref<ColDef[]>([
  {
    headerName: "ID",
    field: "id",
    width: 100,
    rowDrag: true,
    comparator: (valueA: any, valueB: any) => {
      return Number(valueA) - Number(valueB);
    },
  },
  { headerName: "Name", field: "name" },
  { headerName: "Tasks", field: "tasksCount", width: 130 },
  { headerName: "Status", field: "status", width: 140 },
  {
    headerName: "Created",
    field: "createdAt",
    width: 160,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    headerName: "Actions",
    field: "actions",
    width: 120,
    cellRenderer: EditDeleteButtons,
    cellRendererParams: (params) => ({
      rowData: params.data,
      onEdit: onEditProject,
      onDelete: onDeleteProject,
    }),
  },
]);

function onEditProject(project: Project) {
  emit("edit", project);
}

function onDeleteProject(project: Project) {
  emit("delete", project);
}

function onRowClicked(event: any) {
  router.push(`/project/${event.data.id}`);
}

function onRowDragEnd(event: RowDragEndEvent) {
  const newOrder: Project[] = [];
  event.api.forEachNode((node) => newOrder.push(node.data));
  emit("update-order", newOrder);
}
</script>

<style scoped>
.projects_table_wrapper {
  width: 100%;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
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
