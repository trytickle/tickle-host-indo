<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{$t('category')}}</h3>
    <p class="paragraph-4">{{$t('categoryIntro')}}</p>
    <div class="content-wrapper">
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">{{$t('primaryCategory')}}</div>
        <p class="paragraph-3">
          <select name="category" class="menu-dropdown" v-model="$store.state.categoryPrimary">
            <option v-for="(category, index) in categories" :key="index" :value="index">{{category}}</option>
          </select>
        </p>
      </div>
      <div>
        <div class="text-block-2" style="margin-bottom:10px;">{{$t('secondaryCategory')}}</div>
        <p class="paragraph-3">
          <select name="category" class="menu-dropdown" v-model="$store.state.categorySecondary">
            <option v-for="(category, index) in categories" :key="index" :value="index">{{category}}</option>
          </select>
        </p>
      </div>
    </div>
    <h3 style="padding-top:100px;" class="heading-3">Label</h3>
    <p class="paragraph-4">{{$t('labelIntro')}}</p>
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
    <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="validateCategories">
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
        "Pesta makan malam",
        "Kelas foto",
        "Kelas kerajinan",
        "Kelas memasak",
        "Food tasting",
        "Mengendarai sepeda",
        "Perjalanan sehari",
        "Bar Crawl",
        " Mencicipi teh",
        " Meditasi",
        "Spirit tasting",
        "Beer tasting",
        " Boat Ride",
        "Pesta makan siang",
        "Jelajah makanan",
        "Kelas seni",
        " Hiking dengan pemandu",
        "Belajar selancar",
        "Jelajah budaya",
        "Dance Party",
        "Workshop",
        "Traditional Market Visit",
        "Konser Privat",
        "Dessert tasting",
        "Wine Tasting",
        "Vineyar visit",
        "Kumpul-kumpul",
        "Photoshoot",
        "Videoshoot",
        "Berburu",
        "Kelas membuat kue",
        "Jelajah sejarah",
        "Office visit",
        "Jalan-jalan seni",
        "Tea ceremony",
        "Hiburan",
        "Belajar dansa",
        "Kayak",
        "Jelajah alam",
        "Kunjungan cagar alam",
        "Makanan & minuman",
        "Farm visit",
        "Belajar musik",
        "Pertunjukkan dansa",
        "Musik",
        "Kunjungan museum",
        "Belanja",
        "Pagelaran musik",
        "Ziplining",
        "Polo lesson",
        "Berkendara off road",
        "Kelas yoga",
        "Design Walk",
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
      );
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
