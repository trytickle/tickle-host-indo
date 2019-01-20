<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Di mana kami berada</h3>
    <p class="paragraph-4">Beri tahu tamu ke mana Anda akan pergi, mengapa setiap lokasi istimewa, atau mengapa mereka akan menyukainya. Tidak apa-apa jika hanya satu lokasi.</p>
    <div class="div-block-4">
      <div class="text-block-2">Buat daftar tempat yang akan dikunjungie</div>
      <p class="paragraph-3">
       Sebutkan tempat yang akan Anda kunjungi dan beri petunjuk mengapa tempat itu bermakna bagi Anda dan keseluruhan pengalaman yang akan dirasakan.
      </p>
      <div class="text-block-2">Jangan memberikan alamat</div>
      <p class="paragraph-3">
       Para tamu akan melihat alamat yang tepat setelah mereka memesan. Lebih penting untuk menjelaskan secara deskriptif mengapa tempat tersebut menarik.
      </p>
      <div class="text-block-2" style="margin-bottom:20px;">Examples</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "We will conduct our workshop in our tiny house on wheels, a school bus we converted into a beautiful home. Everything in the house is sustainable. It’s a special place to see and experience."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "We’ll most likely go up to Kloof Corner Ridge, a superb ridge line scramble towards the upper Cabbleway. However, we could do a slightly different version of this run, depending on the weather and ability of the group. After we descend and clean up, we’ll enjoy dinner at one of my favourite restaurants."
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Tambahkan detail tentang di mana Anda akan berada</label>
        <textarea name="whereWeBe" class="textarea-field" maxlength="1500" v-model="$store.state.whereWeBe"></textarea>
        <p><strong :class="{'bold-text': $store.state.whereWeBe.length >= 1500}" v-text="characterCountLeft + '  Sisa karakter'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whereWeBe.length <= 10">
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
      this.$store.commit('setActivePage', 'StepNotes');
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
