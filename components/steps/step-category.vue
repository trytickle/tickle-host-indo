<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Category</h3>
    <p class="paragraph-4">Choose the category that best describes your experience. Add a second so it also appears to guests browsing in that category.</p>
    <div class="content-wrapper">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Primary Category</div>
        <p class="paragraph-3">
          <select name="category" class="menu-dropdown" v-model="$store.state.categoryPrimary">
            <option v-for="(category, index) in categories" :key="index" :value="index">{{category}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Secondary Category</div>
        <p class="paragraph-3">
          <select name="category" class="menu-dropdown" v-model="$store.state.categorySecondary">
            <option v-for="(category, index) in categories" :key="index" :value="index">{{category}}</option>
          </select>
        </p>
      </div>
    </div>
    <h3 class="heading-3">Label</h3>
    <p class="paragraph-4">Choose the Label that best describes your experience.</p>
    <div class="content-wrapper">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">Label</div>
        <p class="paragraph-3">
          <select name="category" class="menu-dropdown" v-model="$store.state.label">
            <option v-for="(label, index) in labels" :key="index" :value="label">{{label}}</option>
          </select>
        </p>
      </div>
    </div>
    <input type="submit" value="Save" class="submit-button" @click.prevent="nextClicked" :disabled="validateCategories">
  </div>
</template>

<script>
import { updateSubmissionField } from "~/services/firebase-service";
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      categories: [],
      labels: [
        "Dinner party",
        "Photo class",
        "Craft class",
        "Cooking class",
        "Food tasting",
        "Bike ride",
        "Day trip",
        "Bar crawl",
        "Tea tasting",
        "Meditation",
        "Spirits tasting",
        "Beer tasting",
        "Boat ride",
        "Lunch party",
        "Food walk",
        "Art class",
        "Guided hike",
        "Surf lesson",
        "Culture walk",
        "Dance party",
        "Workshop",
        "Market visit",
        "Intimate concert",
        "Dessert tasting",
        "Wine tasting",
        "Vineyard visit",
        "Social gathering",
        "Photo shoot",
        "Video shoot",
        "Scavenger hunt",
        "Baking class",
        "History walk",
        "Office visit",
        "Art walk",
        "Tea ceremony",
        "Entertainment",
        "Dance lesson",
        "Kayaking",
        "Nature walk",
        "Sanctuary visit",
        "Food & drink",
        "Farm visit",
        "Music lesson",
        "Dance recital",
        "Music",
        "Museum visit",
        "Shopping",
        "Live music",
        "Ziplining",
        "Polo lesson",
        "Offroading",
        "Yoga class",
        "Design walk",
        "Skateboarding",
        "Scenic run"
      ]
    };
  },
  async created() {
    const categorySnap = await db
      .collection("categories")
      .orderBy("categoryId")
      .get();
    categorySnap.forEach(doc => {
      this.categories.push(doc.data().title);
    });
  },
  methods: {
    nextClicked() {
      updateSubmissionField(
        "categoryPrimary",
        this.$store.state.categoryPrimary,
        this.$store.state.submissionId
      );
      updateSubmissionField(
        "categorySecondary",
        this.$store.state.categorySecondary,
        this.$store.state.submissionId
      );
      updateSubmissionField(
        "subtitle",
        this.$store.state.label,
        this.$store.state.submissionId
      )
      this.$store.commit("setActivePage", "StepGuestRequirements");
      this.$parent.switchComponent();
    }
  },
  computed: {
    validateCategories() {
      if (
        this.$store.state.categoryPrimary === null ||
        this.$store.state.categorySecondary === null
      ) {
        return true;
      }
      if (
        this.$store.state.categoryPrimary ===
        this.$store.state.categorySecondary
      ) {
        return true;
      }
      return false;
    }
  }
};
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
