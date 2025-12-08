<template>
  <h3>New Project</h3>

  <input v-model="name" placeholder="project name" />

  <button @click="save">save</button>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// const emit = defineEmits(["created"]);

// const name = ref("");
// const description = ref("");

// const save = async () => {
//   // await projectStore.createProject({
//   //   name: name.value,
//   //   description: description.value,
//   // });
//   emit("created");
// };
</script>
