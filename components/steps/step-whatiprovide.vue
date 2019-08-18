<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Apa yang akan saya sediakan</h3>
    <p class="paragraph-4">Penting untuk memberi tahu tamu apa yang akan Anda berikan karena hal tersebut membantu mereka memahami apa yang mereka bayar.</p>
    <div class="div-block-4">
      <div class="text-block-2" style="margin-bottom:20px;text-decoration:underline;">{{ $t('examples') }}</div>
      <p class="div-block-5" style="color:#222;">
        Tour Martin’s Studio<br/><br/>
        Minuman<br/>
        Jangan ragu untuk membagikan preferensi Anda dan saya akan melakukan yang terbaik untuk mengakomodasi!
        <br/><br/>
        Makanan pembuka aneka sup<br/>
        Beri tahu saya jika Anda melakukan diet khusus, seperti Vegan atau Bebas Gluten
      </p>
      <hr>
      <p class="div-block-5" style="color:#222;">
        Malibu Dinner dan Mountaintop Shoot<br/><br/>
        Makan Malam Seafood<br/>
        Tempat lama di mana tangkapan segar & bir disajikan di meja piknik yang menghadap ke laut
        <br/><br/>
        Air soda<br/>
       Jangan ragu untuk membawa sebotol anggur untuk api unggun (BYOB)
        <br/><br/>
       Transportasi ke Perkebunan Rick<br/>
       Kami akan menjemput Anda dari Neptunus Net dan menuju gunung ke perkebunan Rick<br/>
       ** Transportasi disediakan gratis
        <br/><br/>
       Kamera Digital & Teropong Teleskop, Mount & Tripod Khusus
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">{{ $t('writeWhatYouProvide') }}</label>
        <textarea name="whatIProvide" class="textarea-field" placeholder="• A bottle of water" maxlength="1500" v-model="$store.state.whatIProvide"></textarea>
        <p><strong :class="{'bold-text': $store.state.whatIProvide.length >= 1500}" v-text="characterCountLeft + ' '+$t('charRemaining')"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whatIProvide.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('whatIProvide', this.$store.state.whatIProvide.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepNotes');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.whatIProvide.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.whatIProvide.length;
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
