<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Availability dates</h3>
    <div class="availability-content">
      <Calendar></Calendar>
      <div style="padding-left:30px;">
        <div><h4>Select dates</h4></div>
        <div v-if="this.$store.state.selectedDates.length <= 0" style="color:#888;margin-top:15px;">Please select some dates on the calendar</div>
        <div style="margin-top:10px;">
          <li class="date-tag" v-for="date in this.$store.state.selectedDates" @click="dateClicked(date)" :key="date">
            {{convertDateToString(date)}}
            <i class="fas fa-times" style="padding-left:10px;"></i>
          </li>
        </div>
        <div v-if="this.$store.state.selectedDates.length > 0" style="margin-top:30px;">
          <hr>
          <h4>Set availability details</h4>
          <form v-on:submit.prevent="" style="margin-top:20px;">
            <div>What time does it start?</div>
            <select v-model="startTime" class="menu-dropdown">
              <option v-for="time in times" :key="time">
                {{ time }}
              </option>
            </select>
            <div style="margin-top:5px;">What time does it end?</div>
            <select v-model="endTime" class="menu-dropdown">
              <option v-for="time in times" :key="time">
                {{ time }}
              </option>
            </select>
            <div style="margin-top:5px;">How much does it cost for each guest?</div>
            <input type="number" min="10" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  v-model="price" class="text-field" style="margin-top:5px;" placeholder="SGD" spellcheck="false"/>
            <div style="margin-top:5px;">How many guests can you accommodate in this session?</div>
            <select v-model="guestCount" class="menu-dropdown">
              <option v-for="guest in guests" :key="guest">
                {{ guest }}
              </option>
            </select>
            <div style="margin-top:20px;color:red;" v-if="showError">{{errorMessage}}</div>
            <div><button class="submit-button" style="outline:none;margin-top:30px;" @click.prevent="addAvailabilities">{{addAvailabilityButtonText}}</button></div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-overlay" :hidden="!showEditModal">
      <div class="modal-edit-availability">
        <h4>Edit availability</h4>
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="editAvail=undefined"></button>
        <hr>
        <form v-on:submit.prevent="" style="margin-top:20px;">
          <div>What time does it start?</div>
          <select v-model="startTime" class="menu-dropdown">
            <option v-for="time in times" :key="time">
              {{ time }}
            </option>
          </select>
          <div style="margin-top:5px;">What time does it end?</div>
          <select v-model="endTime" class="menu-dropdown">
            <option v-for="time in times" :key="time">
              {{ time }}
            </option>
          </select>
          <div style="margin-top:5px;">How much does it cost for each guest?</div>
          <input type="number" min="10" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="price" class="text-field" style="margin-top:5px;" placeholder="SGD"/>
          <div style="margin-top:5px;">How many guests can you accommodate in this session?</div>
          <select v-model="guestCount" class="menu-dropdown">
            <option v-for="guest in guests" :key="guest">
              {{ guest }}
            </option>
          </select>
          <div style="margin-top:20px;color:red;" v-if="showError">{{errorMessage}}</div>
          <div>
            <button class="submit-button" style="outline:none;margin-top:30px;" @click.prevent="">Save</button>
            <button class="delete-button" style="outline:none;margin-top:30px;margin-left:20px;" @click.prevent="">Remove</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/calendar.vue";
import { db } from "~/plugins/firebase";
import moment from "moment";

export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      guestCount: "10",
      price : undefined,
      errorMessage : "",
      showError : false,
      addAvailabilityButtonText : "Add Availability",
      guests: ["1","2","3","4","5","6","7","8","9","10", "11", "12", "13", "14", "15", "16","17", "18", "19", "20"],
      times: ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM","12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"],
      timeFormat : ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
      showEditModal: false
    };
  },
  components: {
    Calendar
  },
  methods: {
    dateClicked(date) {
      this.showError = false;
      this.$store.commit(
        "removeSelectedDate",
        date
      );
    },
    convertDateToString(date) {
      return moment(date).format("D MMM");
    },
    async addAvailabilities() {
      let dates = [];
      this.errorMessage = "";
      this.showError = false;
      this.$store.state.selectedDates.forEach(date => {
        dates.push(date.format("YYYY/MM/DD"));
      });
      if (this.startTime.length <= 0) {
        this.errorMessage = "Enter a valid start time.";
        this.showError = true;
        return;
      }
     if (this.endTime.length <= 0) {
        this.errorMessage = "Enter a valid end time.";
        this.showError = true;
        return;
      }  
     if (this.times.indexOf(this.startTime) >= this.times.indexOf(this.endTime)) {
        this.errorMessage = "End time must be ahead of start time.";
        this.showError = true;
        return;
      }
     if (!this.price || this.price.length < 2) {
         this.errorMessage = "Price must be $10 or above.";
         this.showError = true;
        return;
      }
      const body = {
        startTime: this.timeFormat[this.times.indexOf(this.startTime)],
        endTime: this.timeFormat[this.times.indexOf(this.endTime)],
        price: this.price * 100,
        guestCount: this.guestCount * 1,
        dates: dates,
        submissionId: localStorage.submissionId
      };
      try {
        this.addAvailabilityButtonText = "Adding...";
        await this.$axios.$post(
          process.env.functionsUrl + "/createSubmissionAvailability",
          body
        );
        if (localStorage.isApproved) {
          await this.$store.dispatch('saveSubmissionAndExperience')
        }
        location.reload();
      } catch (error) {
        this.addAvailabilityButtonText = "Add Availability";
        this.errorMessage = error.message;
        this.showError = true;
      }
    },
    removeAvailability() {
      
    }
  },
  mounted() {
    this.$store.dispatch("loadAvailabilities");
  }
};
</script>

<style scoped>
.availability-content {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50% auto;
}
.date-tag {
  display: inline-block;
  margin-top: 5px;
  margin-right: 5px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 20px;
  text-align: center;
  color: white;
  background-color: rgb(24, 163, 255);
  cursor: pointer;
}
.date-tag:hover {
  background-color: rgba(24, 163, 255, 0.8);
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
  margin-top: 10px;
  margin-bottom: 10px;
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
.modal-edit-availability {
  position: relative;
  width: 500px;
  margin: auto;
  margin-top: 10vh;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
}
</style>
