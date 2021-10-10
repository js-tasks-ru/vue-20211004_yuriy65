import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const operations = [
  {
    value: 'sum',
    symbol: '➕',
    operation: (a, b) => a + b,
  },
  {
    value: 'subtract',
    symbol: '➖',
    operation: (a, b) => a - b,
  },
  {
    value: 'multiply',
    symbol: '✖',
    operation: (a, b) => a * b,
  },
  {
    value: 'divide',
    symbol: '➗',
    operation: (a, b) => (b !== 0 ? a / b : 'Division by zero!'),
  },
];

const rootComponent = defineComponent({
  data() {
    return {
      selectedOperation: operations[0],
      leftOperand: 0,
      rightOperand: 0,
    };
  },

  computed: {
    operations() {
      return operations;
    },

    result() {
      const { selectedOperation, leftOperand, rightOperand } = this;

      return selectedOperation.operation(+leftOperand, +rightOperand);
    },
  },
});

createApp(rootComponent).mount(document.getElementById('app'));
