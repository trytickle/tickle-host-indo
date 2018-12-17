<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Where we'll be</h3>
    <p class="paragraph-4">Tell guests where you’ll go, why each location is special, or why they will love it. It’s ok if it’s just one location.</p>
    <div class="div-block-4">
      <div class="text-block-2">List every place</div>
      <p class="paragraph-3">
        Mention any places you’ll visit and hint at why they’re meaningful to you and the overall experience.
      </p>
      <div class="text-block-2">Don’t give an address</div>
      <p class="paragraph-3">
        Guests will see the exact address once they book. It’s more important to explain what the place is and why it’s worthwhile.
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
        <label style="margin-bottom:10px;">Add details about where you’ll be</label>
        <textarea name="whereWeBe" class="textarea-field" maxlength="1500" v-model="$store.state.whereWeBe"></textarea>
        <p><strong :class="{'bold-text': $store.state.whereWeBe.length >= 1500}" v-text="characterCountLeft + ' characters remaining'"></strong></p>
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
