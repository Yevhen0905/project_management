<template>
  <div class="toggle_switch">
    <span>table view </span>
    <label class="switch">
      <input type="checkbox" :checked="isChecked" @change="onChange" />
      <span class="slider"></span>
    </label>
    <span>kanban view</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const isChecked = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    isChecked.value = val;
  }
);

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  isChecked.value = target.checked;
  emit("update:modelValue", target.checked);
};
</script>

<style scoped>
.toggle_switch {
  display: flex;
  align-items: center;
  gap: 9px;

  @media (max-width: 950px) {
    margin-bottom: 12px;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cfcfcf;
  border-radius: 28px;
  transition: background-color 0.25s;
}

.slider::before {
  content: "";
  position: absolute;
  height: 24px;
  width: 24px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.25s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
  background-color: #00a6ff;
}

input:not(:checked) + .slider {
  background-color: #cfcfcf;
}
input:checked + .slider::before {
  transform: translateX(0);
}

input:not(:checked) + .slider::before {
  transform: translateX(24px);
}
</style>
