<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Tentang saya</h3>
      <div class="div-block-4">
      <div class="text-block-2" style="margin-bottom:20px;">Contoh</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Saya adalah salah satu pendiri Amazing Brewing Company dan salah satu dari tujuh cicerones bersertifikasi (sommeliers bir) di Korea. Saya pernah tinggal di Asia, Eropa, dan AS dan mencicipi bir di lebih dari 100 pabrik di seluruh dunia."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Dilahirkan dan dibesarkan di pedesaan Kenya, saya pindah ke Nairobi pada usia 18 tahun. Saya mengendarai sepeda motor 400cc, mencintai komunitas bersepeda Kenya, dan percaya ada ikatan khusus antara pengendara motor."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Saya meninggalkan perbankan swasta untuk menjadi gaya hidup sadar dan blogger perjalanan. Saya mendirikan WaterThruSkin dan berkeliling dunia mempromosikan busana yang berkelanjutan, pola makan nabati, dan perjalanan yang berorientasi alam."
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Jadi, ceritakan tentang diri Anda?</label>
        <textarea name="about" class="textarea-field" maxlength="1500" v-model="$store.state.about"></textarea>
        <p><strong :class="{'bold-text': $store.state.about.length >= 1500}" v-text="characterCountLeft + '  Sisa karakter'"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.about.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('aboutHost', {'description': this.$store.state.about.trim()}, this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepWhatWeDo');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.about.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.about.length;
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
