<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{ $t("notes") }} (opsional)</h3>
    <p class="paragraph-4">{{$t("notesIntro")}}</p>
    <div>
      <form>
        <label style="margin-bottom:10px;">{{$t("writeAboutNotes")}}</label>
        <textarea name="notes" class="textarea-field" maxlength="1500" v-model="$store.state.notes"></textarea>
        <p><strong :class="{'bold-text': $store.state.notes.length >= 1500}" v-text="characterCountLeft + ' '+$t('charRemaining')"></strong></p>
        <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.notes.length <= 10">
        <input type="submit" value="Melewatkan" class="submit-button" style="margin-left:20px;" @click.prevent="nextClicked">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('notes', this.$store.state.notes.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepWhereWeBe');
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
