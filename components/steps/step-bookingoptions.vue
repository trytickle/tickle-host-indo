<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{$t('bookingOptions')}}</h3>
    <p class="paragraph-4">{{$t('bookingOptionIntro')}}</p>
    <div class="content-wrapper" style="margin-top:30px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">{{$t('duration')}}</div>
        <p class="paragraph-3">
          <select name="duration" class="menu-dropdown" v-model="$store.state.maxDuration">
            <option :value="1">1 {{$t('hour')}}</option>
            <option :value="2">2 {{$t('hours')}}</option>
            <option :value="3">3 {{$t('hours')}}</option>
            <option :value="4">4 {{$t('hours')}}</option>
            <option :value="5">5 {{$t('hours')}}</option>
            <option :value="6">6 {{$t('hours')}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">{{$t('guestCount')}}</div>
        <p class="paragraph-3">
          <select name="guestCount" class="menu-dropdown" v-model="$store.state.maxGuestCount">
            <option v-for="(count, index) in guests" :key="index" :value="count">{{count}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">{{$t('latestBookingTime')}}</div>
        <p class="paragraph-3">
          <select name="bookBefore" class="menu-dropdown" v-model="$store.state.bookingOptions.bookBefore">
            <option :value="1">1 jam sebelumnya</option>
            <option :value="2">2 jam sebelumnyae</option>
            <option :value="3">3 jam sebelumnya</option>
            <option :value="4">4 jam sebelumnya</option>
            <option :value="5">5 jam sebelumnya</option>
            <option :value="6">6 jam sebelumnya</option>
            <option :value="7">7 jam sebelumnya</option>
            <option :value="8">8 jam sebelumnya</option>
            <option :value="9">9 jam sebelumnya</option>
            <option :value="10">10 jam sebelumnya</option>
            <option :value="11">11 jam sebelumnya</option>
            <option :value="12">12 jam sebelumnya</option>
            <option :value="48">2 hari sebelumnya</option>
            <option :value="72">3 hari sebelumnya</option>
            <option :value="96">4 hari sebelumnya</option>
            <option :value="120">5 hari sebelumnya</option>
            <option :value="144">6 hari sebelumnya</option>
            <option :value="168">1 hari sebelumnya</option>
          </select>
        </p>
      </div>
    </div>
    <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="!$store.state.bookingOptions.bookBefore">
  </div>
</template>

<script>
import { updateSubmissionField } from "~/services/firebase-service";
export default {
  data() {
    return {
      guests: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    };
  },
  mounted() {
    if (
      this.$store.state.maxDuration === null &&
      this.$store.state.maxGuestCount === null &&
      this.$store.state.bookingOptions.bookBefore === null
    ) {
      this.$store.commit("setDuration", 2);
      this.$store.commit("setGuestCount", 10);
      this.$store.commit("setBookingOptions", { bookBefore: 1 });
    }
  },
  methods: {
    nextClicked() {
      updateSubmissionField(
        "maxGuestCount",
        this.$store.state.maxGuestCount,
        this.$store.state.submissionId
      );
      updateSubmissionField(
        "maxDuration",
        this.$store.state.maxDuration * 60,
        this.$store.state.submissionId
      );
      updateSubmissionField(
        "bookingOptions",
        this.$store.state.bookingOptions,
        this.$store.state.submissionId
      );
      this.$store.commit("setActivePage", "StepReviewSubmit");
      this.$parent.switchComponent();
    }
  }
};
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
