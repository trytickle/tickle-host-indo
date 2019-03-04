<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Tagline</h3>
     <div class="div-block-4" style="padding-bottom:25px;">
      <div class="text-block-2" style="margin-bottom:20px;">Contoh</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Mengintip kehidupan desainer lokal dan mencoba teknik pewarnaan Shibori"
      </p>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "An enlightening experience for everyone of all ages"
      </p>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Pengalaman yang mencerahkan bagi semua orang dari segala usia"
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Apa tagline pengalaman Anda?</label>
        <input type="text" maxlength="80" name="tagline" placeholder="Tagline Anda" class="text-field" autocomplete="off" v-model="$store.state.tagline">
        <p><strong :class="{'bold-text': $store.state.tagline.length >= 80}" v-text="characterCountLeft + ' Sisa karakter'"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.tagline.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import {updateSubmissionField} from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('tagline', this.$store.state.tagline.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepPhotos');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.tagline.length >= 80) {
        return 0;
      } else {
        return 80 - this.$store.state.tagline.length;
      }
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 40px;
}
</style>
