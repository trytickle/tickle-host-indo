<template>
  <div class="info-modal-wrapper">
    <div class="info-modal"> 
    <button class="close-button" @click="$parent.showThankyouModal = false"><i class="fas fa-times fa-2x"></i></button>
    <div class="header-img"><img class="icon-image" src="/images/thankyou-header.png"></div>
      <div class="title-grid">
        <h1 class="heading1" style="margin:0; text-align:center; align:center;">Terima kasih</h1>
      </div>
      <div class="content-wrapper">
        <p>Kami akan meninjau kiriman Anda sesegera mungkin. Sementara itu, silakan unduh aplikasi seluler Tickle dan daftar.</p>
        <div style="margin-top:40px;">
        <a class="submit-button" style="width:300px;margin-left:0px;" target="_blank" href="https://tickle.app.link/qaBW2t6k9M">Pdengunduhan Tickle</a>
        <a class="submit-button" style="width:300px;margin-left:20px;" target="_blank" @click="createExperience">Ciptakan Pengalaman Anda</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        async createExperience() {
        this.$parent.showThankyouModal = false;
        this.$router.replace({ path: '/start?step=StepTitle', redirect: '/' })
        await this.$store.dispatch('createExperience');
        }
    }
}
</script>

<style scoped>
.bg {
  position: relative;
  width: 80%;
  height: 200px;
  min-width: 500px;
  margin-right: 50px;
  align-items: center;
  justify-items: center;
  background: linear-gradient(to bottom right, #2AB4FF, #C2E4F8);
  transform: skew(0,-6deg);
  z-index: +2;
}
.info-modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 500px;
  min-height: 500px;
  background-color: rgba(0,0,0,0.7);
  z-index: 99999;
  display: grid;
  align-items: center;
  justify-items: center;
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.info-modal {
  background-color: #fff;
  width: 50%;
  height: 70%;
  padding: 50px;
  border-radius: 5px;
  animation: 0.3s ease-out 0s 1 slideIn;
}
.title-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.close-button {
  color: #222;
  position: relative;
  cursor: pointer;
  outline: none;
  top: -25px;
  right: -20px;
  float: right;
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
  margin-top: 30px;
  display: grid;
  align-items: left;
  justify-items: left;;
  text-align: left;
}
</style>
