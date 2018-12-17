<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Give your experience a title</h3>
    <p class="paragraph-4">Make it short, descriptive, and exciting.</p>
    <div class="div-block-4">
      <p class="paragraph-3">Think about writing a title that describes your main activity so guests get a sense of what they’ll be doing. Consider using action verbs and making it unique to set your experience apart.</p>
      <div class="text-block-2">Examples</div>
      <div class="div-block-5">
        <div class="example-wrapper">
          <div class="text-block-3">Shibori Resist-Dyeing with Dora</div><img src="images/example1.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Paint A Porcelain Beauty with Yueshi</div><img src="images/example2.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
        <div class="example-wrapper">
          <div class="text-block-3">Surviving A Zombie Apocalypse with Nachos</div><img src="images/example3.jpg" width="180" height="250" class="image" style="object-fit:cover;"></div>
      </div>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">What's the title of your experience?</label>
        <input type="text" :maxlength= "maxCount" name="title" placeholder="Your title" class="text-field" autocomplete="off" v-model="$store.state.title">
        <p><strong :class="{'bold-text': $store.state.title.length >= 50}" v-text="characterCountLeft + ' characters remaining'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.title.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
import _ from 'lodash';

export default {
  data() {
    return {
      maxCount: 50
    };
  },
  methods: {
    nextClicked() {
      if (localStorage.submissionId) {
        console.log("updating")
        updateSubmissionField('title', _.startCase(this.$store.state.title).trim(), this.$store.state.submissionId);
        this.$store.commit('setActivePage', 'StepTagline');
        this.$parent.switchComponent();
      } else {
        console.log("creating")
        this.$store.dispatch('createExperience', this.$store.state.title);
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
}
</script>

<style scoped>
form {
  margin-top: 40px;
}
</style>
