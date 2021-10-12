import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      require: true,
      default: 0,
    },
  },

  emits: ['update'],

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increaseCounter() {
      this.$emit('update:count', this.count + 1);
    },
  },

  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="increaseCounter">{{ count }}</button>`,
});
