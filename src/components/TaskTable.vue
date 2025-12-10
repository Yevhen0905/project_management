<template>
  <div class="ag-theme-quartz">
    <AgGridVue
      class="grid_table"
      :columnDefs="columnDefs"
      :rowData="tasks"
      :defaultColDef="defaultColDef"
      :domLayout="'autoHeight'"
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
    flex: 1,
    rowDrag: true,
    comparator: (valueA: any, valueB: any) => {
      return Number(valueA) - Number(valueB);
    },
  },
  { headerName: "Title", field: "title", flex: 1 },
  { headerName: "Assignee", field: "assignee", flex: 1 },
  { headerName: "Status", field: "status", flex: 1 },
  {
    headerName: "Deadline",
    flex: 1,
    field: "deadline",
    valueFormatter: (params) => formatYMD(params.value),
  },
  {
    headerName: "Actions",
    field: "actions",
    flex: 1,
    cellRenderer: EditDeleteButtons,
    cellRendererParams: (params) => ({
      rowData: params.data,
      onEdit: onEditTask,
      onDelete: onDeleteTask,
    }),
    resizable: false,
  },
];

function onEditTask(task: Task) {
  emit("edit", task);
}

function onDeleteTask(task: Task) {
  emit("delete", task);
}
</script>
