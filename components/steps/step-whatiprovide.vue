<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">What I'll provide</h3>
    <p class="paragraph-4">It’s important to let guests know what you’ll provide because it helps them understand what they’re paying for.</p>
    <div class="div-block-4">
      <div class="text-block-2">Specify what’s included</div>
      <p class="paragraph-3">
        Describe the unique things you’ll provide in detail so guests know what to expect.
      </p>
      <div class="text-block-2">Accommodate different guests</div>
      <p class="paragraph-3">
        Some guests might have dietary restrictions or physical limitations. Let them know if you can adapt to meet their needs.
      </p>
      <div class="text-block-2" style="margin-bottom:20px;text-decoration:underline;">Examples</div>
      <p class="div-block-5" style="color:#222;">
        Tour Martin’s Studio<br/><br/>
        Refreshments<br/>
        Feel free to share your preference and I will do my best to accommodate!
        <br/><br/>
        Appetisers<br/>
        Let me know if you are on a special diet, like Vegan or Gluten Free
      </p>
      <hr>
      <p class="div-block-5" style="color:#222;">
        Malibu Dinner and Mountaintop Shoot<br/><br/>
        Seafood Dinner<br/>
        Longtime spot where fresh catches & beer are served at picnic tables overlooking the ocean
        <br/><br/>
        Sparkling water<br/>
        Feel free to bring a bottle of wine for the campfire (BYOB)
        <br/><br/>
        Transportation to Rick’s Estate<br/>
        We will pick you up from Neptune’s Net and head up the mountain to Rick’s estate<br/>
        **Transportation provided free of charge
        <br/><br/>
        Digital Cameras & Telescopes Binoculars, Special Mounts & Tripods
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">What will you provide for guests?</label>
        <textarea name="whatIProvide" class="textarea-field" placeholder="• A bottle of water" maxlength="1500" v-model="$store.state.whatIProvide"></textarea>
        <p><strong :class="{'bold-text': $store.state.whatIProvide.length >= 1500}" v-text="characterCountLeft + ' characters remaining'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whatIProvide.length <= 10">
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
      this.$store.commit('setActivePage', 'StepWhereWeBe');
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
