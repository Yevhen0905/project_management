<template>
  <div class="tasks-table-wrapper">
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 400px; width: 100%"
      :columnDefs="columnDefs"
      :rowData="tasks"
      :defaultColDef="defaultColDef"
      :rowDragManaged="true"
      :animateRows="true"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef } from "ag-grid-community";
import type { Task } from "@/types/task";

const props = defineProps<{
  tasks: Task[];
}>();

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  flex: 1,
};

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    width: 100,
    rowDrag: true,
    comparator: (valueA: any, valueB: any) => {
      return Number(valueA) - Number(valueB);
    },
  },
  { headerName: "Title", field: "title" },
  { headerName: "Assignee", field: "assignee" },
  { headerName: "Status", field: "status" },
  { headerName: "Due Date", field: "dueDate" },
];
</script>
