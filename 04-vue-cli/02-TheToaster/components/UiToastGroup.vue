<template>
  <div class="toasts">
    <ui-toast
      v-for="(toast, index) in toasts"
      :key="index"
      :icon="toastIcon(toast)"
      :text="toastMessage(toast)"
      :class="toastClass(toast)"
    >
      <button v-if="manualDelete" class="toast__button" @click="deleteToast(toast)">&times;</button>
    </ui-toast>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UiIcon, { icons } from './UiIcon.vue';
import UiToast from './UiToast.vue';

export interface Toast {
  type: ToastTypes;
  message: string;
}

export const enum ToastTypes {
  Error = 'error',
  Success = 'success',
}

const toastsIcons: Record<ToastTypes, keyof typeof icons> = {
  [ToastTypes.Error]: 'alert-circle',
  [ToastTypes.Success]: 'check-circle',
};

export default defineComponent({
  name: 'UiToastGroup',

  components: {
    UiIcon,
    UiToast,
  },

  props: {
    toasts: {
      type: Set,
      required: true,
    },

    manualDelete: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['delete'],

  methods: {
    toastIcon(toast: Toast) {
      return toastsIcons[toast.type];
    },

    toastMessage(toast: Toast) {
      return toast.message;
    },

    toastClass(toast: Toast) {
      return `toast_${toast.type}`;
    },

    deleteToast(toast: Toast) {
      this.$emit('delete', toast);
    },
  },
});
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast__button {
  position: absolute;
  top: -10px;
  left: -10px;

  width: 20px;
  height: 20px;

  background: #ffffff;

  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 50%;
}

.toast + .toast {
  margin-top: 20px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
