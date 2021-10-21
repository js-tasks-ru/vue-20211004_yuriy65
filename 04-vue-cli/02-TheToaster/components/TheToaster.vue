<template>
  <ui-toast-group :toasts="toasts">
    <template #default="{ toast }">
      <button v-if="manualDelete" class="toast__button" @click="deleteToast(toast)">&times;</button>
    </template>
  </ui-toast-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UiToastGroup from './UiToastGroup.vue';
import { ToastTypes } from './UiToast.vue';
import type { Toast } from './UiToast.vue';

const DEFAULT_TIMER = 5000;

export default defineComponent({
  name: 'TheToaster',

  components: { UiToastGroup },

  props: {
    timer: {
      type: Number,
      default: DEFAULT_TIMER,
    },

    manualDelete: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      toasts: new Set() as Set<Toast>,
    };
  },

  methods: {
    success(message: string) {
      this.addToast({
        type: ToastTypes.Success,
        message,
      });
    },

    error(message: string) {
      this.addToast({
        type: ToastTypes.Error,
        message,
      });
    },

    addToast(toast: Toast) {
      this.toasts.add(toast);

      setTimeout(() => {
        this.deleteToast(toast);
      }, this.timer);
    },

    deleteToast(toast: Toast) {
      if (this.toasts.has(toast)) {
        this.toasts.delete(toast);
      }
    },
  },
});
</script>

<style scoped>
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
</style>
