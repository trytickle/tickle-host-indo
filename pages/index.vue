<template>
  <div>
    <div class="bg"></div>
    <div class="header-img"><img class="icon-image" src="/images/intro-header.png"></div>
    <div class="container">
      <h3 class="heading-3" style="margin-bottom:25px;margin:auto;margin-bottom:20px;">Welcome, Tickle hosts!</h3>
      <p>Sign in to your account to create, edit and manage your Tickle bookings and experiences. If you're new to Tickle and would like to sign up as a host, <a href="#" @click.prevent="showSignupModal=true">please click here</a>.</p>
      <form v-on:submit.prevent="emailLogin" class="email-wrapper">
        <input type="text" class="text-field" placeholder="Your email" spellcheck="false" v-model="emailString"/>
        <input type="password" class="text-field" placeholder="Your password" spellcheck="false" v-model="passwordString"/>
        <button class="submit-button" @click.prevent="emailLogin">{{buttonTitle}}</button>
      </form>
      <div class="error-wrapper" style="margin-bottom:20px;" v-if="showError">{{errorMessage}}</div>
      <div style="margin:auto;margin-bottom:10px;padding-left:20px;">
        <span style="align:center;font-size:12px;font-weight:600;color:#aaa;">OR CONTINUE WITH</span>
      </div>
      <div style="margin:auto;">
        <button class="fb-button" style="margin-right:10px;" @click.prevent="fbLogin">Facebook</button>
        <button id="google" class="google-button" @click.prevent="googleLogin" >Google</button>
      </div>
    </div>

    <div class="overlay" :hidden="!showSignupModal">
      <div class="signup-modal">
        <h3 style="margin-top:-5px;padding-bottom:20px;">Sign up as a Tickle host</h3>
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="showSignupModal=false"></button>
        <form v-on:submit.prevent="emailSignup">
          <span>Email</span>
          <input type="text" class="text-field" style="margin-top:5px;" placeholder="Your email" spellcheck="false" v-model="emailString"/>
          <span>Password</span>
          <input type="password" class="text-field" style="margin-top:5px;" placeholder="Your password" spellcheck="false" v-model="passwordString"/>
          <span>First name</span>
          <input type="text" class="text-field" style="margin-top:5px;" placeholder="Your first name" spellcheck="false" v-model="firstNameString"/>
          <span>Last name</span>
          <input type="text" class="text-field" style="margin-top:5px;" placeholder="Your last name" spellcheck="false" v-model="lastNameString"/>
          <p style="padding-top:10px;color:#222;">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
          <button class="submit-button" style="margin-top:20px;" @click.prevent="emailSignup">{{signupButtonText}}</button>
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

export default {
  data() {
    return {
      buttonTitle: "Sign in",
      signupButtonText: "Sing up",
      emailString: "",
      passwordString: "",
      firstNameString: "",
      lastNameString: "",
      showError: false,
      errorMessage: "Invalid email address",
      googleAuth: null,
      showSignupModal: false
    };
  },
  methods: {
    async emailLogin() {
      if (
        this.validateEmail(this.emailString) &&
        this.passwordString.length > 5
      ) {
        this.showError = false;
        this.buttonTitle = "Signing in...";
        
        try {
          const result = await auth.signInWithEmailAndPassword(
            this.emailString,
            this.passwordString
          );
          if (result) {
            const user = result.user;
            this.takeToStart();
          }
        } catch (error) {
          this.errorMessage =
            "Sign in failed. Please check your email and password.";
          this.showError = true;
          this.buttonTitle = "Sign in";
        }
      } else {
        if (!this.validateEmail(this.emailString)) {
          this.errorMessage = "Enter a valid email.";
          this.showError = true;
          return;
        }
        if (this.passwordString.length < 5) {
          this.errorMessage = "Enter a valid password.";
          this.showError = true;
          return;
        }
      }
    },
    async emailSignup() {
      this.signupButtonText = "Signing up..";
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
          await this.createNewUser(body);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          this.emailLogin();
          return;
        }
        this.errorMessage =
          "Sign in failed. Please check your email and password.";
        this.showError = true;
        this.buttonTitle = "Sign in";
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
        await this.createNewUser(body);
      } catch (error) {
        console.error(error);
      }
    },
    validateEmail(email) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(this.emailString).toLowerCase());
    },
    async createNewUser(body) {
      try {
        await this.$axios.$post(
          process.env.functionsUrl + "/createNewUser",
          body
        );
        this.takeToStart();
      } catch (error) {
        if (error.response.status == 400) {
          this.takeToStart();
          return;
        }
        this.errorMessage = error.message;
        this.showError = true;
      }
    },
    async takeToStart() {
      await this.$store.dispatch("loadCurrentUser");
      if (this.$store.state.user) {
        this.$router.push('/start?step=StepTitle');
      }
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.takeToStart();
      }
    });
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
  width: 800px;
  height: 250px;
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
</style>
