<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{$t('reviewAndSubmit')}}</h3>
    <p class="paragraph-4">{{$t('reviewIntro')}}</p>
    <div class="div-block-4" style="padding-top:40px;padding-bottom:25px;">
      <div class="text-block-2">Jumlah minimum tamu</div>
      <p class="paragraph-3">
       Pengalaman di Tickle memiliki kebijakan minimum 1 tamu. Itu berarti jika satu orang memesan pengalaman Anda, Anda wajib diharapkan untuk menjadi tuan rumah bagi mereka.
      </p>
    </div>
    <div class="text-block-2" style="margin-top:40px;">{{$t('bySubmittingConfirm')}}</div>
    <div class="checkitem-wrapper">
      <label class=container>
        <input type="checkbox" class="default-checkbox" v-model="check1">
        <span class="checkmark"></span>
      </label>
      <div>{{$t('confirmLaw')}}</div>
    </div>
    <div class="checkitem-wrapper">
      <label class=container>
        <input type="checkbox" class="default-checkbox" v-model="check2">
        <span class="checkmark"></span>
      </label>
      <div>{{$t('agreeToTerms')}} <a target="_blank" href="https://trytickle.com/terms-of-service" class="link" style="padding:0;">{{$t('termsOfService')}}</a> Tickle.</div>
    </div>
    <div class="checkitem-wrapper">
      <label class=container>
        <input type="checkbox" class="default-checkbox" v-model="check3">
        <span class="checkmark"></span>
      </label>
      <div>{{$t('confirmCopyright')}}</div>
    </div>
    <div v-if="showError" style="margin-top:20px;margin-bottom:-20px;color:red;">Detail ini tidak ada: {{errorMessage}}</div>
    <input type="submit" :value= buttonTitle class="submit-button" @click.prevent="submitExperience" :disabled="validateChecks">
  </div>
</template>

<script>
import { updateSubmissionField } from "~/services/firebase-service";
import _ from "lodash";

export default {
  data() {
    return {
      check1: false,
      check2: false,
      check3: false,
      errorMessage: null,
      showError: false,
      buttonTitle: this.$t("submitExperience")
    };
  },
  methods: {
    hasError() {
      let errorStrings = [];
      this.showError = false;

      if (this.$store.state.title.length < 10) {
        errorStrings.push("Judul");
      }
      if (this.$store.state.tagline.length < 10) {
        errorStrings.push("Tagline");
      }
      if (this.$store.state.photos[0] === null) {
        errorStrings.push("Foto");
      }
      if (this.$store.state.about.length < 10) {
        errorStrings.push("Tentang saya");
      }
      if (this.$store.state.whatWeDo.length < 10) {
        errorStrings.push("Apa yang akan kami lakukan");
      }
      if (this.$store.state.whatIProvide.length < 10) {
        errorStrings.push("Apa yang akan saya sediakan");
      }
      if (this.$store.state.whereWeBe.length < 10) {
        errorStrings.push("Di mana kami berada");
      }
      if (
        (this.$store.state.whereWeMeet &&
          this.$store.state.whereWeMeet.city === null) ||
        this.$store.state.whereWeMeet.country === null ||
        this.$store.state.whereWeMeet.streetAddress === null ||
        this.$store.state.whereWeMeet.zipcode === null ||
        this.$store.state.whereWeMeet.locationName === null
      ) {
        errorStrings.push("Di mana kami akan bertemu");
      }
      if (this.$store.state.categoryPrimary === null) {
        errorStrings.push("Kategori");
      }
      if (
        (this.$store.state.guestRequirements &&
          this.$store.state.guestRequirements.minimumAge === null) ||
        this.$store.state.guestRequirements.kidsAllowed === null ||
        this.$store.state.guestRequirements.servesAlcohol === null ||
        this.$store.state.guestRequirements.requireVerified === null ||
        this.$store.state.language === null
      ) {
        errorStrings.push("Persyaratan tamu");
      }
      if (this.$store.state.pricePerPax === null) {
        errorStrings.push("Harga");
      }
      if (this.$store.state.cancellationPolicy === null) {
        errorStrings.push("Kebijakan pembatalan");
      }
      if (
        (this.$store.state.bookingOptions &&
          this.$store.state.bookingOptions.bookBefore === null) ||
        this.$store.state.maxGuestCount === null ||
        this.$store.state.maxDuration === null
      ) {
        errorStrings.push("Opsi pemesanan");
      }

      if (
        this.$store.state.user.settings &&
        !this.$store.state.user.settings.payoutMethods
      ) {
        errorStrings.push("Silakan tambahkan metode pembayaran");
      }

      this.errorMessage = errorStrings.join(", ");

      return errorStrings.length > 0 ? true : false;
    },
    async submitExperience() {
      try {
        if (this.hasError()) {
          this.showError = true;
          return;
        }
        this.$store.state.isUploading = true;
        this.buttonTitle = this.$t("submitting") + "...";
        const status = {
          isDraft: false,
          inReview: true,
          isApproved: false,
          isRejected: false
        };
        const createdAt = new Date().getTime();

        await updateSubmissionField(
          "status",
          status,
          this.$store.state.submissionId
        );
        await updateSubmissionField(
          "createdAt",
          createdAt,
          this.$store.state.submissionId
        );
        await updateSubmissionField(
          "lastEdited",
          createdAt,
          this.$store.state.submissionId
        );

        const expTitle =
          _.startCase(this.$store.state.title).trim() +
          " with " +
          this.$store.state.name;
        const context = this.$store;
        const submissionData = {
          submissionId: context.state.submissionId,
          title: context.state.title,
          subtitle: context.state.label,
          tagline: context.state.tagline,
          maxDuration: context.state.maxDuration,
          minDuration: 0,
          languages: [context.state.language],
          whatWeDo: context.state.whatWeDo,
          whatIProvide: context.state.whatIProvide,
          whereWeBe: context.state.whereWeBe,
          maxGuestCount: context.state.maxGuestCount,
          minGuestCount: 0,
          notes: context.state.notes,
          bookingOptions: context.state.bookingOptions,
          cancellationPolicy: context.state.cancellationPolicy,
          categoryPrimary: context.state.categoryPrimary,
          categorySecondary: context.state.categorySecondary,
          currency: context.state.currency,
          guestRequirements: context.state.guestRequirements,
          media: context.state.photos,
          pricePerPax: context.state.pricePerPax,
          whereWeMeet: context.state.whereWeMeet,
          aboutHost: {
            description: context.state.about,
            hostId: context.state.user.userId
          }
        };
        const body = {
          submissionId: this.$store.state.submissionId,
          firstName: this.$store.state.name,
          email: this.$store.state.email,
          submissionData: submissionData
        };
        console.log(body);
        await this.$axios.$post(
          process.env.functionsUrl + "sendSubmissionInReviewEmail",
          body
        );
        this.buttonTitle = this.$t("submitExperience");
        this.$store.state.isUploading = false;
        this.$parent.toggleThankyouModal();
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    validateChecks() {
      if (this.check1 && this.check2 && this.check3) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkitem-wrapper {
  display: grid;
  grid-template-columns: 30px auto;
  grid-column-gap: 10px;
  margin-top: 20px;
}
.default-checkbox {
  position: relative;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: calc(50% - 13px);
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 5px;
}
.container:hover .default-checkbox ~ .checkmark {
  background-color: #ccc;
}
.container .default-checkbox:checked ~ .checkmark {
  background-color: rgba(8, 192, 255, 1);
}
.container .default-checkbox:checked ~ .checkmark {
  background-color: rgba(8, 192, 255, 1);
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.container .default-checkbox:checked ~ .checkmark:after {
  display: block;
}
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
