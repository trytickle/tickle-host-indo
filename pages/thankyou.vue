<template>
  <div>
    <div class="bg"></div>
    <div class="header-img"><img class="icon-image" src="/images/thankyou-header.png"></div>
    <div class="container">
      <h3 class="heading-3">Thank you!</h3>
      <p>We'll review your submission as soon as we can. In the meantime, please download the Tickle mobile app and sign up. You'll need an account before you can host an experience.</p>
      <p>Note: When you sign up on Tickle, please make sure you use the same email you used here.</p>
      <a class="submit-button" style="width:300px;margin-top:20px;" target="_blank" href="https://tickle.app.link/qaBW2t6k9M">Download Tickle</a>
    </div>
  </div>
</template>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 350px;
  min-width: 800px;
  top: -100px;
  background: linear-gradient(to bottom right, #2AB4FF, #C2E4F8);
  transform: skew(0,-6deg);
  z-index: -1;
}
.header-img {
  width: 100%;
  height: 250px;
  min-width: 800px;
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
  max-width: 800px;
  min-width: 800px;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.submit-button {
  text-decoration: none;
  height: 50px;
  margin: 0;
  outline: none;
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
}
.text-field {
  animation: 0.3s ease-out 0s 1 slideInFromRight;
}
.button-move {
  background-color: rgb(15, 228, 15);
  border-color: rgb(15, 228, 15);
  color: white;
  animation: 0.3s ease-out 0s 1 slideInFromRight;
}
.button-original {
  width: 250px;
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.error-wrapper {
  color: red;
  text-align: center;
}
</style>
