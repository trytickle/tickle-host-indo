<template>
  <div class="main-content" style="padding-bottom:100px;">
    <h3 class="heading-3">Tambahkan foto Anda</h3>
    <p class="paragraph-4">
     Jika Anda tidak memiliki foto yang sempurna saat ini, jangan khawatir. Gunakan yang terbaik yang Anda miliki. Anda dapat menambahkan lebih dari satu atau mengubahnya nanti.
      <br/><br/>
      <button class="pagelink" @click="$parent.toggleInfoModal('photoStandards')">Tinjau standar foto kami</button>
    </p>
    
    <div class="div-block-4">

      <p class="desc-title" style="margin-bottom:20px;">
       Apa yang tidak dapat kami terima di foto:
      </p>
      <ul class="photo-list-donts">
        <li class="photo-list-item">Orang-orang berpose, diatur, menatap langsung ke kamera, atau selfie</li>
        <li class="photo-list-item">Foto hitam putih</li>
        <li class="photo-list-item">Menggunakan filter </li>
        <li class="photo-list-item">Teks overlay pada gambar</li>
      </ul>
      <div class="text-block-2">{{ $t('examples') }}</div>
      <div class="photo-grid">
        <div class="example-wrapper">
          <img src="images/photo-example-1.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
        <div class="example-wrapper">
          <img src="images/example2.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
        <div class="example-wrapper">
          <img src="images/photo-example-3.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
        <div class="example-wrapper">
          <img src="images/example4.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
        <div class="example-wrapper">
          <img src="images/photo-example-5.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
        <div class="example-wrapper">
          <img src="images/photo-example-6.jpg" width="180" height="250" class="image" style="object-fit:cover;">
        </div>
      </div>
    </div>
    <input style="display:none" ref ="picker" type="file" name="pic" accept="image/*" @change="onFileChange">
    <input style="display:none" ref ="videoPicker" type="file" name="pic" accept="video/mp4,video/x-m4v,video/*" @change="onVideoFileChange">
    <section style="margin-top: 40px;">
      <h4 class="content-heading">Foto sampul</h4>
      <p>Pilih foto yang mewakili pengalaman Anda. Ini adalah foto pertama yang akan muncul ketika tamu mencari aktivitas yang dapat dilakukan.</p>
      <div class="cover-photo-wrapper">
        <div :class="{'photo-image': $store.state.photos[0], 'photo-element': !$store.state.photos[0]}" @click="pickPhoto(0, 'add')">
          <div class="image-wrapper">
            <div class="buttons-wrapper">
              <div class="photo-action-button" @click.stop="pickPhoto(0, 'remove')">Menghapus</div>
              <div class="photo-action-button" @click.stop="pickPhoto(0, 'replace')">Perubahan</div>
            </div>
            <img :src="$store.state.photos[0]">
          </div>
        </div>
       <div v-if="$store.state.photos[0]" style="margin-top: 50px;">
       <croppa ref="croppa" v-if="!$store.state.photos[0].startsWith('http')" :initial-image="$store.state.photos[0]" v-model="myCroppa"
          :width="300"
          :height="200"
          :quality=8
          class="photo-landscape-preview"
          placeholder=""
          :prevent-white-space="true"
          initial-size="natural"
          initial-position="center"
          :disable-click-to-choose="true"
          :disable-drag-and-drop="true"
          :show-remove-button="false">
          </croppa>
          <div v-if="$store.state.coverThumbnailUrl && $store.state.photos[0].startsWith('http')" class="photo-landscape-preview"><img :src="$store.state.coverThumbnailUrl" style="height:100%;width:100%;object-fit:cover;"></div>
          <p v-if="$store.state.coverThumbnailUrl && $store.state.photos[0].startsWith('http')" style="margin-top:10px;">List thumbnail preview</p>
          <p v-if="!$store.state.photos[0].startsWith('http')" style="margin-top:10px;">Adjust preview by sliding or Zooming the above photo.</p>
        </div>
      </div>
    </section>
     <section style="margin-top: 40px;">
      <h4 class="content-heading">Tambahkan Video</h4>
      <p style="margin-bottom: 30px;">Pilih Video yang mewakili pengalaman Anda. Ini adalah foto pertama yang akan muncul ketika tamu mencari aktivitas yang dapat dilakukan.</p>
      <div class="cover-photo-wrapper">
        <div :class="{'photo-image': $store.state.photos[1], 'photo-element': !$store.state.photos[1]}" @click="pickVideo()">
          <div class="image-wrapper">
            <div class="buttons-wrapper">
              <div class="photo-action-button" @click.stop="removeVideo()">Menghapus</div>
              <div class="photo-action-button" @click.stop="pickVideo()">Perubahan</div>
            </div>
             <video class="video" width="200" height="300" v-if="$store.state.photos[1]" ref="videoRef" :src="$store.state.photos[1]" id="video-container"  muted loop autoplay></video>  
          </div>
        </div>
      </div>
    </section>

    <section style="margin-top: 90px;">
      <h4 class="content-heading">Foto galeri (opsional)</h4>
      <p>Tambahkan hingga 9 foto yang menggambarkan apa yang akan Anda lakukan selama pengalaman Anda. Galeri foto Anda akan berada d dalami sini, berurutan dari pertama hingga terakhir (setelah foto sampul Anda).</p>
      <div class="gallery-grid">
        <!-- <div>
          <div :class="{'photo-image': $store.state.photos[1], 'photo-element': !$store.state.photos[1]}" @click="pickPhoto(1, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(1, 'remove')">Remove</div>
                <div class="photo-action-button" @click.stop="pickPhoto(1, 'replace')">Replace</div>
              </div>
              <img :src="$store.state.photos[1]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Host</span> · Show yourself leading the activity</p>
        </div> -->
        <div>
          <div :class="{'photo-image': $store.state.photos[2], 'photo-element': !$store.state.photos[2]}" @click="pickPhoto(2, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(2, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(2, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[2]">
            </div>
          </div>
          <p class="photo-caption" ><span style="color:#555;font-weight:900;">Tindakan</span> · Tampilkan tamu yang terlibat dalam pengalaman Anda</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[3], 'photo-element': !$store.state.photos[3]}" @click="pickPhoto(3, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(3, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(3, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[3]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Detail</span> · Abadikan close-up tekstur atau detail menarik</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[4], 'photo-element': !$store.state.photos[4]}" @click="pickPhoto(4, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(4, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(4, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[4]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lokasi</span> · Tampilkan adegan penuh dan coba sertakan orang</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[5], 'photo-element': !$store.state.photos[5]}" @click="pickPhoto(5, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(5, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(5, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[5]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lain-lain</span> · Tambahkan hingga 9 foto</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[6], 'photo-element': !$store.state.photos[6]}" @click="pickPhoto(6, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(6, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(6, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[6]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lain-lain</span> · Tambahkan hingga 9 foto</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[7], 'photo-element': !$store.state.photos[7]}" @click="pickPhoto(7, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(7, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(7, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[7]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lain-lain</span> · Tambahkan hingga 9 foto</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[8], 'photo-element': !$store.state.photos[8]}" @click="pickPhoto(8, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(8, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(8, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[8]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lain-lain</span> · Tambahkan hingga 9 foto</p>
        </div>
        <div>
          <div :class="{'photo-image': $store.state.photos[9], 'photo-element': !$store.state.photos[9]}" @click="pickPhoto(9, 'add')">
            <div class="image-wrapper">
              <div class="buttons-wrapper">
                <div class="photo-action-button" @click.stop="pickPhoto(9, 'remove')">Menghapus</div>
                <div class="photo-action-button" @click.stop="pickPhoto(9, 'replace')">Perubahan</div>
              </div>
              <img :src="$store.state.photos[9]">
            </div>
          </div>
          <p class="photo-caption"><span style="color:#555;font-weight:900;">Lain-lain</span> · Tambahkan hingga 9 foto</p>
        </div>
      </div>
    </section>
    <button class="submit-button" @click="nextClicked" :disabled="$store.state.photos[0] === null" style="outline:none;">{{buttonTitle}}</button>
  </div>
</template>

<script>
import { resizeImage } from "~/services/utility";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
export default {
  data() {
    return {
      selectedIndex: 0,
      buttonTitle: "Menyimpan",
      myCroppa: {}
    };
  },
  components: {
    croppa: Croppa.component
  },
  methods: {
    async nextClicked() {
      try {
        this.myCroppa.generateBlob(
          blob => {
            resizeImage(blob, (resizedFilePath, outputFile) => {
              this.$store.commit("setCoverThumbnail", outputFile);
            });
          },
          "image/jpeg",
          1
        );
      } catch (ex) {}
      this.buttonTitle = "Mengunggah...";
      await this.$store.dispatch("uploadImageToDatabase");
      this.buttonTitle = "Menyimpan";
      this.$store.commit("setActivePage", "StepAbout");
      this.$parent.switchComponent();
    },
    async pickPhoto(selectedIndex, pickType) {
      if (pickType === "add" || pickType === "replace") {
        this.selectedIndex = selectedIndex;
        if (selectedIndex == 1) {
          this.$refs.videoPicker.click();
        } else {
          this.$refs.picker.click();
        }
      } else if (pickType === "remove") {
        await this.$store.dispatch("removeImageFromDatabase", selectedIndex);
      }
    },
    pickVideo() {
      this.$refs.videoPicker.click();
    },
    async removeVideo() {
      await this.$store.dispatch("removeImageFromDatabase", 1);
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      resizeImage(file, (resizedFilePath, outputFile) => {
        this.$store.commit("addPhoto", {
          index: this.selectedIndex,
          path: resizedFilePath,
          file: outputFile
        });
        try {
          this.myCroppa.refresh();
        } catch (ex) {}
      });
    },
    onVideoFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let url = URL.createObjectURL(file);
      this.$store.commit("addPhoto", { index: 1, path: url, file: file });
    }
  }
};
</script>

<style scoped>
button {
  cursor: pointer;
}
.image {
  opacity: 0.9;
}
.photo-grid {
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, 200px);
}
.example-wrapper {
  width: 180px;
}
.desc-title {
  color: #555;
  font-weight: 900;
}
.photo-list-dos {
  list-style: none outside none;
  margin: 0;
  padding: 0;
  list-style-type: square;
  margin-left: 20px;
  margin-bottom: 40px;
  list-style-image: url("/images/tick.png");
}
.photo-list-donts {
  list-style: none outside none;
  margin: 0;
  padding: 0;
  list-style-type: square;
  margin-left: 20px;
  margin-bottom: 40px;
  list-style-image: url("/images/cross.png");
}
.photo-list-item {
  color: #a3a3a3;
  margin-bottom: 5px;
}
.pagelink {
  color: #4ac8f1;
  text-decoration: none;
  font-weight: 900;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.photo-element {
  margin-top: 30px;
  width: 200px;
  height: 300px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  content: url("/images/image.png");
  object-fit: none;
  transition: 0.2s ease-in;
  background-position: center;
  box-shadow: 0px 5px rgba(0, 0, 0, 0.3);
}
.photo-element:hover {
  background-color: #dddddd;
  transform: perspective(9999px) rotateX(15deg) rotateY(15deg);
}
.cover-photo-wrapper {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 200px 200px;
}
.photo-image {
  margin-top: 30px;
  width: 200px;
  height: 300px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in;
  background-position: center;
  box-shadow: 0px 5px rgba(8, 192, 255, 1);
  background-color: black;
}
.photo-landscape-preview {
  margin-top: 30px;
  width: 300px;
  height: 200px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #dddddd;
  overflow: hidden;
}
.image-wrapper {
  position: relative;
}
.image-wrapper img {
  width: 200px;
  height: 300px;
  transition: 0.2s ease-in;
  object-fit: cover;
}
.photo-image:hover {
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.image-wrapper img:hover {
  border: 0px solid rgba(0, 0, 0, 0.5);
}
.photo-actions {
  width: 200px;
  height: 300px;
  border-radius: 4px;
  display: grid;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
  background-color: rgba(0, 0, 0, 1);
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  min-width: 800px;
}
.photo-caption {
  margin-top: 20px;
  margin-right: 30px;
}
.buttons-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: 0.2s ease-in;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttons-wrapper:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: auto;
}
.photo-action-button {
  height: 40px;
  width: 70%;
  border: 1px solid white;
  color: white;
  border-radius: 5px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin: 5px;
}
.photo-action-button:hover {
  height: 40px;
  width: 70%;
  color: black;
  background-color: white;
  border-radius: 4px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin: 5px;
  cursor: pointer;
}

.video-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%; 
  overflow: hidden;
}
.video-container video {
  /* Make video to at least 100% wide and tall */
  min-width: 100%; 
  min-height: 100%; 

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: 200;
  height: 300;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.video {
  object-fit: cover;
}
</style>
