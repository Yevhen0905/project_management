<template>
  <div class="kanban">
    <div v-for="col in columns" :key="col.status" class="kanban-column">
      <h3 class="kanban_column_title">{{ col.label }}</h3>

      <draggable
        v-model="col.tasks"
        group="kanban"
        item-key="id"
        :data-status="col.status"
        @add="onCardAdded"
      >
        <template #item="{ element }">
          <div class="kanban_card">
            <h4 class="kanban_card_title">Title: {{ element.title }}</h4>
            <p><span>Status:</span>{{ element.status }}</p>
            <p><span>Deadline:</span>{{ formatYMD(element.deadline) }}</p>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { reactive, watch } from "vue";
import type { Task } from "@/types/task";
import { useDateFormatter } from "@/composables/useDateFormatter";

const props = defineProps<{
  tasks: Task[];
}>();

const { formatYMD } = useDateFormatter();

const columns = reactive([
  { status: "To do", label: "To do", tasks: [] as Task[] },
  { status: "In progress", label: "In progress", tasks: [] as Task[] },
  { status: "Done", label: "Done", tasks: [] as Task[] },
]);

watch(
  () => props.tasks,
  (tasks) => {
    columns.forEach((col) => (col.tasks = []));

    tasks.forEach((t) => {
      const col = columns.find((c) => c.status === t.status);
      if (col) col.tasks.push({ ...t });
    });
  },
  { immediate: true, deep: true }
);

function onCardAdded(evt: any) {
  const task = evt.item.__draggable_context.element;
  const newStatus = evt.to.dataset.status;

  task.status = newStatus;
}
</script>

<style scoped lang="scss">
.kanban_column_title {
  margin-bottom: 14px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}
.kanban {
  display: flex;
  gap: 20px;
  margin-top: 24px;
}
.kanban-column {
  max-width: 400px;
  width: 100%;
  background: #eee;
  padding: 12px;
  border-radius: 8px;
}
.kanban_card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: 6px;
  border: 2px solid #c0c0c0;
  margin-bottom: 8px;

  &_title {
    font-size: 20px;
    border-bottom: 2px solid #c0c0c0;
    width: 100%;
  }
}
</style>
