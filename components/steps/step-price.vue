<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Harga</h3>
    <p class="paragraph-4">Harga pengalaman Anda selalu terserah Anda. Beberapa host baru menawarkan pengalaman mereka dengan harga lebih rendah di awal untuk menarik tamu ketika mereka belum memiliki ulasan.</p>
    <div class="div-block-4" style="padding-bottom:20px;">
      <div class="text-block-2">Tetapkan ekspektasi</div>
      <p class="paragraph-3">
      Harga yang Anda tentukan harus sesuai dengan nilai yang Anda tawarkan kepada tamu. Sama seperti bisnis apa pun, jika tamu tidak memahami nilai pengalaman Anda kepada mereka, mereka tidak akan memesannya.
      </p>
      <div class="text-block-2">Rekomendasi kami</div>
      <p class="paragraph-3">
      Jika Anda baru, mulailah dari 200000 Rp. Setelah Anda menjalankan pengalaman Anda beberapa kali, sesuaikan harga berdasarkan masukan dari tamu untuk mengontrol jumlah pemesanan yang Anda dapatkan.
      </p>
    </div>
    <label style="margin-bottom:10px;margin-top:30px;">Tetapkan harga rata-rata Anda</label>
    <div class="price-wrapper">
      <p class="currency-wrapper">{{$store.state.currency.toUpperCase()}}</p>
      <input type="number" maxlength="5" name="price" placeholder="Rp" class="text-field price-input" autocomplete="off" v-model="$store.state.pricePerPax">
    </div>
    <p>Catatan: Anda dapat mengubah harga di lain waktu untuk setiap tanggal saat mengatur ketersediaan Anda.</p>
    <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.pricePerPax < 20">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('pricePerPax', this.$store.state.pricePerPax*100, this.$store.state.submissionId);
      updateSubmissionField('currency', 'idr', this.$store.state.submissionId);
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
