import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from '../03-MeetupCover/MeetupCover.js';
import MeetupDescription from '../02-MeetupDescription/MeetupDescription.js';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda.js';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isHaveAgenda() {
      return !!(this.meetup.agenda && this.meetup.agenda.length);
    },
  },

  template: `
    <div>
      <meetup-cover
        :title='meetup.title'
        :image='meetup.image'
      />

      <ui-container>
        <div class='meetup'>
          <div class='meetup__content'>
            <h3>Описание</h3>
            <meetup-description
              :description='meetup.description'
            />

            <h3>Программа</h3>
            <ui-container>
              <meetup-agenda
                v-if='isHaveAgenda'
                :agenda='meetup.agenda'
              />
              <ui-alert v-else>Программа пока пуста...</ui-alert>
            </ui-container>
          </div>
          <div class='meetup__aside'>
            <meetup-info
              :date='meetup.date'
              :place='meetup.place'
              :organizer='meetup.organizer'
            />
          </div>
        </div>
      </ui-container>
    </div>`,
});
