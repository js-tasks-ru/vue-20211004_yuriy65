<template>
  <div class="toast" :class="`toast_${toast.type}`">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <span>{{ toast.message }}</span>
    <slot :toast="toast" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import UiIcon, { icons } from './UiIcon.vue';

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
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: true,
    },
  },

  computed: {
    toastIcon() {
      return toastsIcons[this.toast.type];
    },
  },
});
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
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
