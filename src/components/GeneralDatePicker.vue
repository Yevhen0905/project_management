<template>
  <div class="date_picker">
    <label class="label" for="deadline">Deadline:</label>
    <input
      id="deadline"
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="['deadline_input', { error: error }]"
    />
    <span v-if="error" class="error_message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped lang="scss">
.date_picker {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.deadline_input {
  width: 100%;
  height: 35px;
  padding: 7px 12px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.2s ease;

  &.error {
    border-color: #e13c3c;
  }

  &:hover {
    border-color: #4a90e2;
    background-color: #f5faff;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 6px rgba(74, 144, 226, 0.35);
  }
}
</style>
