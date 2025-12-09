<template>
  <h3 class="title_form">{{ task ? "Edit task" : "Create task" }}</h3>
  <div class="form">
    <GeneralInput v-model="title" placeholder="Title" />
    <GeneralSelect v-model="status" :options="statusOptions" />
    <div class="date-picker">
      <label for="deadline">Deadline:</label>
      <input
        id="deadline"
        type="date"
        v-model="deadline"
        class="deadline-input"
      />
    </div>
  </div>
  <ActionButton text="Save" variant="primary" @click="save" />
</template>

<script setup lang="ts">
import ActionButton from "./ActionButton.vue";
import GeneralInput from "./GeneralInput.vue";
import GeneralSelect from "./GeneralSelect.vue";

import { ref, watch } from "vue";

const title = ref("");
const status = ref("");
const deadline = ref("");
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "To do", label: "To do" },
  { value: "In progress", label: "In progress" },
  { value: "Done", label: "Done" },
];

const props = defineProps<{
  task?: Task;
}>();

const emit = defineEmits<{
  (e: "submit", data: Task): void;
}>();

const save = () => {
  if (!title.value || !status.value || !deadline.value) return;

  emit("submit", {
    id: props.task?.id,
    title: title.value,
    status: status.value,
    deadline: deadline.value,
  });
};

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title;
      status.value = newTask.status;
      deadline.value = newTask.deadline;
    } else {
      title.value = "";
      status.value = "";
      deadline.value = "";
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.date-picker {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.deadline-input {
  padding: 4px 8px;
  font-size: 14px;
  margin-top: 4px;
}
</style>
