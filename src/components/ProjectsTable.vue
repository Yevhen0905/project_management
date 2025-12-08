<template>
  <div class="projects_table_wrapper">
    <div class="filters">
      <input
        type="text"
        v-model="filterName"
        placeholder="Filter by name"
        class="filter_input"
      />

      <select v-model="filterStatus" class="filter_select">
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="done">Done</option>
        <option value="pending">Pending</option>
      </select>
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
import { ref, computed } from "vue";
import { AgGridVue } from "ag-grid-vue3";

import type { ColDef, RowDragEndEvent } from "ag-grid-community";
import { useRouter } from "vue-router";
import type { Project } from "@/types/project";

interface Props {
  projects: Project[];
}

const props = defineProps<Props>();
const emit = defineEmits(["update-order", "row-click"]);

const router = useRouter();

const filterName = ref("");
const filterStatus = ref("");

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
  { headerName: "Created", field: "createdAt", width: 160 },
]);

function onRowClicked(event: any) {
  emit("row-click", event.data);
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
