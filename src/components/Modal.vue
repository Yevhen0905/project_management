<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="modal_overlay" @click.self="close">
        <div class="modal_content">
          <button class="close_button" @click="close">&times;</button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
.modal_overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  z-index: 9;
}
.modal_content {
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  min-width: 380px;
  max-width: 500px;
  width: 100%;
  animation: scaleIn 0.2s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.close_button {
  position: absolute;
  top: 12px;
  right: 21px;
  font-size: 27px;
  cursor: pointer;
  border: none;
  background-color: white;
  margin-left: auto;
  display: block;
}
</style>
