<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Apa yang akan kami lakukan</h3>
    <p class="paragraph-4">Membuat para tamu senang dengan deskripsi rencana perjalanan yang menyenangkan dan terperinci.</p>
    <div class="div-block-4">
      <div class="text-block-2" style="margin-bottom:20px;">Contoh</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "Anda akan langsung terjun ke aksi klinik pelatihan bola basket mingguan kami, tempat kami melakukan latihan dan bermain selama dua jam dengan 60 anak. Hanya ada tiga dari kami untuk semua anak-anak (perempuan dan laki-laki usia 10-17), jadi Anda akan membantu kami dengan latihan dan pelatihan. Bersiaplah untuk aktif, berkeringat, dan jelas-jelas waspada sambil bersenang-senang dengan anak-anak."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
      "Kampung halaman saya di Colle Val d'Elsa, sekitar satu jam di selatan Florence, memiliki pasar lokal, di mana saya akan memperkenalkan Anda kepada semua produsen favorit saya. Bergabunglah dengan kami saat kami menyapa dan berbelanja di antara penjual keju dan penjual ikan lokal dan saya tukang daging lama keluarga, serta orang-orang di belakang warung buah dan sayuran terbaik Tuscany. "
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Tuliskan setiap aktivitas dalam urutan yang akan Anda lakukan</label>
        <textarea name="whatWeDo" class="textarea-field" maxlength="1500" v-model="$store.state.whatWeDo"></textarea>
        <p><strong :class="{'bold-text': $store.state.whatWeDo.length >= 1500}" v-text="characterCountLeft + '  Sisa karakter'"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whatWeDo.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('whatWeDo', this.$store.state.whatWeDo.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepWhatIProvide');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.whatWeDo.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.whatWeDo.length;
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
