<template>
  <h3 class="title_form">{{ task ? "Edit task" : "Create task" }}</h3>
  <div class="form">
    <GeneralInput v-model="title" placeholder="Title" :error="errors.title" />
    <GeneralInput
      v-model="assignee"
      placeholder="Assignee"
      label="Assignee"
      :error="errors.assignee"
    />
    <GeneralSelect
      v-model="status"
      :options="statusOptions"
      :error="errors.status"
    />
    <GeneralDatePicker v-model="deadline" :error="errors.deadline" />
  </div>
  <ActionButton
    class="save_button"
    text="Save"
    variant="primary"
    @click="save"
  />
</template>

<script setup lang="ts">
import ActionButton from "./ActionButton.vue";
import GeneralInput from "./GeneralInput.vue";
import GeneralSelect from "./GeneralSelect.vue";
import GeneralDatePicker from "./GeneralDatePicker.vue";

import { ref, watch, reactive } from "vue";

const title = ref("");
const assignee = ref("");
const status = ref("");
const deadline = ref("");
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "To do", label: "To do" },
  { value: "In progress", label: "In progress" },
  { value: "Done", label: "Done" },
];
const errors = reactive<{
  title?: string;
  assignee?: string;
  status?: string;
  deadline?: string;
}>({});

const props = defineProps<{
  task?: Task;
}>();

const emit = defineEmits<{
  (e: "submit", data: Task): void;
}>();

const save = () => {
  errors.title = "";
  errors.assignee = "";
  errors.status = "";
  errors.deadline = "";

  let hasError = false;

  if (!title.value.trim()) {
    errors.title = "Name is required";
    hasError = true;
  }

  if (!assignee.value.trim()) {
    errors.assignee = "Assignee is required";
    hasError = true;
  }

  if (!status.value) {
    errors.status = "Status is required";
    hasError = true;
  }

  if (!deadline.value) {
    errors.deadline = "Deadline is required";
    hasError = true;
  } else {
    const selected = new Date(deadline.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      errors.deadline = "Select a future date";
      hasError = true;
    }
  }

  if (hasError) return;

  emit("submit", {
    id: props.task?.id,
    title: title.value,
    assignee: assignee.value,
    status: status.value,
    deadline: deadline.value,
  });
};

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title;
      assignee.value = newTask.assignee;
      status.value = newTask.status;
      deadline.value = newTask.deadline;
    } else {
      title.value = "";
      assignee.value = "";
      status.value = "";
      deadline.value = "";
    }
  },
  { immediate: true }
);
</script>
