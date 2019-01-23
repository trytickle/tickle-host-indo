<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Persyaratan Tamu</h3>
    <p class="paragraph-4">Ingatlah bahwa seseorang yang memesan pengalaman Anda mungkin memesan tempat untuk tamu lain. Jika ada persyaratan ketat seputar usia, tingkat keterampilan, atau sertifikasi, sertakan di sini.</p>
    <div class="content-wrapper">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Bahasa</div>
        <p class="paragraph-3">
          <select name="language" class="menu-dropdown" v-model="$store.state.language">
            <option  v-for="(language, index) in languages" :key="index" :value="language">{{language}}</option>
          </select>
        </p>
      </div>
    </div>
    <div class="content-wrapper" style="margin-top:20px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Usia minimum</div>
        <p class="paragraph-3">
          <select name="minimumAge" class="menu-dropdown" v-model="$store.state.guestRequirements.minimumAge">
            <option v-for="(age, index) in ages" :key="index" :value="age">{{age}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Apakah anak-anak diperbolehkan?</div>
        <p class="paragraph-3">
          <select name="kidsAllowed" class="menu-dropdown" v-model="$store.state.guestRequirements.kidsAllowed">
            <option :value="true">Ya</option>
            <option :value="false">Tidak</option>
          </select>
        </p>
      </div>
    </div>
    <div class="content-wrapper" style="margin-top:20px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Apakah alkohol akan disajikan?</div>
        <p class="paragraph-3">
          <select name="servesAlcohol" class="menu-dropdown" v-model="$store.state.guestRequirements.servesAlcohol">
            <option :value="false">Tidak</option>
            <option :value="true">Ya</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Hanya tamu yang diverifikasi?</div>
        <p class="paragraph-3">
          <select name="requireVerified" class="menu-dropdown" v-model="$store.state.guestRequirements.requireVerified">
            <option :value="false">Tidak</option>
            <option :value="true">Ya</option>
          </select>
        </p>
      </div>
    </div>
    <div style="margin-top:20px;">
      <label style="margin-bottom:10px;">Persyaratan tambahan (opsional)</label>
      <textarea name="additionalRequirements" class="textarea-field" maxlength="1500" v-model="$store.state.guestRequirements.additionalRequirements"></textarea>
    </div>
    <div style="margin-top:20px;">
      <label style="margin-bottom:10px;">Sertifikasi khusus (opsional)</label>
      <textarea name="specialCertifications" class="textarea-field" maxlength="1500" v-model="$store.state.guestRequirements.specialCertifications"></textarea>
    </div>
    <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="!$store.state.guestRequirements">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
   data() {
    return {
      ages: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
      languages: [ "Bahasa Indonesia",
                  "English",
                  "中文",
                  "ภาษาไทย",
                  "Bahasa Malaysia",
                  "Tagalog",
                  "日本語",
                  "한국어",
                  "Español",
                  "Français",
                  "Italiano",
                  "Deutsch",
                  "Dansk",
                  "Bengali",
                  "Hindi",
                  "Magyar",
                  "Nederlands",
                  "Norsk",
                  "Polski",
                  "Português",
                  "Punjabi",
                  "Sign Language",
                  "Suomi",
                  "Svenska",
                  "Türkçe",
                  "Čeština",
                  "Ελληνικά",
                  "Pусский","עִברִית","العربية"]
    };
  },
  methods: {
    nextClicked() {
      updateSubmissionField('guestRequirements', this.$store.state.guestRequirements, this.$store.state.submissionId);
      updateSubmissionField('languages', [this.$store.state.language], this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepPrice');
      this.$parent.switchComponent();
    }
  },
  mounted() {
    if (
      this.$store.state.language === null &&
      this.$store.state.guestRequirements.minimumAge === null &&
      this.$store.state.guestRequirements.kidsAllowed === null &&
      this.$store.state.guestRequirements.servesAlcohol === null &&
      this.$store.state.guestRequirements.requireVerified === null
    ) {
      this.$store.commit('setLanguage', 'English');
      this.$store.commit('setGuestRequirements', {
        minimumAge: 15,
        kidsAllowed: true,
        servesAlcohol: false,
        requireVerified: false
      });
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
