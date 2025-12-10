<template>
  <div class="wrapper_form">
    <h4 class="title_form">
      Are you sure you want to delete {{ project?.name ? "project" : "task" }}
      {{ project?.name || task?.title }}?
    </h4>
    <div class="actions">
      <ActionButton text="Cancel" variant="back" @click="cancel" />
      <ActionButton text="Delete" variant="delete" @click="confirm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "./ActionButton.vue";

import type { Project } from "@/types/project";
import type { Task } from "@/types/task";

const props = defineProps<{
  project?: Project;
  task?: Project;
}>();

const emit = defineEmits(["submit", "cancel"]);

const cancel = () => {
  emit("cancel");
};

const confirm = () => {
  emit("submit");
};
</script>
