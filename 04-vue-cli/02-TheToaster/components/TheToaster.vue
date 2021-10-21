<template>
  <ui-toast-group :toasts="toasts" :manual-delete="manualDelete" @delete="deleteToast" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UiToastGroup from './UiToastGroup.vue';
import { ToastTypes } from './UiToastGroup.vue';
import type { Toast } from './UiToastGroup.vue';

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

<style scoped></style>
