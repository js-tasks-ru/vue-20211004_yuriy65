import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      clickCount: 0,
    };
  },
});

app.mount('#app');
