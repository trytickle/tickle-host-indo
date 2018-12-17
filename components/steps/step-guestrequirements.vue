<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Guest requirements</h3>
    <p class="paragraph-4">Keep in mind that someone booking your experience might book spots for other guests. If there are strict requirements around age, skill level, or certifications, include them here.</p>
    <div class="content-wrapper">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Language</div>
        <p class="paragraph-3">
          <select name="language" class="menu-dropdown" v-model="$store.state.language">
            <option  v-for="(language, index) in languages" :key="index" :value="language">{{language}}</option>
          </select>
        </p>
      </div>
    </div>
    <div class="content-wrapper" style="margin-top:20px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Minimum age</div>
        <p class="paragraph-3">
          <select name="minimumAge" class="menu-dropdown" v-model="$store.state.guestRequirements.minimumAge">
            <option v-for="(age, index) in ages" :key="index" :value="age">{{age}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Are kids allowed?</div>
        <p class="paragraph-3">
          <select name="kidsAllowed" class="menu-dropdown" v-model="$store.state.guestRequirements.kidsAllowed">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </p>
      </div>
    </div>
    <div class="content-wrapper" style="margin-top:20px;">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Will alcohol be served?</div>
        <p class="paragraph-3">
          <select name="servesAlcohol" class="menu-dropdown" v-model="$store.state.guestRequirements.servesAlcohol">
            <option :value="false">No</option>
            <option :value="true">Yes</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Verified guests only?</div>
        <p class="paragraph-3">
          <select name="requireVerified" class="menu-dropdown" v-model="$store.state.guestRequirements.requireVerified">
            <option :value="false">No</option>
            <option :value="true">Yes</option>
          </select>
        </p>
      </div>
    </div>
    <div style="margin-top:20px;">
      <label style="margin-bottom:10px;">Additional requirements (optional)</label>
      <textarea name="additionalRequirements" class="textarea-field" maxlength="1500" v-model="$store.state.guestRequirements.additionalRequirements"></textarea>
    </div>
    <div style="margin-top:20px;">
      <label style="margin-bottom:10px;">Special certifications (optional)</label>
      <textarea name="specialCertifications" class="textarea-field" maxlength="1500" v-model="$store.state.guestRequirements.specialCertifications"></textarea>
    </div>
    <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="!$store.state.guestRequirements">
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
   data() {
    return {
      ages: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
      languages: ["English",
                  "中文",
                  "ภาษาไทย",
                  "Bahasa Indonesia",
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
