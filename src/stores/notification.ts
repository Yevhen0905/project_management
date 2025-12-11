import { defineStore } from "pinia";

export interface Notification {
  id: number;
  type: string;
  message: string;
}

let nextId = 1;

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as Notification[],
  }),

  actions: {
    add(notification: Omit<Notification, "id">) {
      this.notifications.push({
        ...notification,
        id: nextId++,
      });
    },

    remove(notificationToRemove: Notification) {
      this.notifications = this.notifications.filter(
        (n) => n.id !== notificationToRemove.id
      );
    },
  },
});
