<template>
  <div class="info-modal-wrapper">
    <div class="info-modal">
      <div class="content-wrapper">
         <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-column-gap:20px;">
              <div style="max-width:300px; min-width:200px; max-height:450px; min-height:300px; margin:10px;">
                <img src="images/Rhino.jpg" style="object-fit:cover;border-radius:5px;">
                <!-- <p style="margin-top:10px;text-align:center;color:#555;font-size:15px;">Sorot diri Anda terhubung dengan tamu</p> -->
              </div>
              <div style="max-width:300px; min-width:200px; max-height:450px; min-height:300px; margin:10px;">
                <img src="images/Andrina.jpg" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="max-width:300px; min-width:200px; max-height:450px; min-height:300px; margin:10px;">
                <img src="images/Oki.jpg"  style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="max-width:300px; min-width:200px; max-height:450px; min-height:300px; margin:10px;">
                <img src="images/Iboy.jpg" style="object-fit:cover;border-radius:5px;">
              </div>
            </div>
            <h1 class="heading2" style="color:rgba(8, 192, 255, 1);width:100%;text-align:center;margin-top:-20px">{{$t('onboardingText')}}</h1>
            <input type="submit" :value="$t('onBoardingButtonText')" class="submit-button" style="font-size:30px;margin-top:-50px" @click.prevent="$parent.closeOnBoardingModal()" >
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
 
    }
  },
  methods: {
  
  }
}
</script>

<style scoped>
.info-modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 99999;
  display: grid;
  align-items: center;
  justify-items: center;
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.info-modal {
  background-color: #fff;
  width: 95%;
  height: 95%;
  padding: 40px;
  border-radius: 5px;
  animation: 0.3s ease-out 0s 1 slideIn;
}
.title-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-button {
  color: #222;
  position: relative;
  cursor: pointer;
  outline: none;
  top: -25px;
  right: -20px;
  background-color: rgba(0,0,0,0);
}
.close-button:hover {
  color: rgba(8, 192, 255, 1);
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1.0);
    opacity: 1;
  }
}
.content-wrapper {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}

</style>
