<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">What we'll do</h3>
    <p class="paragraph-4">Get guests excited with a fun, detailed description of the itinerary.</p>
    <div class="div-block-4">
      <div class="text-block-2">Set expectations</div>
      <p class="paragraph-3">
        It’s important guests know what they’re getting into. Let them know if they have to be prepared for any particular adventures.
      </p>
      <div class="text-block-2">Be specific</div>
      <p class="paragraph-3">
        If your experience is technical, like a workshop or tutorial, don’t be afraid to get into the weeds. Guests want to know exactly what they’re paying for.
      </p>
      <div class="text-block-2" style="margin-bottom:20px;">Examples</div>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "You’ll jump right into the action of our weekly basketball coaching clinics, where we do drills and plays for two hours with 60 kids. There are only three of us for all of the kids (girls and boys ages 10-17), so you’ll be helping us with the drills and coaching. Be prepared to be active, sweat, and definitely be on your toes while having fun with the kids."
      </p>
      <hr>
      <p class="div-block-5" style="font-style:italic;color:#222;">
        "My hometown of Colle Val d’Elsa, about an hour south of Florence, has a local market, where I’ll introduce you to all my favourite producers. Join me as we greet and shop amongst the cheese vendors and local fishmongers and my family’s longtime butcher, as well as the guys behind Tuscany’s best fruit and vegetable stalls."
      </p>
    </div>
    <div>
      <form>
        <label style="margin-bottom:10px;">Write about each activity in the order you'll do them</label>
        <textarea name="whatWeDo" class="textarea-field" maxlength="1500" v-model="$store.state.whatWeDo"></textarea>
        <p><strong :class="{'bold-text': $store.state.whatWeDo.length >= 1500}" v-text="characterCountLeft + ' characters remaining'"></strong></p>
        <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="$store.state.whatWeDo.length <= 10">
      </form>
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from '~/services/firebase-service';
export default {
  methods: {
    nextClicked() {
      updateSubmissionField('whatWeDo', this.$store.state.whatWeDo.trim(), this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepWhatIProvide');
      this.$parent.switchComponent();
    }
  },
  computed: {
    characterCountLeft() {
      if (this.$store.state.whatWeDo.length >= 1500) {
        return 0;
      } else {
        return 1500 - this.$store.state.whatWeDo.length;
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
