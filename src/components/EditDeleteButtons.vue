<template>
  <div class="edit-delete-buttons">
    <button @click.stop="handleEdit">Edit</button>
    <button @click.stop="handleDelete">Delete</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  params?: {
    data?: any;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    [k: string]: any;
  };
}>();

function handleEdit() {
  const p = props.params?.data;
  const fn = props.params?.onEdit;
  if (typeof fn === "function") fn(p);
}

function handleDelete() {
  const p = props.params?.data;
  const fn = props.params?.onDelete;
  if (typeof fn === "function") fn(p);
}
</script>

<style scoped>
.edit-delete-buttons {
  display: flex;
  gap: 4px;
}

.edit-delete-buttons button {
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
}
</style>
