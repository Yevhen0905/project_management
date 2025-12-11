<template>
  <div class="notification_modal" :class="notificationClass">
    {{ notification.message }}

    <button class="notification_btn" @click="remove(notification)">
      &#x2715;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNotificationStore } from "../stores/notification";
import type { Notification } from "../stores/notification";

const props = defineProps<{
  notification: Notification;
}>();

const notificationStore = useNotificationStore();

const timeOut = ref<number | null>(null);

const remove = (notificationToRemove: Notification) => {
  notificationStore.remove(notificationToRemove);
};

const notificationClass = computed(() => {
  return `is_${props.notification.type}`;
});

onMounted(() => {
  timeOut.value = window.setTimeout(() => {
    remove(props.notification);
  }, 5000);
});

onUnmounted(() => {
  if (timeOut.value) {
    clearTimeout(timeOut.value);
  }
});
</script>

<style lang="scss">
.notification_modal {
  position: relative;
  width: 300px;
  margin: 10px 0;
  padding: 16px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;

  &.is_success {
    color: rgba(70, 210, 119, 0.92);
    background: rgb(86 224 109 / 31%);
  }

  &.is_danger {
    color: #ff0000d5;
    background: rgb(224 105 86 / 31%);
  }
}

.notification_btn {
  position: absolute;
  top: 5px;
  right: 9px;
  outline: none;
  border: none;
  background: transparent;
  color: rgba(128, 128, 128, 0.614);
}
</style>
