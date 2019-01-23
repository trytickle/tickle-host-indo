<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Beri judul pengalaman Anda</h3>
    <p class="paragraph-4">Buatlah singkat, deskriptif, dan menarik.</p>
    <div class="div-block-4">
      <p class="paragraph-3">Pikirkan tentang judul yang menggambarkan aktivitas utama Anda sehingga tamu dapat memahami apa yang akan mereka lakukan. Pertimbangkan untuk menggunakan kata kerja tindakan dan buat seunik mungkin untuk membedakan pengalaman Anda dengan yang lain.</p>
      <div class="text-block-2">Contohnya</div>
      <div class="div-block-5">
        <div class="example-wrapper">
          <div class="text-block-3">Shibori Menolak-Mewarnai dengan Dora</div><img src="images/example1.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Cat Kecantikan Porcelain dengan Yueshi</div><img src="images/example2.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Surviving A Zombie Apocalypse dengan Nachos</div><img src="images/example3.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
      </div>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Apa judul pengalaman Anda?</label>
        <input type="text" :maxlength= "maxCount" name="title" placeholder="Judul Anda" class="text-field" autocomplete="off" v-model="$store.state.title">
        <p><strong :class="{'bold-text': $store.state.title.length >= 50}" v-text="characterCountLeft + ' Sisa karakter'"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.title.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
import _ from 'lodash';

export default {
  data() {
    return {
      maxCount: 50
    };
  },
  methods: {
    nextClicked() {
      if (localStorage.submissionId) {
        console.log("updating")
        updateSubmissionField('title', _.startCase(this.$store.state.title).trim(), this.$store.state.submissionId);
        this.$store.commit('setActivePage', 'StepTagline');
        this.$parent.switchComponent();
      } else {
        console.log("creating")
        this.$store.dispatch('createExperience', this.$store.state.title);
      }
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.title.length >= 50) {
        return 0;
      } else {
        return 50 - this.$store.state.title.length;
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
