<template>
  <div class="modal-wrapper">
    <h1 class="header-title">{{currentTitle}}</h1>
    <div :class="{'content-wrapper': activePage === 1, 'guide-wrapper': activePage > 1}" v-html="currentContent"></div>
    <div class="right-arrow" @click="nextClicked" v-if="activePage >= 1 && activePage < 4"><i class="fas fa-chevron-right fa-2x" style="color:white;"></i></div>
    <div class="left-arrow" @click="backClicked" v-if="activePage > 1 && activePage <= 4"><i class="fas fa-chevron-left fa-2x" style="color:white;"></i></div>
    <div class="bottom-dots">
      <i :class="{'fas fa-circle': activePage === 1, 'far fa-circle': activePage != 1}" style="color:#ccc;"></i>
      <i :class="{'fas fa-circle': activePage === 2, 'far fa-circle': activePage != 2}" style="color:#ccc;"></i>
      <i :class="{'fas fa-circle': activePage === 3, 'far fa-circle': activePage != 3}" style="color:#ccc;"></i>
      <i :class="{'fas fa-circle': activePage === 4, 'far fa-circle': activePage != 4}" style="color:#ccc;"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePage: 1
    }
  },
  computed: {
    currentTitle() {
      switch (this.activePage) {
        case 1: return "Apa itu pengalaman Tickle?";
        case 2: return 'Cerita';
        case 3: return 'Aktivitas';
        case 4: return 'Sosial';
        default: return '';
      }
    },
    currentContent() {
      switch (this.activePage) {
        case 1:
          return `
            <div>
              <p style="color:#555;font-weight:900;">Mari kita mulai dengan apa yang bukan pengalaman Tickle.</p>
              <p>Ini <i> bukan </i> hanya tentang mempelajari sesuatu di kelas, lokakarya, atau seminar. Tidak, ini <i> bukan </i> aktivitas khas yang mungkin Anda temui di grup Facebook. Dan itu <i> jelas bukan </i> tentang menemukan penawaran terbaik untuk pemandu wisata di kota.</p>
              <p style="color:#555;font-weight:900;margin-top:20px;">Pengalaman Tickle terdiri dari 3 hal:</p>
              <p>CERITA tuan rumah, yang berasal dari sesuatu yang mereka sangat sukai, suatu AKTIVITAS yang merupakan perpanjangan alami dari hasrat mereka, dan unsur sosial, yang menyatukan tamu dan tuan rumah bersama dalam melakukan sesuatu yang bermakna.</p>
            </div>
            <div>
              <img src="/images/experience-img.png">
            </div>
          `;
        case 2:
          return `
            <p style="width:60%;text-align:center;">
             Setiap pengalaman Tickle dimulai dengan kisah masing-masing pembawa acara. Ini unik, karena setiap host unik.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap:20px;margin-top:20px;margin-bottom:20px;">
              <div style="width:200px;">
                <img src="images/example1.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/example2.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/example3.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
            </div>
          `;
        case 3:
          return `
            <p style="width:60%;text-align:center;">
            Kegiatan ini benar-benar hanya alasan bagi orang-orang untuk berkumpul bersama untuk berbagi pengalaman. Yang sedang berkata, itu selalu menyenangkan dan menarik.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap:20px;margin-top:20px;margin-bottom:20px;">
              <div style="width:200px;">
                <img src="images/photo-example-3.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/photo-example-5.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/photo-example-6.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
            </div>
          `;
        case 4:
          return `
            <p style="width:60%;text-align:center;">
         Pada akhirnya, ini semua tentang orang. Pengalaman hebat membantu memulai percakapan, menciptakan persahabatan yang langgeng dan momen yang tak terlupakan.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap:20px;margin-top:20px;margin-bottom:20px;">
              <div style="width:200px;">
                <img src="images/photo-example-1.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/example2.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
              <div style="width:200px;">
                <img src="images/photo-example-4.jpg" width="200" height="300" style="object-fit:cover;border-radius:5px;">
              </div>
            </div>
          `;
        default: return '';
      }
    }
  },
  methods: {
    nextClicked() {
      if (this.activePage >= 1 && this.activePage < 4) {
        this.activePage++;
      }
    },
    backClicked() {
      if (this.activePage > 1 && this.activePage <= 4) {
        this.activePage--;
      }
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.header-title {
  top: 0;
  height: 45px;
  margin: auto;
  text-align: center;
}
.content-wrapper {
  width: 60%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-column-gap: 30px;
  margin: 80px auto auto auto;
  align-items: center;
  margin-bottom: 50px;
}
.guide-wrapper {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
.right-arrow {
  position: absolute;
  right: 50px;
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(8, 192, 255, 0.5);
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  padding-left: 5px;
}
.right-arrow:hover {
  background-color: rgba(8, 192, 255, 1);
}
.left-arrow {
  position: absolute;
  left: 50px;
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(8, 192, 255, 0.5);
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  padding-right: 5px;
}
.left-arrow:hover {
  background-color: rgba(8, 192, 255, 1);
}
.bottom-dots {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 25px 25px 25px 25px;
  justify-content: center;
}
</style>
