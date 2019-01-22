<template>
  <div class="infobar">
    <div class="device-wrapper">
      <div class="div-block-6 headerSection" id="top">
        <div class="header-text-wrapper">
          <div class="text-block-4">{{$store.state.label.toUpperCase() ? $store.state.label.toUpperCase() : 'Label'}}</div>
          <h2 class="heading-4">{{$store.state.title ? $store.state.title : 'A new experience'}}</h2>
          <div class="text-block-4">{{$store.state.whereWeMeet.locationName ? $store.state.whereWeMeet.locationName : "Di mana kami akan bertemu"}}</div>
          <div class="text-block-4">{{$store.state.maxDuration ? durationString : 'Lamanya'}}</div>
          <div class="text-block-4">{{$store.state.tagline ? $store.state.tagline : 'Tagline'}}</div>
          <div class="text-block-4">{{$store.state.language ? $store.state.language : 'Bahasa'}}</div>
        </div>
        <div class="image-wrapper" v-if="this.photos[currentPhoto] !== null"><img v-if="!this.photos[currentPhoto].includes('.mp4')" :src="this.photos[currentPhoto]" alt="photo"> <video  class="video" v-if="this.photos[currentPhoto].includes('.mp4')" ref="videoRef" :src="$store.state.photos[1]" id="video-container" muted loop autoplay></video></div>
        <div class="image-gallery-arrow-left" @click="galleryLeftClicked" v-if="showLeftArrow"><i class="fas fa-chevron-left fa-2x"></i></div>
        <div class="image-gallery-arrow-right" @click="galleryRightClicked" v-if="showRightArrow"><i class="fas fa-chevron-right fa-2x"></i></div>
      </div>
      <div class="content-section" id="about">
        <h4 class="content-heading">Tentang saya</h4>
        <p class="paragraph-5" style="margin-top:-10px;white-space:pre-wrap;">{{$store.state.about ? $store.state.about : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'}}</p>
        <div class="div-block-8"></div>
      </div>
      <div class="content-section" id="whatWeDo">
        <h4 class="content-heading">Apa yang akan kami lakukan</h4>
        <p class="paragraph-5" style="margin-top:-10px;white-space:pre-wrap;">{{$store.state.whatWeDo ? $store.state.whatWeDo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'}}</p>
        <div class="div-block-8"></div>
      </div>
      <div class="content-section" id="whatIProvide">
        <h4 class="content-heading">Apa yang akan saya sediakan</h4>
        <p class="paragraph-5" style="margin-top:-10px;white-space:pre-wrap;">{{$store.state.whatIProvide ? $store.state.whatIProvide : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'}}</p>
        <div class="div-block-8"></div>
      </div>
      <div class="content-section" id="notes">
        <h4 class="content-heading">Catatan</h4>
        <p class="paragraph-5" style="margin-top:-10px;white-space:pre-wrap;">{{$store.state.notes ? $store.state.notes : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'}}</p>
        <div class="div-block-8"></div>
      </div>
      <div class="content-section" id="whereWeBe">
        <h4 class="content-heading">Di mana kami berada</h4>
        <p class="paragraph-5" style="margin-top:-10px;white-space:pre-wrap;">{{$store.state.whereWeBe ? $store.state.whereWeBe : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.'}}</p>
        <div class="div-block-8"></div>
      </div>
      <div style="margin-top:-1px;" id="whereWeMeet">
        <div class="map-wrapper">
          <div class="map-item" id="map-item" v-if="isLatLngAvailable"></div>
          <div class="map-item-label">
            <div class="map-label">
              <strong style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{$store.state.whereWeMeet.locationName ? $store.state.whereWeMeet.locationName : 'Location name'}}</strong>
              <br/>
              <span style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#888;">{{$store.state.whereWeMeet.streetAddress ? $store.state.whereWeMeet.streetAddress : 'Street address'}}</span>
            </div>
            <i class="fas fa-map-pin fa-2x" style="color:red;margin-top:-30px;"></i>
          </div>
        </div>
      </div>
      <div class="content-section">
        <h4 class="heading-5">Ukuran grup {{guestCountString}}</h4>
        <div class="div-block-8"></div>
      </div>
      <div class="content-section">
        <h4 class="heading-5">{{cancellationPolicyTitle}}</h4>
        <p class="paragraph-5" style="margin-top:-30px;">{{cancellationPolicyDescription}}</p>
        <div class="div-block-8"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPhoto: 0,
      showLeftArrow: false,
      showRightArrow: false,
      photos: [null],
      map: null
    }
  },
  watch: {
    '$store.state.photos'() {
      this.photos = this.$store.state.photos.filter(photo => { return photo !== null });
      if (this.photos.length === 0) {
        this.photos[0] = null;
        return;
      }
      if (this.photos.length <= 1) {
        this.currentPhoto = 0;
        this.showLeftArrow = false;
        this.showRightArrow = false;
      } else if (this.photos.length > 1 && this.photos.length < 10) {
        if (this.currentPhoto === 0) {
          this.showLeftArrow = false;
          this.showRightArrow = true;
        } else if (this.currentPhoto >= 1 && this.currentPhoto < (this.photos.length - 1)) {
          this.showLeftArrow = true;
          this.showRightArrow = true;
        } else if (this.currentPhoto === (this.photos.length - 1)) {
          this.showLeftArrow = true;
          this.showRightArrow = false;
        }
      }
      if (this.currentPhoto > (this.photos.length - 1) && (this.currentPhoto != 0)) {
        this.currentPhoto = this.photos.length - 1;
      }
    },
    '$store.state.whereWeMeet.lat'() {
      const position = new google.maps.LatLng(this.$store.state.whereWeMeet.lat, this.$store.state.whereWeMeet.lng);
      this.map.panTo(position);
    },
    '$store.state.activePage'() {
      switch (this.$store.state.activePage) {
        case 'StepTitle': this.scrollTo('top'); break;
        case 'StepTagline': this.scrollTo('top'); break;
        case 'StepPhotos': this.scrollTo('top'); break;
        case 'StepAbout': this.scrollTo('about'); break;
        case 'StepWhatWeDo': this.scrollTo('whatWeDo'); break;
        case 'StepWhatIProvide': this.scrollTo('whatIProvide'); break;
        case 'StepWhereWeBe': this.scrollTo('whereWeBe'); break;
        case 'StepNotes': this.scrollTo('notes'); break;
        case 'StepWhereWeMeet': this.scrollTo('whereWeMeet'); break;
      }
    }
  },
  methods: {
    galleryLeftClicked() {
      if (this.currentPhoto >= 0) {
        this.currentPhoto--;
      }
      if (this.currentPhoto === 0 && this.photos.length > 1) {
        this.showRightArrow = true;
        this.showLeftArrow = false;
      } else {
        this.showRightArrow = true;
        this.showLeftArrow = true;
      }
    },
    galleryRightClicked() {
      if (this.currentPhoto <= (this.photos.length - 1)) {
        this.currentPhoto++;
      }
      if (this.currentPhoto === (this.photos.length - 1)) {
        this.showRightArrow = false;
        this.showLeftArrow = true;
      } else {
        this.showRightArrow = true;
        this.showLeftArrow = true;
      }
    },
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
  },
  created() {
    if (this.$store.state.photos.filter(photo => { return photo !== null }).length > 1) {
      this.showRightArrow = true;
    }
  },
  mounted() {
    const element = document.getElementById("map-item");
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(this.$store.state.whereWeMeet.lat, this.$store.state.whereWeMeet.lng),
      scroll: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false
    };
    this.map = new google.maps.Map(element, options);
  },
  computed: {
    durationString() {
      if (this.$store.state.maxDuration === 1) {
        return this.$store.state.maxDuration + " hour";
      } else if (this.$store.state.maxDuration > 1) {
        return this.$store.state.maxDuration + " hours";
      }
    },
    guestCountString() {
      if (this.$store.state.maxGuestCount === 1) {
        return " up to " + this.$store.state.maxGuestCount + " guest";
      } else if (this.$store.state.maxGuestCount > 1) {
        return " up to " + this.$store.state.maxGuestCount + " guests";
      }
    },
    cancellationPolicyTitle() {
      if (this.$store.state.cancellationPolicy === null) {
        return 'Kebijakan pembatalan';
      } else {
        switch (this.$store.state.cancellationPolicy) {
          case 0: return 'Kebijakan pembatalan fleksibel'; break;
          case 1: return 'Kebijakan pembatalan moderat'; break;
          case 2: return 'Kebijakan pembatalan ketat'; break;
        }
      }
    },
    cancellationPolicyDescription() {
      if (this.$store.state.cancellationPolicy === null) {
        return 'Deskripsi kebijakan yang dipilih.';
      } else {
        switch (this.$store.state.cancellationPolicy) {
          case 0: return 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 24 jam sebelum dimulai.'; break;
          case 1: return 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 5 hari sebelum dimulai.'; break;
          case 2: return 'Pengalaman ini dapat dibatalkan dan uang dikembalikan sepenuhnya hingga 7 hari sebelumnya. Pengembalian sebesar 50% apabila pembatalan dilakukan dalam 7 hari.'; break;
        }
      }
    },
    isLatLngAvailable() {
      if (this.$store.state.whereWeMeet.lat && this.$store.state.whereWeMeet.lng) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
.headerSection {
  position: relative;
  width: 100%;
  height: 650px;
  padding: 40px 40px 30px;
  background-image: -webkit-linear-gradient(321deg, #e706e7 -1%, #e706e7 0%, #e706e7 0, #bf15f5 0, #bf15f5 18%, #f34769 98%);
  background-image: linear-gradient(129deg, #e706e7 -1%, #e706e7 0%, #e706e7 0, #bf15f5 0, #bf15f5 18%, #f34769 98%);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}
.image-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.header-text-wrapper {
  position: relative;
  z-index: 1;
}
.device-wrapper {
  position: relative;
  overflow: scroll;
  height: 100%;
  padding: 0px 0px 80px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  box-shadow: 0 10px 20px -9px rgba(0, 0, 0, .15);
}
.image-gallery-arrow-right {
  position: absolute;
  right: 10px;
  top: calc(100% / 2);
  color: rgba(255,255,255,0.2);
}
.image-gallery-arrow-right:hover {
  color: rgba(255,255,255,0.8);
  cursor: pointer;
}
.image-gallery-arrow-left {
  position: absolute;
  left: 10px;
  top: calc(100% / 2);
  color: rgba(255,255,255,0.2);
}
.image-gallery-arrow-left:hover {
  color: rgba(255,255,255,0.8);
  cursor: pointer;
}
.map-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: #eee url(/images/map.png) 93% 90%;
  background-repeat: no-repeat;
}
.map-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(8, 192, 255, 0.5);
  display: grid;
  align-items: center;
  justify-items: center;
}
.map-item-label {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}
.map-label {
  position: absolute;
  max-width: 80%;
  max-height: 60px;
  margin-top: -150px;
  background-color: white;
  color: black;
  padding: 10px 15px 10px 15px;;
  border-radius: 8px;
}
.map-label:after {
  content:'';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  width: 0;
  height: 0;
  border-top: solid 8px #fff;
  border-left: solid 8px transparent;
  border-right: solid 8px transparent;
}
.video {
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
