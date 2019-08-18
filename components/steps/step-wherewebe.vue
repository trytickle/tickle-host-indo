<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{$t('whereWeBe')}}</h3>
    <p class="paragraph-4">{{$t("whereWeBeIntro")}}</p>
    <div class="div-block-4">
      <div class="text-block-2" style="margin-bottom:20px;">{{ $t('examples') }}</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Kami akan melakukan workshop kami di rumah mungil kami di atas roda, bus sekolah yang kami konversi menjadi rumah yang indah. Segala sesuatu di rumah ini berkelanjutan. Ini adalah tempat khusus untuk dilihat dan dialami."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
       "Kami kemungkinan besar akan naik ke Kloof Corner Ridge, garis punggungan yang luar biasa menuju Cabbleway atas. Namun, kami bisa melakukan versi yang sedikit berbeda dari lari ini, tergantung pada cuaca dan kemampuan grup. Setelah kami turun dan bersihkan, kami akan menikmati makan malam di salah satu restoran favorit saya. "
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">{{$t("writeAboutWhereWeBe")}}</label>
        <textarea name="whereWeBe" class="textarea-field" maxlength="1500" v-model="$store.state.whereWeBe"></textarea>
        <p><strong :class="{'bold-text': $store.state.whereWeBe.length >= 1500}" v-text="characterCountLeft + ' '+$t('charRemaining')"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whereWeBe.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service'
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('whereWeBe', this.$store.state.whereWeBe.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepWhereWeMeet');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.whereWeBe.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.whereWeBe.length;
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
