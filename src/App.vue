<template>
  <div class="container">
    <RouterView />
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import NotificationContainer from "./components/NotificationContainer.vue";

import { RouterView } from "vue-router";
</script>

<style scoped></style>
