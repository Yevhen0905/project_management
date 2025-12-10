<template>
  <div class="edit_delete_buttons">
    <div class="edit" @click.stop="handleEdit">
      <span class="material-icons">edit</span>
    </div>
    <div class="delete" @click.stop="handleDelete">
      <span class="material-icons">delete</span>
    </div>
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

<style lang="scss">
.edit_delete_buttons {
  display: flex;
  gap: 15px;
  margin-top: 8px;
}

.edit {
  cursor: pointer;

  .material-icons {
    color: #5d6661;
  }
}

.delete {
  cursor: pointer;

  .material-icons {
    color: #e13c3c;
  }
}
</style>
