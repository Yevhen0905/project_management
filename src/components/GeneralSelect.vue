<template>
  <div class="select_wrapper">
    <label class="label">{{ label }}</label>
    <select class="select" :value="modelValue" @change="onChange">
      <option
        v-for="opt in options"
        :key="opt[valueKey]"
        :value="opt[valueKey]"
      >
        {{ opt[labelKey] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  label: {
    type: String,
    default: "Status:",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
}
</script>

<style scoped lang="scss">
.select_wrapper {
  width: 100%;
}
.select {
  width: 100%;
  height: 35px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

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
