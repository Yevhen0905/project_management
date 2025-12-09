<template>
  <input
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    class="universal_input"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.universal_input {
  width: 100%;
  padding: 7px 12px;
  font-size: 14px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  background-color: #fff;
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
