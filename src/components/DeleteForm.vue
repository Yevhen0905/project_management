<template>
  <div>
    <p>
      Are you sure you want to delete project
      {{ project?.name || task?.title }}
    </p>
    <ActionButton text="Cancel" variant="back" @click="cancel" />
    <ActionButton text="Delete" variant="delete" @click="confirm" />
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
