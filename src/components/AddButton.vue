<template>
  <button :class="variant" @click="$emit('click')">{{ text }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: String;
  variant?: "primary" | "back";
}>();
</script>

<style scoped lang="scss">
.primary {
  background-color: #00a6ff;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 20px;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 4px 2px;
  margin-left: auto;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #41bdfe;
  }
}

.back {
  background-color: #fff;
  border: 2px solid #00a6ff;
  border-radius: 5px;
  color: #00a6ff;
  padding: 5px 20px;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e1ebf1;
  }
}
</style>
