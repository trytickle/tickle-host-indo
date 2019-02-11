<template>
  <div class="sidebar">
    <span v-if="$store.state.status" :class="{'status-label-draft': $store.state.status.isDraft, 'status-label-live': $store.state.status.isApproved, 'status-label-rejected': $store.state.status.isRejected, 'status-label-review': $store.state.status.inReview  }" >{{$store.state.status && ($store.state.status.isDraft ? "Draf" : ($store.state.status.inReview ? "Ditinjau": ($store.state.status.isApproved ? "Langsung": "Ditolak")))}}</span>
    <h1 class="heading-2" style="margin-top:15px;line-height:35px;">Personalisasikan pengalaman Anda</h1>
    <div class="div-block-3">
      <div class="step-line"></div>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepTitle', 'is-completed': $store.state.title.length > 10}" id="StepTitle" @click="changeStep($event)">Judul<span v-if="$store.state.title.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepTagline', 'is-completed': $store.state.tagline.length > 10}" id="StepTagline" @click="changeStep($event)">Tagline<span v-if="$store.state.tagline.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepPhotos', 'is-completed': $store.state.photos[0] !== null}" id="StepPhotos" @click="changeStep($event)">Foto<span v-if="$store.state.photos[0] !== null"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepAbout', 'is-completed': $store.state.about.length > 10}" id="StepAbout" @click="changeStep($event)">Tentang saya<span v-if="$store.state.about.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepWhatWeDo', 'is-completed': $store.state.whatWeDo.length > 10}" id="StepWhatWeDo" @click="changeStep($event)">Apa yang akan kami lakukan<span v-if="$store.state.whatWeDo.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepWhatIProvide', 'is-completed': $store.state.whatIProvide.length > 10}" id="StepWhatIProvide" @click="changeStep($event)">Apa yang akan saya sediakan<span v-if="$store.state.whatIProvide.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepNotes', 'is-completed': $store.state.notes.length > 10}" id="StepNotes" @click="changeStep($event)">Catatan<span v-if="$store.state.notes.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepWhereWeBe', 'is-completed': $store.state.whereWeBe.length > 10}" id="StepWhereWeBe" @click="changeStep($event)">Di mana kami berada<span v-if="$store.state.whereWeBe.length > 10"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepWhereWeMeet', 'is-completed': validateWhereWeMeet}" id="StepWhereWeMeet" @click="changeStep($event)">Di mana kami akan bertemu<span v-if="validateWhereWeMeet"> 👍</span></button>

      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepCategory', 'is-completed': validateCategories}" id="StepCategory" @click="changeStep($event)">Kategori<span v-if="validateCategories"> 👍</span></button>
      <button style="text-align:left;" class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepGuestRequirements', 'is-completed': validateGuestRequirements}" id="StepGuestRequirements" @click="changeStep($event)">Persyaratan tamu<span v-if="validateGuestRequirements"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepPrice', 'is-completed': $store.state.pricePerPax}" id="StepPrice" @click="changeStep($event)">Harga<span v-if="$store.state.pricePerPax"> 👍</span></button>
      <!-- <button style="text-align:left;" class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepCancellationPolicy', 'is-completed': $store.state.cancellationPolicy != null}" id="StepCancellationPolicy" @click="changeStep($event)">Kebijakan pembatalan<span v-if="$store.state.cancellationPolicy != null"> 👍</span></button> -->
      <button style="text-align:left;" class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepBookingOptions', 'is-completed': validateBookingOptions}" id="StepBookingOptions" @click="changeStep($event)">Opsi pemesanan<span v-if="validateBookingOptions"> 👍</span></button>
      <button class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepAvailability', 'is-completed': validateAvailability}" id="StepAvailability" @click="changeStep($event)">Tanggal ketersediaan<span v-if="validateAvailability"> 👍</span></button>

      <button v-if="$store.state.status && !$store.state.status.isApproved" class="sidebar-link" :class="{'is-active': $store.state.activePage === 'StepReviewSubmit'}" id="StepReviewSubmit" @click="changeStep($event)">Tinjau &amp; Kirim</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeStep(e) {
      this.$store.commit('setActivePage', e.currentTarget.id);
      this.$parent.switchComponent();
    }
  },
  computed: {
    validateWhereWeMeet() {
      if (
        !this.$store.state.whereWeMeet.city ||
        !this.$store.state.whereWeMeet.country ||
        !this.$store.state.whereWeMeet.streetAddress ||
        !this.$store.state.whereWeMeet.zipcode ||
        !this.$store.state.whereWeMeet.locationName
      ) {
        return false;
      }
      return true;
    },
    validateCategories() {
      if (this.$store.state.categoryPrimary === null || this.$store.state.categorySecondary === null) {
        return false;
      }
      if (this.$store.state.categoryPrimary === this.$store.state.categorySecondary) {
        return false;
      }
      return true;
    },
    validateGuestRequirements() {
      if (
        this.$store.state.language != null &&
        this.$store.state.guestRequirements.minimumAge != null &&
        this.$store.state.guestRequirements.kidsAllowed != null &&
        this.$store.state.guestRequirements.servesAlcohol != null &&
        this.$store.state.guestRequirements.requireVerified != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    validateBookingOptions() {
      if (
        this.$store.state.maxDuration != null &&
        this.$store.state.maxGuestCount != null &&
        this.$store.state.bookingOptions.bookBefore != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    validateAvailability() {
      if (this.$store.state.currentAvailabilties.length > 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.is-active {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
}
.is-completed {
  background-color: #d5efec;
  border-color: #d5efec;
}
.status-label-live {
  padding: 5px 8px 5px 8px;
  font-size: 16px;
  color: white;
  background: rgb(5, 175, 56);
  border-radius: 4px;
}
.status-label-draft {
  padding: 5px 8px 5px 8px;
  font-size: 16px;
  color: white;
  background: #888;
  border-radius: 4px;
}
.status-label-rejected {
  padding: 5px 8px 5px 8px;
  font-size: 16px;
  color: white;
  background: rgb(218, 34, 34);
  border-radius: 4px;
}
.status-label-review {
  padding: 5px 8px 5px 8px;
  font-size: 16px;
  color: white;
  background: rgb(216, 166, 30);
  border-radius: 4px;
}
</style>
