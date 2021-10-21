<template>
  <div class="toast">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ text }}</span>
    <slot />
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    icon: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
}
</style>
