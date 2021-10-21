<template>
  <div class="toasts">
    <ui-toast v-for="(toast, index) in toasts" :key="index" :toast="toast">
      <template v-for="(x, slotName) in $slots" #[slotName]="context">
        <slot :name="slotName" v-bind="context" />
      </template>
    </ui-toast>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import UiIcon, { icons } from './UiIcon.vue';
import UiToast from './UiToast.vue';

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
</style>
