<template>
  <div>
    <ThankyouModal v-if="showThankyouModal" :title="Thanks"></ThankyouModal>
    <InfoModal v-if="showInfoModal" :title="infoModalTitle"></InfoModal>
    <div>
      <NavBar/>
      <section class="main-section">
        <SideBar v-if="!($store.state.activePage == 'Booking')" class="sidebar-anim"/>
        <component :is="currentComponent" class="section-anim"></component>
        <InfoBar  v-if="!($store.state.activePage == 'Booking')" class="infobar-anim"/>
      </section>
    </div>
  </div>
</template>

<script>
import { db, auth} from '~/plugins/firebase';
import NavBar from '@/components/navbar.vue';
import SideBar from '@/components/sidebar.vue';
import InfoBar from '@/components/infobar.vue';
import StepTitle from '@/components/steps/step-title.vue';
import StepTagline from '@/components/steps/step-tagline.vue';
import StepPhotos from '@/components/steps/step-photos.vue';
import StepAbout from '@/components/steps/step-about.vue';
import StepWhatWeDo from '@/components/steps/step-whatwedo.vue';
import StepWhatIProvide from '@/components/steps/step-whatiprovide.vue';
import StepWhereWeBe from '@/components/steps/step-wherewebe.vue';
import StepNotes from '@/components/steps/step-notes.vue';
import StepWhereWeMeet from '@/components/steps/step-wherewemeet.vue';
import StepCategory from '@/components/steps/step-category.vue';
import StepGuestRequirements from '@/components/steps/step-guestrequirements.vue';
import StepPrice from '@/components/steps/step-price.vue';
import StepCancellationPolicy from '@/components/steps/step-cancellationpolicy.vue';
import StepAvailability from '@/components/steps/step-availability.vue';
import StepBookingOptions from '@/components/steps/step-bookingoptions.vue';
import StepReviewSubmit from '@/components/steps/step-reviewsubmit.vue';
import InfoModal from '@/components/info-modal.vue';
import ThankyouModal from '@/components/thankyou-modal.vue';

import Booking from '@/pages/bookings/_experienceId.vue'

export default {
  data() {
    return {
      showInfoModal: false,
      showThankyouModal: false,
      infoModalTitle: '',
      showCreateModal: true
    }
  },
  computed: {
    currentComponent() {
      if (this.$store.state.activePage) {
        return this.$store.state.activePage;
      } else {
        return 'StepTitle';
      }
    }
  },
  async fetch({ store, query }) {
    store.commit('setEmail', query.email);
    store.commit('setActivePage', query.step);
    store.commit('setName', query.name);
  },
  async created() {
    this.reloadData();
  },
  methods: {
    switchComponent() {
      this.$router.push({query: {step: this.$store.state.activePage}});
    },
    toggleInfoModal(title) {
      if (this.showInfoModal) {
        this.infoModalTitle = '';
        this.showInfoModal = false;
      } else {
        this.infoModalTitle = title;
        this.showInfoModal = true;
      }
    },
    toggleThankyouModal() {
      if (this.showThankyouModal) {
        this.showThankyouModal = false
      } else {
        this.showThankyouModal = true
      }
    },
    async reloadData() {
      if (!this.$store.state.user) {
          await this.$store.dispatch('loadCurrentUser');
          const submissionData = await this.$store.dispatch('createOrLoadSubmissionDoc', { email: this.$store.state.email, name: this.$store.state.firstName });
          await this.$store.dispatch('loadBookings');
          await this.$store.dispatch('loadAvailabilities');
      } else {
          const submissionData = await this.$store.dispatch('createOrLoadSubmissionDoc', { email: this.$store.state.email, name: this.$store.state.firstName });
          await this.$store.dispatch('loadBookings');
          await this.$store.dispatch('loadAvailabilities');
      }
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
         this.reloadData();
      }
    });
  },
  watch: {
    '$route.query'() {
      this.$store.commit('setActivePage', this.$route.query.step)
    }
  },
  components: {
    NavBar,
    SideBar, 
    InfoBar,
    StepTitle,
    StepTagline,
    StepPhotos,
    StepAbout,
    StepWhatWeDo,
    StepWhatIProvide,
    StepWhereWeBe,
    StepNotes,
    StepWhereWeMeet,
    StepCategory,
    StepGuestRequirements,
    StepPrice,
    StepCancellationPolicy,
    StepBookingOptions,
    StepAvailability,
    StepReviewSubmit,
    InfoModal,
    ThankyouModal,
    Booking
  }
}
</script>
<style scoped>
.is-active {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 1560px;
  min-height: 950px;
  background-color: rgba(0,0,0,0.7);
  z-index: 99999;
  display: grid;
  align-items: center;
  justify-items: center;
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.modal-card {
  background-color: #fff;
  width: 50%;
  height: 40%;
  padding: 50px;
  border-radius: 5px;
  animation: 0.3s ease-out 0s 1 slideIn;
}
</style>
