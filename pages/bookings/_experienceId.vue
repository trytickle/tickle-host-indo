<template>
  <div style="  margin-left: auto;
   margin-right: auto;" class="container">
        <!-- <NavBar/> -->
    <div style="text-align:center;">
      <h1 class="title is-3">Booking List</h1>
       <h2 class="title is-3" v-if="this.isLoading">Loading...</h2>
    </div>
     <div class="modal-overlay" :hidden="!showCancelModal">
      <div class="modal-delete-booking">
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showCancelModal=false"></button>
        <div>
          <h4>{{cancelTitle}}</h4>
          These bookings will be canceled and refund will be initiated. Are you sure?
        </div>
        <!-- <p v-if="showError" style="color: red; margin-top:10px">{{errorMessage}}</p> -->
        <div><button class="delete-button" style="outline:none;margin-top:30px;margin-bottom:10px;" @click.prevent="cancelAllBookings()">{{cancelButtonTitle}}</button></div>
      </div>
    </div>
    <div class="content" style="margin:20px;">
      <h3 style="margin:auto;margin-bottom:20px;text-align:center;">{{bookings.length > 0 ? bookings[0].experienceData.title : "loading.."}}</h3>
      <div v-for="dates in bookingByDates" :key="dates[0].bookingId" :dates="dates" class="list-item" style="margin:auto;margin-bottom:20px;">
        <div>
          <h3>{{formatDate(dates[0].date)}}</h3>
          <p style="margin-top:-10px;">Time: {{times[timeFormat.indexOf(dates[0].startTime)]}} - {{times[timeFormat.indexOf(dates[0].endTime)]}}</p>
          <button style="float:right; background:red; color:white; padding:4px;" @click="cancelBookings(dates)">Cancel All</button>
          <!-- <p style="margin-top:-15px;">Host: <nuxt-link :to = getProfileLink(submission.aboutHost.hostId)>{{submission.hostName}}</nuxt-link></p> -->
            <h4>Bookings</h4>
           <div v-for="booking in dates" :key="booking.bookingId" :booking="booking" class="list-item" style="margin:auto;margin-bottom:20px;">
              <p style="margin-top:-10px;">{{booking.guestData[0].name}}</p>
              <p style="margin-top:-10px;">{{booking.guestData[0].email}}</p>
               <p style="margin-top:-10px;">Guests coming: {{booking.guestData.length}}</p>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, host } from "~/plugins/firebase";
import moment from "moment";
export default {
  data() {
    return {
      showCancelModal: false,
      cancelButtonTitle: "Cancel and Refund",
      cancelDates: [],
      cancelTitle: "",
      bookings: [],
      bookingByDates: [],
      isLoading: false,
      showModal: false,
      experienceId: "",
      times: ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM","12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"],
      timeFormat : ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    };
  },
  watch: {
    '$store.state.bookingExperienceId'() {
        this.arrangeBookingByAvailability();
    }
  },
  methods: {
    transferClicked(submission) {
      this.showModal = true;
      this.currentSubmissionId = submission.submissionId;
      this.currentSubmissionTitle = submission.title;
    },
    closeModal() {
      this.showModal = false;
    },
    formatDate(dateString) {
      let dates = dateString.split("/");
      const momentDate = moment(dates[0] + "-" + dates[1] + "-" + dates[2]);
      return momentDate.format("DD MMM YYYY")
    },
    cancelBookings(dates) {
      this.cancelDates = dates;
      this.cancelTitle = "Cancel all bookings on "+this.formatDate(dates[0].date)+", "+this.times[this.timeFormat.indexOf(dates[0].startTime)]+"-"+this.times[this.timeFormat.indexOf(dates[0].endTime)]
      this.showCancelModal = true;
      window.scrollTo(0, 0);
    },
    async cancelAllBookings() {
      if (this.cancelDates) {
        this.cancelButtonTitle = "Cancelling..."
        try {
            const body = {
              bookings: this.cancelDates,
              hostId: auth.currentUser.uid
            };
            await this.$axios.$post(process.env.functionsUrl + "/cancelAllBookingsByHost", body);
            location.reload();
          } catch (error) {
            console.error(error);
          }
      }
    },
    arrangeBookingByAvailability() {
      this.bookings =  []
      this.bookingByDates = []
      this.experienceId = localStorage.bookingExperienceId
      this.$store.state.bookings.forEach(booking => {
        if (booking.experienceId == this.experienceId) {
          this.bookings.push(booking);
        }
      });
      this.bookings.sort((a, b) => {
        if (a.availabilityId == b.availabilityId) {
          return 0;
        } else {
          return -1;
        }
      });
      let sameDates = [];
      this.bookings.forEach((booking, index) => {
        if (sameDates.length == 0) {
          sameDates.push(booking);
          if (index == this.bookings.length - 1) {
            this.bookingByDates.push(sameDates);
          }
        } else {
          if (
            sameDates[sameDates.length - 1].availabilityId ==
            booking.availabilityId
          ) {
            sameDates.push(booking);
            if (index == this.bookings.length - 1) {
              this.bookingByDates.push(sameDates);
            }
          } else {
            this.bookingByDates.push(sameDates);
            sameDates = [];
            sameDates.push(booking);
            if (index == this.bookings.length - 1) {
            this.bookingByDates.push(sameDates);
          }
          }
        }
      });
    },
    async reload() {
      if (this.$store.state.bookings && this.$store.state.bookings.length > 0) {
        this.arrangeBookingByAvailability();
      } else {
        await this.$store.dispatch('loadCurrentUser');
        await this.$store.dispatch('loadBookings');
        this.arrangeBookingByAvailability();
        await this.$store.dispatch('createOrLoadSubmissionDoc', { email: this.$store.state.email, name: this.$store.state.firstName });
      }
    }
  },
  async created() { 
    this.arrangeBookingByAvailability();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.reload()
      }
    });
  }
};
</script>

<style scoped>
.list-item {
  padding: 25px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 5px 10px -5px rgba(136, 136, 136, 0.25);
  max-width: 640px;
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
.modal-delete-booking {
  position: relative;
  width: 500px;
  margin: auto;
  margin-top: 10vh;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
}
</style>
