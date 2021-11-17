<template>
  <ui-input ref="input" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

const leadingZero = (value) => {
  return `${value}`.padStart(2, '0');
};

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },

    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        const date = this.modelValue ? new Date(this.modelValue) : null;
        return this.convertDateToString(date);
      },
      set(value) {
        const time = this.convertStringToDate(value)?.getTime() ?? null;
        this.$emit('update:modelValue', time);
      },
    },
  },

  methods: {
    convertDateToString(date) {
      if (!date) return null;

      let from = 0;
      let to = 10;

      if (this.type === 'time') {
        from = 11;
        to = 16;

        if (this.$attrs['step'] < 60) {
          to = 19;
        }
      } else if (this.type === 'datetime-local') {
        to = 16;
      }

      return date.toISOString().slice(from, to);
    },

    convertStringToDate(value) {
      if (!value) return null;

      const date = new Date(this.type === 'time' ? 0 : value);

      if (!date) return null;

      if (this.type === 'time') {
        const [hours, minutes, seconds] = value.split(':');

        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);

        if (this.$attrs['step'] < 60) {
          date.setUTCSeconds(seconds);
        }
      } else if (this.type === 'datetime-local') {
        const offset = date.getTimezoneOffset() / 60;
        date.setUTCHours(date.getUTCHours() - offset);
      }

      return date;
    },
  },
};
</script>
