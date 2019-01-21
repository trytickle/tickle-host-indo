<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Opsi pemesanan</h3>
    <p class="paragraph-4">Beberapa pengaturan akhir. Tetapkan berapa lama Anda merencanakan pengalaman Anda untuk bertahan, jumlah tamu yang dapat Anda tampung pada satu waktu, dan berapa lama sebelum pengalaman dimulai, seorang tamu harus memesan.</p>
    <div class="content-wrapper" style="margin-top:30px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Lamanya</div>
        <p class="paragraph-3">
          <select name="duration" class="menu-dropdown" v-model="$store.state.maxDuration">
            <option :value="1">1 hour</option>
            <option :value="2">2 hours</option>
            <option :value="3">3 hours</option>
            <option :value="4">4 hours</option>
            <option :value="5">5 hours</option>
            <option :value="6">> 5 hours</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Jumlah tamu</div>
        <p class="paragraph-3">
          <select name="guestCount" class="menu-dropdown" v-model="$store.state.maxGuestCount">
            <option v-for="(count, index) in guests" :key="index" :value="count">{{count}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Waktu Pemesanan terbaru</div>
        <p class="paragraph-3">
          <select name="bookBefore" class="menu-dropdown" v-model="$store.state.bookingOptions.bookBefore">
            <option :value="1">1 hour before</option>
            <option :value="2">2 hours before</option>
            <option :value="3">3 hours before</option>
            <option :value="4">4 hours before</option>
            <option :value="5">5 hours before</option>
            <option :value="6">6 hours before</option>
            <option :value="7">7 hours before</option>
            <option :value="8">8 hours before</option>
            <option :value="9">9 hours before</option>
            <option :value="10">10 hours before</option>
            <option :value="11">11 hours before</option>
            <option :value="12">12 hours before</option>
            <option :value="48">2 days before</option>
            <option :value="72">3 days before</option>
            <option :value="96">4 days before</option>
            <option :value="120">5 days before</option>
            <option :value="144">6 days before</option>
            <option :value="168">1 week before</option>
          </select>
        </p>
      </div>
    </div>
    <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="!$store.state.bookingOptions.bookBefore">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service'
export default {
    data() {
    return {
      guests: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    };
  },
  mounted() {
    if (
      this.$store.state.maxDuration === null &&
      this.$store.state.maxGuestCount === null &&
      this.$store.state.bookingOptions.bookBefore === null
    ) {
      this.$store.commit('setDuration', 2);
      this.$store.commit('setGuestCount', 10);
      this.$store.commit('setBookingOptions', { bookBefore: 1 });
    }
  },
  methods: {
    nextClicked() {
      updateSubmissionField('maxGuestCount', this.$store.state.maxGuestCount, this.$store.state.submissionId);
      updateSubmissionField('maxDuration', this.$store.state.maxDuration * 60, this.$store.state.submissionId);
      updateSubmissionField('bookingOptions', this.$store.state.bookingOptions, this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepReviewSubmit');
      this.$parent.switchComponent();
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
}
.menu-dropdown {
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0 20px 0 20px;
  color: black;
  background: #fff url(/images/chevron-down.png) calc(100% - 20px) 15px;
  background-repeat: no-repeat;
}
</style>
