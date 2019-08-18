<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{ $t("giveExperienceTitle")}}</h3>
    <p class="paragraph-4">{{ $t("titleHelpText")}}</p>
    <div class="div-block-4">
     <div class="text-block-2">{{ $t("examples")}}</div>
      <div class="div-block-5">
        <div class="example-wrapper">
          <div class="text-block-3">Jakarta Night Cycle with Oki</div><img src="images/example1.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Basic DJ Knowledge with DJ Rhino</div><img src="images/example2.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Men's Shirt – Japanese Style with Andrina</div><img src="images/example3.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
       <div class="example-wrapper">
          <div class="text-block-3">Toy Photography with Iboy</div><img src="images/example4.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
      </div>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">{{ $t("whatIsTitleOfExp")}}</label>
        <input type="text" :maxlength= "maxCount" name="title" placeholder="Judul Anda" class="text-field" autocomplete="off" v-model="$store.state.title">
        <p><strong :class="{'bold-text': $store.state.title.length >= 50}" v-text="characterCountLeft + ' '+$t('charRemaining')"></strong></p>
        <input type="submit" :value="$t('save')" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.title.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from "~/services/firebase-service";
import _ from "lodash";

export default {
  data() {
    return {
      maxCount: 50
    };
  },
  methods: {
    nextClicked() {
      if (localStorage.submissionId) {
        updateSubmissionField(
          "title",
          _.startCase(this.$store.state.title).trim(),
          this.$store.state.submissionId
        );
        console.log(this.$store.state.title);
        this.$store.commit("setActivePage", "StepTagline");
        this.$parent.switchComponent();
      } else {
        console.log("creating");
        this.$store.dispatch("createExperience", this.$store.state.title);
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
};
</script>

<style scoped>
form {
  margin-top: 40px;
}
</style>
