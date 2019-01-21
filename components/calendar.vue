<template>
<div>
  <div class="calendar">
    <div>
      <div class="calendar-header">
        <div style="text-align:center;"><i class="fa fa-fw fa-chevron-left" @click="subtractMonth"></i></div>
        <div style="text-align:center;"><h4>{{month + ' ' + year}}</h4></div>
        <div style="text-align:center;"><i class="fa fa-fw fa-chevron-right" @click="addMonth"></i></div>
      </div>
      <div class="weekdays">
        <div v-for="day in days" :key="day + '-label'" style="padding:2px 0;text-align:center;">{{day}}</div>
      </div>
      <div class="dates">
        <div v-for="blank in firstDayOfMonth" :key="blank" style="padding:2px 0;text-align:center;"></div>
        <div v-for="date in daysInMonth" :key="date + '-label'" style="padding:2px 0;text-align:center;" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}">
          <div @mouseover="getAvailabilitiesOnDate(date,month,year)" :class="checkIfDateExists(date, month, year) ? 'date-cell-selected' : (checkIfAvailabilityExists(date, month, year) ? 'date-cell-contains-availability' :  'date-cell-unselected')">
            <div @click="dateSelected(date)">{{date}}</div>
            <div class="date-cell-dropdown-menu" style="cursor:default;">
              <b>{{date}} {{month}}</b>
              <hr>
              <div v-for="avail in hoverdAvails" :key="avail.availabilityId" >
                <div style="display:grid;grid-template-columns:auto 40px;margin-bottom:5px;cursor:pointer;outline:none;" @click.prevent="setEditAvailability(avail)">
                  <div >{{avail.startTime}}</div>
                  <div style="color:rgba(8, 192, 255, 1);text-align:right;">Edit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <hr>
      <div class="calendar-header">
        <div></div>
        <div style="text-align:center;"><h4>{{month1 + ' ' + year1}}</h4></div>
        <div></div>
      </div>
      <div class="weekdays">
        <div v-for="day in days" :key="day + '-label'" style="padding:2px 0;text-align:center;">{{day}}</div>
      </div>
      <div class="dates">
        <div v-for="blank in firstDayOfNextOneMonth" :key="blank" style="padding:2px 0;text-align:center;"></div>
        <div v-for="date in daysInNextOneMonth" :key="date + '-label'" style="padding:2px 0;text-align:center;" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}">
          <div @mouseover="getAvailabilitiesOnDate(date, month1, year1)" :class="checkIfDateExists(date, month1, year1) ? 'date-cell-selected' : (checkIfAvailabilityExists(date, month1, year1) ? 'date-cell-contains-availability' :  'date-cell-unselected')">
            <div @click="dateSelectedOneMonth(date)">{{date}}</div>
            <div class="date-cell-dropdown-menu" style="cursor:default;">
              <b>{{date}} {{month1}}</b>
              <hr>
              <div v-for="avail in hoverdAvails" :key="avail.availabilityId" >
                <div style="display:grid;grid-template-columns:auto 40px;margin-bottom:5px;cursor:pointer;outline:none;" @click.prevent="setEditAvailability(avail)">
                  <div >{{avail.startTime}}</div>
                  <div style="color:rgba(8, 192, 255, 1);text-align:right;">Edit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <hr>
      <div class="calendar-header">
        <div></div>
        <div style="text-align:center;"><h4>{{month2 + ' ' + year2}}</h4></div>
        <div></div>
      </div>
      <div class="weekdays">
        <div v-for="day in days" :key="day + '-label'" style="padding:2px 0;text-align:center;">{{day}}</div>
      </div>
      <div class="dates">
        <div v-for="blank in firstDayOfNextTwoMonth" :key="blank" style="padding:2px 0;text-align:center;"></div>
        <div v-for="date in daysInNextTwoMonth" :key="date + '-label'" style="padding:2px 0;text-align:center;" :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}">
          <div @mouseover="getAvailabilitiesOnDate(date, month2, year2)" :class="checkIfDateExists(date, month2, year2) ? 'date-cell-selected' : (checkIfAvailabilityExists(date, month2, year2) ? 'date-cell-contains-availability' :  'date-cell-unselected')">
            <div @click="dateSelectedTwoMonth(date)">{{date}}</div>
            <div class="date-cell-dropdown-menu" style="cursor:default;">
              <b>{{date}} {{month2}}</b>
              <hr>
              <div v-for="avail in hoverdAvails" :key="avail.availabilityId" >
                <div style="display:grid;grid-template-columns:auto 40px;margin-bottom:5px;cursor:pointer;outline:none;" @click.prevent="setEditAvailability(avail)">
                  <div >{{avail.startTime}}</div>
                  <div style="color:rgba(8, 192, 255, 1);text-align:right;">Edit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="modal-overlay" :hidden="!showEditModel">
      <div class="modal-edit-availability">
        <h4>Tetapkan detail ketersediaan</h4>
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;background:#fff" @click.prevent="showEditModel=false"></button>
        <hr>
        <form v-on:submit.prevent="" style="margin-top:20px;">
          <div>Jam berapa itu mulai?</div>
          <select v-model="editAvailabilityStarttime" class="menu-dropdown">
            <option v-for="time in times" :key="time">
              {{ time }}
            </option>
          </select>
          <div style="margin-top:5px;">Jam berapa ini berakhir?</div>
          <select v-model="editAvailabilityEndTime" class="menu-dropdown">
            <option v-for="time in times" :key="time">
              {{ time }}
            </option>
          </select>
          <div style="margin-top:5px;">Berapa biayanya untuk setiap tamu?</div>
          <input type="number" min="10" step="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="editAvailabilityPrice" class="text-field" style="margin-top:5px;" placeholder="SGD"/>
          <div style="margin-top:5px;">Berapa banyak tamu yang dapat Anda akomodasi di sesi ini?</div>
          <select v-model="editAvailabilityGuestCount" class="menu-dropdown">
            <option v-for="guest in guests" :key="guest">
              {{ guest }}
            </option>
          </select>
          <div style="margin-top:20px;color:red;" v-if="showError">{{errorMessage}}</div>
          <div>
            <button class="submit-button" style="outline:none;margin-top:30px;" @click.prevent="saveAvailability">Save</button>
            <button class="delete-button" style="outline:none;margin-top:30px;margin-left:20px;" @click.prevent="deleteAvailability">{{deleteText}}</button>
          </div>
        </form>
      </div>
    </div>
</div>
</template>

<script>
import moment from "moment";
import { db } from "~/plugins/firebase";
export default {
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      showEditModel: false,
      showError: false,
      errorMessage: "",
      editAvailabilityStarttime: undefined,
      editAvailabilityEndTime: undefined,
      editAvailabilityGuestCount: undefined,
      editAvailabilityPrice: undefined,
      deleteText: "Menghapus",
      nextOneMonthContext: moment().add(1, "months"),
      nextTwoMonthContext: moment().add(2, "months"),
      hoverdAvails: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      guests: ["1","2","3","4","5","6","7","8","9","10", "11", "12", "13", "14", "15", "16","17", "18", "19", "20"],
      times: ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM","12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"],
      timeFormat : ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
    };
  },
  methods: {
    checkIfDateExists(date, month, year) {
        let match = false;
        let now = moment(year+"-"+month+"-"+ date, "YYYY-MMM-DD");
        this.$store.state.selectedDates.forEach(d => {
            if (d.valueOf() == now.valueOf()) { match = true}
        })
        return match
    },
    getAvailabilitiesOnDate(date, month, year) {
        this.hoverdAvails = []
        let now = moment(year+"-"+month+"-"+ date,  "YYYY-MMM-DD").format("YYYY/MM/DD");
        this.$store.state.currentAvailabilties.forEach(d => {
            if (d.date == now) {
              this.hoverdAvails.push(d)
            }
        })
    },
    checkIfAvailabilityExists(date, month, year) {
        let match = false;
        let now = moment(year+"-"+month+"-"+ date,  "YYYY-MMM-DD").format("YYYY/MM/DD");
        this.$store.state.currentAvailabilties.forEach(d => {
            if (d.date == now) { match = true}
        })
        return match
    },
    setEditAvailability(avail) {
      this.showEditModel = true
      this.editAvailabilityId = avail.availabilityId
      this.editAvailabilityStarttime = this.times[this.timeFormat.indexOf(avail.startTime)]
      this.editAvailabilityEndTime = this.times[this.timeFormat.indexOf(avail.endTime)]
      this.editAvailabilityGuestCount = avail.spotsLeft+""
      this.editAvailabilityPrice = avail.price/100
      console.log(this.editAvailabilityId)

    },
    async saveAvailability() {
       if (this.editAvailabilityStarttime.length <= 0) {
        this.errorMessage = "Enter a valid start time.";
        this.showError = true;
        return;
      }
     if (this.editAvailabilityEndTime.length <= 0) {
        this.errorMessage = "Enter a valid end time."
        this.showError = true
        return
      }  
     if (this.times.indexOf(this.editAvailabilityStarttime) >= this.times.indexOf(this.editAvailabilityEndTime)) {
        this.errorMessage = "End time must be ahead of Start time"
        this.showError = true
        return
      }
     if (!this.editAvailabilityPrice || this.editAvailabilityPrice.length < 2) {
         this.errorMessage = "Price must be $10 or above."
         this.showError = true
        return
      }
      let obj = {
        startTime: this.timeFormat[this.times.indexOf(this.editAvailabilityStarttime)],
        endTime: this.timeFormat[this.times.indexOf(this.editAvailabilityEndTime)],
        price: this.editAvailabilityPrice * 100,
        spotsLeft: this.editAvailabilityGuestCount * 1,
      }
      console.log(obj)
      const res = await db.collection("submissions").doc(localStorage.submissionId).collection("availability").doc(this.editAvailabilityId).update(obj)
      console.log(res)
      location.reload()

    },
    async deleteAvailability() {
      const body = {
        submissionId: localStorage.submissionId,
        availabilityIds : [this.editAvailabilityId]
      }
       try {
        this.deleteText = "Menghapus..."
        await this.$axios.$post(
          process.env.functionsUrl + "/deleteSubmissionAvailability",
          body
        );
        if (localStorage.isApproved === 'true') {
          await this.$store.dispatch('saveSubmissionAndExperience')
        }
        this.deleteText = "Menghapus"
        location.reload();
      } catch (error) {
        this.deleteText = "Menghapus"
        this.errorMessage = error.message;
        this.showError = true;
      }
    },
    addMonth() {
      this.dateContext = moment(this.dateContext).add(1, "month");
      this.nextOneMonthContext = moment(this.nextOneMonthContext).add(1, "month");
      this.nextTwoMonthContext = moment(this.nextOneMonthContext).add(1, "month");
    },
    subtractMonth() {
      if (this.today.diff(this.dateContext) < 0) {
        this.dateContext = moment(this.dateContext).subtract(1, "month");
        this.nextOneMonthContext = moment(this.nextOneMonthContext).subtract(
          1,
          "month"
        );
        this.nextTwoMonthContext = moment(this.nextTwoMonthContext).subtract(
          1,
          "month"
        );
      }
    },
    dateSelected(date) {
      const momentDate = moment(this.year + "-" + this.month + "-" + date,  "YYYY-MMM-DD");
      if (this.checkIfDateExists(date, this.month, this.year)) {
        this.$store.commit('removeSelectedDate', momentDate);
      } else {
        this.$store.commit('addSelectedDate', momentDate) ;
      }
    },
    dateSelectedOneMonth(date) {
    const momentDate = moment(this.year1 + "-" + this.month1 + "-" + date,  "YYYY-MMM-DD");
      if (this.checkIfDateExists(date, this.month1, this.year1)) {
        this.$store.commit('removeSelectedDate', momentDate);
      } else {
        this.$store.commit('addSelectedDate', momentDate);
      }
    },
    dateSelectedTwoMonth(date) {
      const momentDate = moment(this.year2 + "-" + this.month2 + "-" + date,  "YYYY-MMM-DD");
      if (this.checkIfDateExists(date, this.month2, this.year2)) {
        this.$store.commit('removeSelectedDate', momentDate);
      } else {
        this.$store.commit('addSelectedDate', momentDate);
      }
    }
  },
  computed: {
    year() {
      return this.dateContext.format("Y");
    },
    year1() {
      return this.nextOneMonthContext.format("Y");
    },
    year2() {
      return this.nextTwoMonthContext.format("Y");
    },
    month() {
      return this.dateContext.format("MMM");
    },
    month1() {
      return this.nextOneMonthContext.format("MMM");
    },
    month2() {
      return this.nextTwoMonthContext.format("MMM");
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    daysInNextOneMonth() {
      return this.nextOneMonthContext.daysInMonth();
    },
    daysInNextTwoMonth() {
      return this.nextTwoMonthContext.daysInMonth();
    },
    currentDate() {
      return this.dateContext.get("date");
    },
    firstDayOfMonth() {
      const firstDay = moment(this.dateContext).subtract(
        this.currentDate - 1,
        "days"
      );
      return firstDay.weekday();
    },
    firstDayOfNextOneMonth() {
      const firstDay = moment(this.nextOneMonthContext).subtract(
        this.currentDate - 1,
        "days"
      );
      return firstDay.weekday();
    },
    firstDayOfNextTwoMonth() {
      const firstDay = moment(this.nextTwoMonthContext).subtract(
        this.currentDate - 1,
        "days"
      );
      return firstDay.weekday();
    },
    initialDate() {
      return this.today.get("date");
    },
    initialMonth() {
      return this.today.format("MMM");
    },
    initialYear() {
      return this.today.format("Y");
    }
  }
};
</script>

<style scoped>
.calendar {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.calendar-header {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.dates {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.date-cell-unselected {
  background-color: white;
  color: black;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 20px;
  margin-left: 5px;
}
.date-cell-unselected:hover {
  background-color: #eee;
}
.date-cell-selected {
  background-color: rgb(24, 163, 255);
  color: white;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 20px;
  margin-left: 5px;
}
.date-cell-selected:hover {
  background-color: rgba(24, 163, 255, 0.8);
}
.date-cell-contains-availability {
  background-color: rgb(255, 115, 0);
  color: white;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 20px;
  margin-left: 5px;
}
.date-cell-contains-availability:hover {
  background-color: rgb(255, 140, 45);
}
.date-cell-dropdown-menu {
  display: none;
  position: absolute;
  width: 200px;
  max-height: 300px;
  margin-top: 5px;
  margin-left: -20px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  z-index: 100;
  border: 1px solid #ddd;
  text-align: left;
}
.date-cell-contains-availability:hover .date-cell-dropdown-menu {
  display: block;
  color: black;
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
</style>
