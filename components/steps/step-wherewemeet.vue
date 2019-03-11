<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">{{$t('whereWeMeet')}}</h3>
    <p class="paragraph-4">{{$t('whereWeMeetIntro')}}</p>
    <div class="div-block-4">
      <div class="text-block-2" style="margin-bottom:30px;">{{$t('stepProvideAddress')}}</div>
      <div class="text-block-2" style="margin-bottom:10px;">{{$t('country')}}</div>
      <p class="paragraph-3">
        <select name="country" class="menu-dropdown">
          <option value="0">Indonesia</option>
        </select>
      </p>
      <div class="text-block-2" style="margin-bottom:10px;">{{$t('streetAddress')}}</div>
      <p class="paragraph-3" style="margin-bottom:10px;">
        <input type="text" maxlength="50" name="streetAddress" placeholder="E.g. Blk 35, Mandalay Road" class="text-field" style="color:#000;background:#fff" autocomplete="off" v-model="$store.state.whereWeMeet.streetAddress">
      </p>
      <div class="text-block-2" style="margin-bottom:10px;">Apt, Suite, Gedung (opsional)</div>
      <p class="paragraph-3" style="margin-bottom:10px;">
        <input type="text" maxlength="50" name="aptSuiteBuilding" placeholder="E.g. #13-37, Mandalay Towers" class="text-field" style="color:#000;background:#fff" autocomplete="off" v-model="$store.state.whereWeMeet.aptSuiteBuilding">
      </p>
      <div class="city-zipcode-wrapper" style="margin-bottom:10px;">
        <div>
          <div class="text-block-2" style="margin-bottom:10px;">{{$t('city')}}</div>
          <input type="text" maxlength="50" name="city" placeholder="E.g. Jakarta" class="text-field" autocomplete="off" style="color:#000;background:#fff" v-model="$store.state.whereWeMeet.city" readonly>
        </div>
        <div>
          <div class="text-block-2" style="margin-bottom:10px;">{{$t('zipCode')}}</div>
          <input type="text" maxlength="50" name="zipcode" placeholder="E.g. 739013" class="text-field" autocomplete="off" style="color:#000;background:#fff" v-model="$store.state.whereWeMeet.zipcode">
        </div>
      </div>
      <div class="text-block-2" style="margin-bottom:10px;">{{$t('locationName')}}</div>
      <p class="paragraph-3" style="margin-bottom:0px;">
        <input type="text" maxlength="50" name="locationName" placeholder="E.g. My home studio @ Khatib" class="text-field" style="color:#000;background:#fff" autocomplete="off" v-model="$store.state.whereWeMeet.locationName">
      </p>
    </div>
    <div>
      <div class="text-block-2" style="margin-bottom:10px;padding-top:20px;">{{$t('stepConfirmMap')}}</div>
      <div class="map-wrapper" id="map-wrapper"></div>
    </div>
    <div>
      <input type="submit" value="Menyimpan" class="submit-button" @click.prevent="nextClicked" :disabled="validateForm">
    </div>
  </div>
</template>

<script>
import { updateSubmissionField } from "~/services/firebase-service"
import _ from "lodash"

export default {
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  computed: {
    validateForm() {
      if (
        !this.$store.state.whereWeMeet.city ||
        !this.$store.state.whereWeMeet.country ||
        !this.$store.state.whereWeMeet.streetAddress ||
        !this.$store.state.whereWeMeet.zipcode ||
        !this.$store.state.whereWeMeet.locationName
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    nextClicked() {
      updateSubmissionField('whereWeMeet', this.$store.state.whereWeMeet, this.$store.state.submissionId);
      this.$store.commit('setActivePage', 'StepCategory');
      this.$parent.switchComponent();
    },
    fetchCoordinates: _.debounce(function() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: `${this.$store.state.whereWeMeet.streetAddress}, ${this.$store.state.whereWeMeet.city}, ${this.$store.state.whereWeMeet.country}` },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const position = new google.maps.LatLng(lat, lng);
            this.marker.setPosition(position);
            this.map.panTo(position);
            this.$store.commit('setLatLng', {lat: lat, lng: lng});
          }
        }
      );
    }, 1000)
  },
  watch: {
    '$store.state.whereWeMeet.streetAddress'() {
      this.fetchCoordinates();
    }
  },
  mounted() {
    const element = document.getElementById("map-wrapper");
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(this.$store.state.whereWeMeet.lat, this.$store.state.whereWeMeet.lng),
      scroll: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true
    };
    this.map = new google.maps.Map(element, options);

    const position = new google.maps.LatLng(this.$store.state.whereWeMeet.lat, this.$store.state.whereWeMeet.lng);
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      draggable: true
    });
    this.marker.setMap(this.map);
    google.maps.event.addListener(this.marker, 'dragend', (evt) => {
      const lat = this.marker.position.lat();
      const lng = this.marker.position.lng();
      this.$store.commit('setLatLng', {lat: lat, lng: lng});
    });
  }
}
</script>

<style scoped>
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
.city-zipcode-wrapper {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 1fr;
}
.map-wrapper {
  width: 100%;
  height: 450px;
  background-color: #eee;
  border-radius: 5px;
}
</style>
