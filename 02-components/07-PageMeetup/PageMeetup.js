import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: {},
      isLoading: true,
      error: '',
    };
  },

  watch: {
    meetupId: {
      immediate: true,

      handler() {
        this.getMeetup(this.meetupId).then();
      },
    },
  },

  methods: {
    async getMeetup(meetupId) {
      this.error = '';
      this.isLoading = true;

      try {
        this.meetup = await fetchMeetupById(meetupId);
      } catch (error) {
        this.error = error.message;
      }

      this.isLoading = false;
    },
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if='isLoading'>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if='error'>
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>

      <meetup-view
        v-else
        :meetup='meetup'
      />
    </div>`,
});
