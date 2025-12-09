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
import EditDeleteButtons from "./EditDeleteButtons.vue";

import { AgGridVue } from "ag-grid-vue3";
import type { ColDef } from "ag-grid-community";
import type { Task } from "@/types/task";
import { useDateFormatter } from "@/composables/useDateFormatter";

const props = defineProps<{
  tasks: Task[];
}>();
const emit = defineEmits(["edit", "delete"]);

const { formatYMD } = useDateFormatter();

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
  {
    headerName: "Deadline",
    field: "deadline",
    valueFormatter: (params) => formatYMD(params.value),
  },
  {
    headerName: "Actions",
    field: "actions",
    width: 120,
    cellRenderer: EditDeleteButtons,
    cellRendererParams: (params) => ({
      rowData: params.data,
      onEdit: onEditTask,
      onDelete: onDeleteTask,
    }),
  },
];

function onEditTask(task: Task) {
  emit("edit", task);
}

function onDeleteTask(task: Task) {
  emit("delete", task);
}
</script>
