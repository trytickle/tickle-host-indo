<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Cancellation policy</h3>
    <p class="paragraph-4">Hosts who offer a flexible cancellation policy get 37% more bookings than hosts who set a strict policy. If you're unsure, we recommend you start out with the flexible policy.</p>
    <div class="content-wrapper" style="margin-top:30px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Select policy</div>
        <p class="paragraph-3">
          <select name="cancellationPolicy" class="menu-dropdown" v-model="$store.state.cancellationPolicy">
            <option value="0">Flexible</option>
            <option value="1">Moderate</option>
            <option value="2">Strict</option>
          </select>
        </p>
      </div>
    </div>
    <p>{{policyDescription}}</p>
    <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.cancellationPolicy === null">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service'
export default {
  data() {
    return {
      policyDescription: 'This experience can be canceled and fully refunded up to 24 hours before it starts.'
    };
  },
  mounted() {
    if (this.$store.state.cancellationPolicy === null) {
      this.$store.commit('setCancellationPolicy', 0);
    }
    switch (this.$store.state.cancellationPolicy) {
      case 0: this.policyDescription = 'This experience can be canceled and fully refunded up to 24 hours before it starts.'; break;
      case 1: this.policyDescription = 'This experience can be canceled and fully refunded up to 5 days before it starts.'; break;
      case 2: this.policyDescription = 'This experience can be canceled and fully refunded up to 7 days before it starts. 50% will be refunded if cancellation is made within 7 days.'; break;
    }
  },
  methods: {
    nextClicked() {
      updateSubmissionField('cancellationPolicy', this.$store.state.cancellationPolicy, this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepBookingOptions');
      this.$parent.switchComponent();
    }
  },
  watch: {
    '$store.state.cancellationPolicy'() {
      this.$store.commit('setCancellationPolicy', parseInt(this.$store.state.cancellationPolicy));
      switch (this.$store.state.cancellationPolicy) {
        case 0: this.policyDescription = 'This experience can be canceled and fully refunded up to 24 hours before it starts.'; break;
        case 1: this.policyDescription = 'This experience can be canceled and fully refunded up to 5 days before it starts.'; break;
        case 2: this.policyDescription = 'This experience can be canceled and fully refunded up to 7 days before it starts. 50% will be refunded if cancellation is made within 7 days.'; break;
      }
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
