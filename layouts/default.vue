<template>
  <div>
    <div class="warning-modal">
      <img src="images/tickleIcon.png" width="80" alt="Tickle logo" class="logo-img"><br><br>
      Maaf, ukuran tampilan Anda saat ini tidak didukung.
      <br><br>
      Silakan gunakan browser desktop Anda untuk melihat aplikasi web ini.
    </div>
    <nuxt/>
  </div>
</template>

<style scoped>
.warning-modal {
  padding: 50px 30px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 99;
  margin: auto;
  text-align: center;
  position: absolute;
  font-size: 25px;
  line-height: 30px;
  color: #333;
  min-width: 100vw;
  display: none;
}

@media screen and (max-width: 640px) {
  .warning-modal {
    display: block;
  }
}
</style>
