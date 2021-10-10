import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const component = defineComponent({
  data() {
    return {
      selectedNum: 1,
      title: '',
    };
  },

  watch: {
    selectedNum: {
      immediate: true,
      handler() {
        fetchMeetupById(this.selectedNum).then((meetup) => {
          this.title = meetup.title;
        });
      },
    },
  },
});

createApp(component).mount('#app');
