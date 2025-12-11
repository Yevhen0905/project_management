<template>
  <h3 class="title_form">{{ project ? "Edit project" : "Create project" }}</h3>
  <div class="form">
    <GeneralInput v-model="name" placeholder="Name" :error="errors.name" />
    <GeneralSelect
      v-model="status"
      :options="statusOptions"
      :error="errors.status"
    />
  </div>
  <ActionButton
    text="Save"
    variant="primary"
    @click="save"
    class="save_button"
  />
</template>

<script setup lang="ts">
import ActionButton from "./ActionButton.vue";
import GeneralInput from "./GeneralInput.vue";
import GeneralSelect from "./GeneralSelect.vue";
import type { Project } from "@/types/project";

import { ref, watch, reactive } from "vue";

const name = ref("");
const status = ref("");
const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];
const errors = reactive<{ name?: string; status?: string }>({});

const props = defineProps<{
  project?: Project;
}>();

const emit = defineEmits<{
  (e: "submit", data: { id?: string; name: string; status: string }): void;
}>();

const save = () => {
  errors.name = "";
  errors.status = "";

  let hasError = false;

  if (!name.value.trim()) {
    errors.name = "Name is required";
    hasError = true;
  }

  if (!status.value) {
    errors.status = "Status is required";
    hasError = true;
  }

  if (hasError) return;

  emit("submit", {
    id: props.project?.id,
    name: name.value,
    status: status.value,
  });
};

watch(
  () => props.project,
  (newProject) => {
    if (newProject) {
      name.value = newProject.name;
      status.value = newProject.status;
    } else {
      name.value = "";
      status.value = "";
    }
  },
  { immediate: true }
);
</script>
