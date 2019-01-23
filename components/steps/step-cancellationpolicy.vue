<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Kebijakan pembatalan</h3>
    <p class="paragraph-4">Tuan rumah yang menawarkan kebijakan pembatalan fleksibel mendapatkan pemesanan 37% lebih banyak daripada host yang menetapkan kebijakan ketat. Jika Anda tidak yakin, kami sarankan Anda memulai dengan kebijakan yang fleksibel.</p>
    <div class="content-wrapper" style="margin-top:30px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Pilih kebijakan</div>
        <p class="paragraph-3">
          <select name="cancellationPolicy" class="menu-dropdown" v-model="$store.state.cancellationPolicy">
            <option value="0">Fleksibel</option>
            <option value="1">Moderat</option>
            <option value="2">Ketat</option>
          </select>
        </p>
      </div>
    </div>
    <p>{{policyDescription}}</p>
    <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.cancellationPolicy === null">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service'
export default {
  data() {
    return {
      policyDescription: 'Pengalamannya dapat dibatalkan dan dikembalikan sepenuhnya hingga 24 jam sebelum dimulai.'
    };
  },
  mounted() {
    if (this.$store.state.cancellationPolicy === null) {
      this.$store.commit('setCancellationPolicy', 0);
    }
    switch (this.$store.state.cancellationPolicy) {
      case 0: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 24 jam sebelum dimulai.'; break;
      case 1: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 5 hari sebelum dimulai.'; break;
      case 2: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 7 hari sebelumnya. Pengembalian sebesar 50% apabila pembatalan dilakukan dalam 7 hari.'; break;
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
        case 0: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 24 jam sebelum dimulai.'; break;
        case 1: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 5 hari sebelum dimulai.'; break;
        case 2: this.policyDescription = 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 7 hari sebelumnya. Pengembalian sebesar 50% apabila pembatalan dilakukan dalam 7 hari.'; break;
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
