<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Kategori</h3>
    <p class="paragraph-4">Pilih kategori yang paling menggambarkan pengalaman Anda sehingga muncul untuk tamu yang menelusuri kategori itu..</p>
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
    <h3 style="padding-top:100px;" class="heading-3">Label</h3>
    <p class="paragraph-4">Pilih Label yang paling menggambarkan pengalaman Anda.</p>
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
        "Mencicipi makanan",
        "Mengendarai sepeda",
        "Perjalanan sehari",
       "Mengunjungi bar",
       " Mencicipi teh",
       " Meditasi",
        "Mencicipi alkohol",
       "Mencicipi bir",
       " Mengendarai kapal",
        "Pesta makan siang",
       " Mencicipi makanan sambil jalan",
        "Kelas seni",
       " Hiking dengan pemandu",
       " Belajar berselancar",
        "Jalan-jalan budaya",
       "Pesta dansa",
       "Lokakarya",
        "Mengunjungi pasar",
        "Konser intim",
        "Mencicipi hidangan manis / kueh",
        "Mencicipi wine",
        "Mengunjungi kebun anggur",
        "Perkumpulan sosial",
        "Sesi foto",
       "Sesi video",
        "Perburuan",
       "Kelas membuat kue",
        "Jalan-jalan sejarah",
       "Mengunjungi kantor",
        "Jalan-jalan seni",
        "Upacara minum teh",
        "Hiburan",
        "Pelajaran dansa",
        "Kayak",
        "Jalan-jalan alam",
        "Kunjungan cagar alam",
       " Makanan & minuman",
        "Mengunjungi pertanian",
        "Pelajaran musik",
        "Pertunjukkan dansa",
       " Musik",
        "Mengunjungi museum",
        "Belanja",
        "Pagelaran musik",
       " Ziplining",
       " Pelajaran polo",
        "Berkendara off road",
       "Kelas yoga",
        "Jalan-jalan desain",
        "Skateboarding",
       " Berlari di alam"
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
