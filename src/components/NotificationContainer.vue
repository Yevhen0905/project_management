<template>
  <div class="notification_container">
    <NotificationModal
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NotificationModal from "./NotificationModal.vue";
import { useNotificationStore } from "../stores/notification";
import type { Notification } from "../stores/notification";

const notificationStore = useNotificationStore();

const notifications = computed<Notification[]>(() => {
  return notificationStore.notifications;
});
</script>

<style lang="scss">
.notification_container {
  position: fixed;
  z-index: 10;
  width: 300px;
  right: 20px;
  bottom: 10px;
}
</style>
