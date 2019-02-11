<template>
  <div>
    <div class="navbar">
      <div class="logo-wrapper">
        <button @click="openHome" target="_blank" style="outline:none;background:#fff;">
          <img src="images/tickleIcon.png" width="60" alt="Tickle logo" class="logo-img">
        </button>
      </div>
      <div class="menu-wrapper">
        <a href="#" class="link" @click="$parent.toggleInfoModal('tickleExperience')">
         Apa itu pengalaman Tickle?
        </a>
      </div>
      <div class="menu-button">
        <button class="text-block link" style="height:100%;">Pengalaman saya</button>
        <div class="menu">
          <button class="link" @click="createExperience">Ciptakan Pengalaman Anda<i class="fas fa-plus-circle" style="position:absolute;right:28px;padding-top:2px;"></i></button>
          <div v-for="submission in this.$store.state.submissions" :key="submission.submissionId" :submission="submission">
            <hr>
            <div class="menu-item-cell">
              <button class="link menu-item" @click.prevent="openSubmission(submission)">{{submission.title}}<div style="margin-top:10px;"><span :class="{'status-label-draft': submission.status.isDraft, 'status-label-live': submission.status.isApproved, 'status-label-rejected': submission.status.isRejected, 'status-label-review': submission.status.inReview }" >{{submission.status.isDraft ? "Draft" : (submission.status.inReview ? "In Review": (submission.status.isApproved ? "Live": "Rejected"))}}</span></div></button>
              <button title="Remove experience" style="outline:none;background: #fff;" @click.prevent="showdeleteExperience(submission.title, submission)"><i class="fas fa-minus-circle" style="color:red;"></i></button>
            </div>
          </div>
        </div>
      </div>
       <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
      <div class="menu-button">
        <button class="text-block link" style="height:100%;">Pemesanan saya</button>
        <div class="menu">
          <div v-if="this.$store.state.bookingExperiences.length <= 0" style="color:#ccc;padding-left:15px;">Belum ada pemesanan</div>
          <div v-for="(booking, index) in this.$store.state.bookingExperiences" :key="booking.experienceId" :booking="booking">
            <hr v-if="index != 0">
            <div class="menu-item-cell">
            <button @click="openBooking(booking.experienceId)" class="link menu-item">{{booking.experienceData.title}}</button>
              <!-- <button class="link menu-item"><nuxt-link :to = getExperienceBookings(booking.experienceId)>{{booking.experienceData.title}}</nuxt-link></button> -->
              <div>{{booking.count}}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- <a v-if="this.$store.state.user && !this.$store.state.user.settings.payoutMethods" target="_blank" rel="noopener noreferrer" :href=stripeUrl><button class="text-block link">Connect Stripe</button></a> -->
      </div>
      <!-- <div v-if="$store.state.user && !$store.state.user.isVerified">
        <button class="text-block link"  @click.prevent="showVerifyModel=true">Verifikasi akun</button>
      </div> -->
      <div class="email-wrapper">
        <span class="text-block">{{this.$store.state.user && this.$store.state.user.email}}</span>
        <button class="link" style="color:red;margin-left:-5px;" @click="signOut">Keluar</button>
      </div>
    </div>
    <div class="modal-overlay" :hidden="!showDeleteModal">
      <div class="modal-delete-experience">
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showDeleteModal=false"></button>
        <div>
          <h4>{{showDeleteExperienceTitle}}</h4>
          Pengalaman ini akan dihapus secara permanen. Apakah kamu yakin?
        </div>
        <p v-if="showError" style="color: red; margin-top:10px">{{errorMessage}}</p>
        <div><button class="delete-button" style="outline:none;margin-top:30px;margin-bottom:10px;" @click.prevent="deleteExperience()">{{removeButtonTitle}}</button></div>
      </div>
    </div>
    <div class="modal-overlay" :hidden="!showVerifyModel">
      <div v-if="$store.state.user" class="modal-delete-experience">
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showVerifyModel=false"></button>
        <div v-if="!$store.state.user.isVerified">
          <h4>Tambahkan IC untuk memveriifikasi akun Anda.</h4>
         Anda perlu mengunggah foto sisi depan dan belakang IC Anda.
        </div>
         <div v-if="$store.state.user.isVerified">
          <h4 style="color: green;">You have already verified.</h4>
        </div>
        <div v-if="!$store.state.user.isVerified"><button class="submit-button" style="outline:none;margin-top:30px;margin-bottom:10px;" @click.prevent="pickPhoto(0)">{{frontVerifyFile ? "Ditambahkan" : "Depan"}}</button>
        <button class="submit-button" style="outline:none;margin-top:30px;margin-bottom:10px;margin-left:10px" @click.prevent="pickPhoto(1)">{{backVerifyFile ? "Ditambahkan" : "Kembali"}}</button>
        </div>
        <p v-if="showVerifyError" style="color: red; margin:5px">{{verifyErrorMessage}}</p>
        <button v-if="!$store.state.user.isVerified" class="submit-button-solid" style="outline:none;margin-top:30px;margin-bottom:10px;width:100%" @click.prevent="saveAndVerify()">{{verifyButtonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, db} from "~/plugins/firebase";
import { resizeImage } from "~/services/utility";
import { uploadImageToVerification } from '~/services/firebase-service';

export default {
  data() {
    return {
      showDeleteModal: false,
      showVerifyModel: false,
      showVerifyError: false,
      verifyErrorMessage: "",
      verifyButtonText: "Simpan dan Verifikasi",
      showDeleteExperienceTitle: null,
      deleteSubmission: null,
      removeButtonTitle: "Menghapus",
      showError: false,
      errorMessage: "Error",
      verifyPhotoSide: 0,
      frontVerifyFile: null,
      backVerifyFile: null
    }
  },
  methods: {
    async signOut() {
      auth.signOut();
      this.$router.replace("/");
    },
    openHome() {
      this.$router.replace({ path: '/start?step=StepTitle', redirect: '/' })
      location.reload();
    },
    openBooking(id) {
      localStorage.bookingExperienceId = id;
      this.$store.commit('setActivePage', 'Booking');
      this.$store.commit('setBookingExperienceId', id);
      this.$parent.switchComponent();
      // location.reload()
    },
    pickPhoto(side) {
      this.verifyPhotoSide = side;
      this.$refs.picker.click();
      this.showVerifyError = false;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      resizeImage(file, (resizedFilePath, outputFile) => {
        //upload
        if (this.verifyPhotoSide == 0) {
          this.frontVerifyFile = outputFile
        } else {
          this.backVerifyFile = outputFile
        }
      });
    },
    async saveAndVerify() {
      if (!this.frontVerifyFile || !this.backVerifyFile) {
        this.verifyErrorMessage= "Unggah kedua belah pihak."
        this.showVerifyError = true;
        return;
      }
      this.verifyButtonText = "Penghematan..."
      await uploadImageToVerification("front", this.frontVerifyFile);
      await uploadImageToVerification("back", this.backVerifyFile);
      await db.collection("users").doc(this.$store.state.user.userId).update({"isVerified": true});
      location.reload()
    },
    async openSubmission(submission) {
      localStorage.submissionId = submission.submissionId;
      this.$router.replace({ path: '/start?step=StepTitle', redirect: '/' })
      location.reload();
    },
    async createExperience() {
      this.$router.replace({ path: '/start?step=StepTitle', redirect: '/' })
      await this.$store.dispatch('createExperience');
    },
    getExperienceBookings(experienceId) {
      if(this.$router.currentRoute.path.includes("bookings")) {
        return experienceId
      } 
      return "bookings/"+experienceId;
    },
    showdeleteExperience(title, submission) {
      this.showDeleteExperienceTitle = title
      this.showDeleteModal = true
      this.showError = false
      this.deleteSubmission = submission
    },
    async deleteExperience() {
      if (this.deleteSubmission) {
          this.showError = false
          this.removeButtonTitle =  "Menghapus..."
        if (!this.deleteSubmission.status.isApproved) {
          await this.deleteSubmissionCF()
        } else {
          const existingBookings = await db.collection("bookings").where("experienceId", '==', this.deleteSubmission.submissionId).where("hasFinished", "==", false).where("hasBeenCanceled","==", false).get()
          if (existingBookings.empty) {
            await this.deleteSubmissionCF()
          } else {
            this.errorMessage = "Your experience has "+ existingBookings.docs.length+ " future bookings and cannot be removed until its over or canceled"
            this.showError = true;
             this.removeButtonTitle =  "Remove"
          }
        }
      }
    },
    async deleteSubmissionCF() {
        try {
          const body = {
            submissionId: this.deleteSubmission.submissionId,
          };
          await this.$axios.$post(process.env.functionsUrl + "/deleteSubmission", body);
          //localStorage.submissionId = undefined;
          location.reload();
        } catch (error) {
          console.error(error);
          this.errorMessage = error.message;
          this.showError = true;
           this.removeButtonTitle =  "Remove"
        }
    } 
  },
  computed: {
    stripeUrl: function () {
      return "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CtvlrAxzSw8eobieqCrSnFcbjro9kYnG&scope=read_write&redirect_uri="+process.env.functionsUrl+"stripeConnectAccessToken"
    }
  }
};
</script>

<style scoped>
.menu-button {
  position: relative;
  display: inline-block;
  height: 80%;
}
.menu {
  display: none;
  position: absolute;
  top: 60px;
  width: 300px;
  background-color: white;
  z-index: 100;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 30px 20px;
  max-height: 80vh;
  overflow: auto;
}
.menu-item {
  text-align: left;
  max-width: 220px;
  overflow: hidden;
  padding-bottom: 4px;
}
.menu-button:hover .menu {
  display: block;
}
.menu-item-cell {
  display:grid;
  grid-template-columns: 218px auto;
  align-items: center;
}
.status-label-live {
  padding: 5px 8px 5px 8px;
  font-size: 12px;
  color: white;
  background: rgb(5, 175, 56);
  border-radius: 4px;
}
.status-label-draft {
  padding: 5px 8px 5px 8px;
  font-size: 12px;
  color: white;
  background: #888;
  border-radius: 4px;
}
.status-label-rejected {
  padding: 5px 8px 5px 8px;
  font-size: 12px;
  color: white;
  background: rgb(218, 34, 34);
  border-radius: 4px;
}
.status-label-review {
  padding: 5px 8px 5px 8px;
  font-size: 12px;
  color: white;
  background: rgb(216, 166, 30);
  border-radius: 4px;
}
.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.modal-delete-experience {
  position: relative;
  width: 500px;
  margin: auto;
  margin-top: 10vh;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
}
</style>
