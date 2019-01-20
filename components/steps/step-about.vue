<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Tentang saya</h3>
    <p class="paragraph-4">Menyebutkan semua hal yang menunjukkan bahwa Anda orang tepat untuk menjadi tuan rumah dalam pengalaman ini akan membuat Anda lebih dipercaya oleh tamu. Hal ini dapat mencakup kualitas pribadi, kualifikasi, prestasi, penghargaan, atau bahkan lamanya waktu Anda berlatih atau mempelajari keahlian Anda.</p>
    <div class="div-block-4">
      <div class="text-block-2">Sorot keahlian Anda</div>
      <p class="paragraph-3">
       Tunjukkan mengapa Anda memenuhi syarat untuk menjadi tuan rumah. Sebutkan keterampilan, kredensial, atau bahkan pengalaman hidup unik yang menjadikan Anda tuan rumah yang kredibel.
      </p>
      <div class="text-block-2">Terdengar menarik</div>
      <p class="paragraph-3">
       Biarkan kepribadian Anda bersinar. Coba akhiri dengan fakta yang menyenangkan atau detail pribadi yang menarik untuk menghindari kesan formal.
      </p>
      <div class="text-block-2" style="margin-bottom:20px;">Examples</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "I’m co-founder of the Amazing Brewing Company and one of seven certified cicerones (beer sommeliers) in Korea. I’ve lived in Asia, Europe, and the US and tasted beer at over 100 breweries worldwide."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Born and raised in the Kenyan countryside, I moved to Nairobi at the age of 18. I ride a 400cc motorcycle, love the Kenyan biking community, and believe there is a special bond between bikers."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "I left private banking to become a conscious lifestyle and travel blogger. I founded WaterThruSkin and travel the world promoting sustainable fashion, a plant-based diet, and nature-oriented travel."
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Jadi, ceritakan tentang diri Anda?</label>
        <textarea name="about" class="textarea-field" maxlength="1500" v-model="$store.state.about"></textarea>
        <p><strong :class="{'bold-text': $store.state.about.length >= 1500}" v-text="characterCountLeft + '  Sisa karakter'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.about.length <= 10">
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
