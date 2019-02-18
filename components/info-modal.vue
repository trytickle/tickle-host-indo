<template>
  <div class="info-modal-wrapper">
    <div class="info-modal">
      <div class="title-grid">
        <h1 class="heading1" style="margin:0;">{{modalTitle}}</h1>
        <button class="close-button" @click="$parent.showInfoModal = false"><i class="fas fa-times fa-2x"></i></button>
      </div>
      <div class="content-wrapper">
        <component :is="modalComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoStandards from "~/components/modals/photo-standards.vue";
import TickleExperience from "~/components/modals/tickle-experience.vue";

export default {
  props: [
    'title'
  ],
  computed: {
    modalTitle() {
      switch (this.title) {
        case 'photoStandards': return '';
        case 'tickleExperience': return '';
        default: return 'Heal the world, make it a better place';
      }
    },
    modalComponent() {
      switch (this.title) {
        case 'photoStandards': return PhotoStandards;
        case 'tickleExperience': return TickleExperience;
        default: return PhotoStandards;
      }
    }
  },
  components: [
    PhotoStandards,
    TickleExperience
  ]
}
</script>

<style scoped>
.info-modal-wrapper {
  position: absolute;
  width: 100%;
  height: 102%;
  background-color: rgba(0,0,0,0.7);
  z-index: 99999;
  display: grid;
  align-items: center;
  justify-items: center;
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.info-modal {
  background-color: #fff;
  width: 80%;
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
  height: calc(100% - 70px);
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
