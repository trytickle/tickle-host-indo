<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Price</h3>
    <p class="paragraph-4">The price of your experience is always up to you. Some new hosts offer their experience at a lower price in the beginning to attract guests when they don’t have any reviews yet.</p>
    <div class="div-block-4" style="padding-bottom:20px;">
      <div class="text-block-2">Set expectations</div>
      <p class="paragraph-3">
        The price you set should match the value you're offering to guests. Just like any business, if guests don't understand the value of your experience to them, they won't book it.
      </p>
      <div class="text-block-2">Our recommendation</div>
      <p class="paragraph-3">
        If you're new, start at $20. After you've run your experience a few times, adjust your price based on guest feedback as well as to control the amount of bookings you're getting.
      </p>
    </div>
    <label style="margin-bottom:10px;margin-top:30px;">Set your average price</label>
    <div class="price-wrapper">
      <p class="currency-wrapper">{{$store.state.currency.toUpperCase()}}</p>
      <input type="number" maxlength="5" name="price" placeholder="$" class="text-field price-input" autocomplete="off" v-model="$store.state.pricePerPax">
    </div>
    <p>Note: You can vary your price later for each date when you set up your availability.</p>
    <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.pricePerPax < 20">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('pricePerPax', this.$store.state.pricePerPax*100, this.$store.state.submissionId);
      updateSubmissionField('currency', 'sgd', this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepCancellationPolicy');
      this.$parent.switchComponent();
    }
  }
}
</script>

<style scoped>
.price-wrapper {
  position: relative;
  margin-bottom: 80px;
}
.currency-wrapper {
  position: absolute;
  top: 13px;
  left: 20px;
  z-index: 1;
  color: #222;
  font-size: 17px;
  font-weight: 900;
}
.price-input {
  position: absolute;
  padding-left: 70px;
  padding-bottom: 5px;
  z-index: 0;
}
</style>
