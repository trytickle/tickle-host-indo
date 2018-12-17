<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Notes (optional)</h3>
    <p class="paragraph-4">Put yourself in a guest’s shoes. Some information may seem obvious, but be detailed so guests are over-prepared.</p>
    <div>
      <form>
        <label style="margin-bottom:10px;">Try addressing any concerns guests might have about booking your experience</label>
        <textarea name="notes" class="textarea-field" maxlength="1500" v-model="$store.state.notes"></textarea>
        <p><strong :class="{'bold-text': $store.state.notes.length >= 1500}" v-text="characterCountLeft + ' characters remaining'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.notes.length <= 10">
        <input type="submit" value="Skip" class="submit-button" style="margin-left:20px;" @click.prevent="nextClicked">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      if (this.$store.state.notes.trim().length > 0) {
        updateSubmissionField('notes', this.$store.state.notes.trim(), this.$store.state.submissionId);
      }
      this.$store.commit('setActivePage', 'StepWhereWeMeet');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.notes.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.notes.length;
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
