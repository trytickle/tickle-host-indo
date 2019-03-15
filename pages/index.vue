<template>
  <div>
    <LocalePicker/>
    <div class="bg"></div>
    <div class="header-img"><img class="icon-image" src="/images/tickleIcon.png"></div>
    <div class="container">
      <h3 class="heading-3" style="margin-bottom:20px;text-align:center;">{{ $t('welcomeTickleHost') }}</h3>
      <p style="text-align:center;">{{ $t('welcomeMessage') }}</p>
      <p style="text-align:center;">
        {{$t('askToSignupText')}}, <a href="#" @click.prevent="showSignupModal=true">{{ $t('pleaseClickHere') }}</a>
        <br>
       {{ $t('askForgetPasswordText') }}, <a href="#" @click.prevent="showForgotPassModal=true">{{ $t('pleaseClickHere') }}</a>
      </p>
      <form v-on:submit.prevent="emailLogin" class="email-wrapper">
        <input type="text" class="text-field" placeholder="Email" spellcheck="false" v-model="emailString"/>
        <input type="password" class="text-field" :placeholder="$t('password')" spellcheck="false" v-model="passwordString"/>
        <button class="submit-button" @click.prevent="emailLogin">{{buttonTitle}}</button>
      </form>
      <div class="error-wrapper" style="margin-bottom:20px;margin-top:20px;" v-if="showError">{{errorMessage}}<br><a class="error-wrapper"  v-if="showSendVerification" href="#" @click.prevent="sendVerificationEmail()"><u>Kirim verifikasi email</u></a></div>
      <div class="green-wrapper" style="margin-bottom:20px;margin-top:20px;" v-if="showVerifySent">Email verifikasi dikirim. Silakan periksa email Anda dan klik tautan verifikasi di dalamnya.</div>
      <div style="margin:auto;margin-bottom:10px;margin-top:30px;padding-left:20px;">
        <span style="align:center;font-size:11px;font-weight:600;color:#ccc;">{{ $t('continueWith')}}</span>
      </div>
      <div style="margin:auto;">
        <button class="fb-button" style="margin-right:10px;" @click.prevent="fbLogin">Facebook</button>
        <button id="google" class="google-button" @click.prevent="googleLogin" >Google</button>
      </div>
    </div>

    <div class="overlay" :hidden="!showSignupModal">
      <div class="signup-modal">
        <h3 style="margin-top:-5px;padding-bottom:20px;">{{$t('signUpAsHost')}}</h3>
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showSignupModal=false"></button>
        <form v-on:submit.prevent="emailSignup">
          <span>{{ $t('email') }}</span>
          <input type="text" class="text-field" style="margin-top:5px;" placeholder="Email" spellcheck="false" v-model="emailString"/>
          <span>{{ $t('password') }}</span>
          <input type="password" class="text-field" style="margin-top:5px;" :placeholder="$t('password')" spellcheck="false" v-model="passwordString"/>
          <span>{{ $t('firstName') }}</span>
          <input type="text" class="text-field" style="margin-top:5px;" :placeholder="$t('firstName')" spellcheck="false" v-model="firstNameString"/>
          <span>{{ $t('lastName') }}</span>
          <input type="text" class="text-field" style="margin-top:5px;" :placeholder="$t('lastName')" spellcheck="false" v-model="lastNameString"/>
          <p style="padding-top:10px;color:#222;">{{$t('agreeToTerms')}} <a target="_blank" href="https://trytickle.com/terms-of-service">{{$t('termsOfService')}}</a> {{$t('and')}} <a target="_blank" href="https://trytickle.com/guest-refund-policy">{{$t('privacyPolicy')}}</a> Tickle.</p>
          <div class="error-wrapper-modal" style="margin-bottom:20px;margin-top:20px;" v-if="showModalError">{{errorMessage}}</div>
          <button class="submit-button" style="margin-top:20px;" @click.prevent="emailSignup">{{signupButtonText}}</button>
        </form>
      </div>
    </div>
     <div class="overlay" :hidden="!showForgotPassModal">
      <div class="signup-modal">
        <h3 style="margin-top:-5px;padding-bottom:20px;">{{$t('resetYourPassword')}}</h3>
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showForgotPassModal=false"></button>
        <form v-on:submit.prevent="sendResetPasswordEmail">
          <span>Email</span>
          <input type="text" class="text-field" style="margin-top:5px;" placeholder="Email" spellcheck="false" v-model="emailString"/>
          <div  style="margin-bottom:20px;margin-top:5px;" >{{$t('resetEmailSent')}}</div>
          <div class="error-wrapper-modal" style="margin-bottom:20px;margin-top:20px;" v-if="showModalError">{{errorMessage}}</div>
          <button class="submit-button" style="margin-top:20px;" @click.prevent="sendResetPasswordEmail">{{$t('resetYourPassword')}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  db,
  auth,
  googleAuthProvider,
  facebookAuthProvider
} from "~/plugins/firebase";
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import LocalePicker from '~/components/locale-picker';

export default {
  data() {
    return {
      buttonTitle: this.$t("login"),
      signupButtonText: this.$t("signup"),
      emailString: "",
      passwordString: "",
      firstNameString: "",
      lastNameString: "",
      showError: false,
      showSendVerification: false,
      showVerifySent: false,
      errorMessage: "Email tidak valid",
      googleAuth: null,
      showSignupModal: false,
      showForgotPassModal: false,
      showModalError: false,
      selectedLanguage: "Bahasa Indonesia",
      languages: ["Bahasa ", "English"]
    };
  },
  components: {
    LocalePicker
  },
  methods: {
    async emailLogin() {
      if (
        this.validateEmail(this.emailString) &&
        this.passwordString.length > 5
      ) {
        this.showVerifySent = false;
        this.showSendVerification = false;
        this.showError = false;
        this.buttonTitle = this.$t("login")+"...";
        
        try {
          const result = await auth.signInWithEmailAndPassword(
            this.emailString,
            this.passwordString
          );
          if (result) {
            const user = result.user;
            this.takeToStart(false, false);
          }
        } catch (error) {
          this.errorMessage =
            "Gagal masuk. Silakan periksa email dan kata sandi Anda.";
          this.showError = true;
          this.buttonTitle = this.$t("login");
          this.showSignupModal = false;
          this.signupButtonText = this.$t("signup")
        }
      } else {
        if (!this.validateEmail(this.emailString)) {
          this.errorMessage = "Masukkan email yang valid.";
          this.showError = true;
          return;
        }
        if (this.passwordString.length < 5) {
          this.errorMessage = "Masukkan kata sandi yang valid.";
          this.showError = true;
          return;
        }
      }
    },
    async emailSignup() {
       if (
        this.validateEmail(this.emailString) &&
        this.passwordString.length > 5 && 
        this.firstNameString.length > 0 && 
        this.lastNameString.length > 0
      ) {
        this.signupButtonText = this.$t("signup")+"...";
        this.showModalError = false;
        try {
          const result = await auth.createUserWithEmailAndPassword(
            this.emailString,
            this.passwordString
          );
          if (result) {
            const user = result.user;
            let firstName = this.firstNameString;
            let lastName = this.lastNameString;
            const body = {
              firstName: firstName,
              lastName: lastName,
              userId: user.uid,
              profilePhotoUrl: "",
              email: this.emailString
            };
            await this.createNewUser(body, false);
          }
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/email-already-in-use") {
            this.emailLogin();
            return;
          }
          this.errorMessage =
            "Gagal masuk. Silakan periksa email dan kata sandi Anda.";
          this.showError = true;
          this.showSignupModal = false;
          this.signupButtonText = this.$t("signup");
        }
      } else {
         if (!this.validateEmail(this.emailString)) {
          this.errorMessage = "Masukkan email yang valid.";
          this.showModalError = true;
          return;
        }
        if (this.passwordString.length < 5) {
          this.errorMessage = "Masukkan kata sandi yang valid.";
          this.showModalError = true;
          return;
        }
        if (this.firstNameString.length == 0) {
          this.errorMessage = "Masukkan nama depan yang valid";
          this.showModalError = true;
          return;
        }
        if (this.lastNameString.length == 0) {
          this.errorMessage = "Masukkan nama belakang yang valid";
           this.showModalError = true;
          return;
        }
      }
    },
    fbLogin() {
      this.socialLogin(facebookAuthProvider);
    },
    googleLogin() {
      this.socialLogin(googleAuthProvider);
    },
    async socialLogin(provider) {
      try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        const names = user.displayName.split(" ");
        let firstName = user.displayName;
        let lastName = "";
        if (names.length > 1) {
          firstName = names[0];
          lastName = names[1];
        }
        const body = {
          firstName: firstName,
          lastName: lastName,
          userId: user.uid,
          profilePhotoUrl: user.photoURL,
          email: user.email
        };
        await this.createNewUser(body, true);
      } catch (error) {
        console.error(error);
      }
    },
    validateEmail(email) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },
    async createNewUser(body, isSocialLogin) {
      try {
        await this.$axios.$post(
          process.env.functionsUrl + "/createNewUser",
          body
        );
        auth.currentUser.sendEmailVerification()
        this.takeToStart(isSocialLogin, true);
      } catch (error) {
        if (error.response.status == 400) {
          this.takeToStart(isSocialLogin, true);
          return;
        }
        this.errorMessage = error.message;
        this.showError = true;
      }
    },
    async takeToStart(isSocialLogin, isSignUp) {
      this.showError = false;
      if (auth.currentUser.emailVerified || isSocialLogin) {
        await this.$store.dispatch("loadCurrentUser");
        if (this.$store.state.user) {
          this.$router.push(this.localePath({name: 'start', params: { step: 'StepTitle' }}));
        }
      } else {
        if (isSignUp) {
          console.log("verification email sent")
          this.sendVerificationEmail()
        } else {
          this.showSendVerification = true;
          this.showError = true;
          this.buttonTitle = this.$t("login"),
          this.signupButtonText = this.$t("signup")
          this.showSignupModal = false;
          this.errorMessage = "Email tidak terverifikasi. Anda perlu memverifikasi alamat email Anda sebelum masuk."
        }
      }
    },
    async sendVerificationEmail() {
        this.buttonTitle = this.$t("login"),
        this.signupButtonText = this.$t("signup")
        this.showSignupModal = false;
        this.showSendVerification = false;
        this.showError = false;
        auth.currentUser.sendEmailVerification()
        this.showVerifySent = true;
        auth.signOut();
    },
    async sendResetPasswordEmail() {
      if (this.validateEmail(this.emailString)) {
        auth.sendPasswordResetEmail(this.emailString);
        this.showForgotPassModal = false;
        this.showModalError = false;
        this.emailString = ""
      } else {
        this.showModalError = true;
        this.errorMessage = "Masukkan email yang valid";
      }
    },
    onLanguageChanged() {
      if (this.selectedLanguage == "English") {
        this.$router.push(this.switchLocalePath('en'));
      } else {
        this.$router.push(this.switchLocalePath('en'));
      }
    }
  },
  mounted() {
    Vue.use(VueI18n)
    auth.onAuthStateChanged(user => {
      if (user) {
        //this.takeToStart();
     
      }
    });
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
};
</script>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 350px;
  min-width: 800px;
  top: -100px;
  background: linear-gradient(to bottom right, #2ab4ff, #c2e4f8);
  transform: skew(0, -6deg);
  z-index: -1;
}
.header-img {
  width: 100%;
  min-width: 800px;
  height: 250px;
  position: relative;
  margin-top: 40px;
  text-align: center;
  z-index: -1;
}
.icon-image {
  width: 200px;  
}
.container {
  position: relative;
  width: 800px;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.submit-button {
  text-decoration: none;
  height: 50px;
  margin: 0;
  outline: none;
}
.fb-button {
  text-decoration: none;
  height: 50px;
  margin: 0;
  padding-left: 25px;
  padding-right: 25px;
  outline: none;
  border-radius: 4px;
  background-color: #3b5998;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  width: 200px;
}
.google-button {
  text-decoration: none;
  height: 50px;
  margin: 0;
  padding-left: 25px;
  padding-right: 25px;
  outline: none;
  border-radius: 4px;
  background-color: #db4437;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  width: 200px;
}
.intro-description {
  margin-bottom: 20px;
}
.email-wrapper {
  position: relative;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  padding: 20px 0 0 0;
  width: 100%;
}
.button-original {
  width: 250px;
}
.error-wrapper {
  color: red;
  text-align: center;
}
.error-wrapper-modal {
  color: red;
  text-align: left;
}
.green-wrapper {
  color: rgb(24, 173, 61);
  text-align: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.signup-modal {
  position: absolute;
  top: 10%;
  margin-left: 30%;
  width: 40%;
  min-width: 500px;
  padding: 50px;
  background-color: white;
  border-radius: 6px;
  z-index: 100;
}
.menu-button {
  float: right;
  margin: 10px;
  height: 80%;
}
.menu {
  display: none;
  position: absolute;
  top: 60px;
  width: 400px;
  background-color: white;
  z-index: 100;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px 10px;
  max-height: 80vh;
  overflow: auto;
}
.menu-item {
  text-align: right;
  max-width: 320px;
  overflow: hidden;
  padding-bottom: 4px;
  margin: 10px
}
.menu-button:hover .menu {
  display: block;
}
.menu-item-cell {
  display:grid;
  grid-template-columns: 120px auto;
  align-items: center;
}
.menu-item-grid {
  display: grid;
  grid-template-columns: 85px auto;
  align-items: center;
  grid-gap: 15px;
}

@media screen and (max-width: 640px) {
  .bg {
    min-width: 100%;
  }
  .header-img {
    display: none;
  }
  .container {
    display: none;
  }
}
</style>
