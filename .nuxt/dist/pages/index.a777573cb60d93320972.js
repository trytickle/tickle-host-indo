webpackJsonp([4],{"/TYz":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("N14H"),r=a("rGQh"),n=!1;var s=function(t){n||a("k9dm")},o=a("VU/8")(i.a,r.a,!1,s,"data-v-2a183b29",null);o.options.__file="pages/index.vue",e.default=o.exports},C1E8:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".menu-button[data-v-5e4c5c94]{position:relative;display:inline-block;min-width:240px;text-align:right}.menu[data-v-5e4c5c94]{display:none;position:absolute;top:30px;right:30px;background-color:#fff;z-index:100;border-radius:4px;border:1px solid #ddd;padding:18px 10px 10px;max-height:80vh;overflow:auto}.menu-item[data-v-5e4c5c94]{text-align:left;overflow:hidden;padding-bottom:8px}.menu-button:hover .menu[data-v-5e4c5c94]{display:block}.menu-item-cell[data-v-5e4c5c94]{display:inline-block}",""])},EscT:function(t,e,a){"use strict";var i=a("F5+2"),r=a("mJPq"),n=!1;var s=function(t){n||a("vajV")},o=a("VU/8")(i.a,r.a,!1,s,"data-v-5e4c5c94",null);o.options.__file="components/locale-picker.vue",e.a=o.exports},"F5+2":function(t,e,a){"use strict";e.a={props:{isMenu:!1},computed:{language:function(){switch(this.$i18n.locale){case"en":return"English";case"id":default:return"Bahasa Indonesia"}},availableLocales:function(){var t=this;return this.$i18n.locales.filter(function(e){return t.$i18n.locale})}},methods:{changeLocale:function(t){this.localePickerVisible=!1,this.$router.push(this.switchLocalePath(t))}}}},N14H:function(t,e,a){"use strict";var i=a("Xxa5"),r=a.n(i),n=a("exGp"),s=a.n(n),o=a("2we2"),l=a("/5sW"),c=a("TXmL"),u=a("EscT");e.a={data:function(){return{buttonTitle:this.$t("login"),signupButtonText:this.$t("signup"),emailString:"",passwordString:"",firstNameString:"",lastNameString:"",showError:!1,showSendVerification:!1,showVerifySent:!1,errorMessage:"Email tidak valid",googleAuth:null,showSignupModal:!1,showForgotPassModal:!1,showModalError:!1,selectedLanguage:"Bahasa Indonesia",languages:["Bahasa ","English"]}},components:{LocalePicker:u.a},methods:{emailLogin:function(){var t=s()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.validateEmail(this.emailString)&&this.passwordString.length>5)){t.next=21;break}return this.showVerifySent=!1,this.showSendVerification=!1,this.showError=!1,this.buttonTitle=this.$t("login")+"...",t.prev=5,t.next=8,o.a.signInWithEmailAndPassword(this.emailString,this.passwordString);case 8:(e=t.sent)&&(e.user,this.takeToStart(!1,!1)),t.next=19;break;case 12:t.prev=12,t.t0=t.catch(5),this.errorMessage="Gagal masuk. Silakan periksa email dan kata sandi Anda.",this.showError=!0,this.buttonTitle=this.$t("login"),this.showSignupModal=!1,this.signupButtonText=this.$t("signup");case 19:t.next=29;break;case 21:if(this.validateEmail(this.emailString)){t.next=25;break}return this.errorMessage="Masukkan email yang valid.",this.showError=!0,t.abrupt("return");case 25:if(!(this.passwordString.length<5)){t.next=29;break}return this.errorMessage="Masukkan kata sandi yang valid.",this.showError=!0,t.abrupt("return");case 29:case"end":return t.stop()}},t,this,[[5,12]])}));return function(){return t.apply(this,arguments)}}(),emailSignup:function(){var t=s()(r.a.mark(function t(){var e,a,i,n,s,l;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.validateEmail(this.emailString)&&this.passwordString.length>5&&this.firstNameString.length>0&&this.lastNameString.length>0)){t.next=29;break}return this.signupButtonText=this.$t("signup")+"...",this.showModalError=!1,t.prev=3,t.next=6,o.a.createUserWithEmailAndPassword(this.emailString,this.passwordString);case 6:if(!(e=t.sent)){t.next=14;break}return a=e.user,i=this.firstNameString,n=this.lastNameString,s={firstName:i,lastName:n,userId:a.uid,profilePhotoUrl:"",email:this.emailString},t.next=14,this.createNewUser(s,!1);case 14:t.next=27;break;case 16:if(t.prev=16,t.t0=t.catch(3),l=t.t0.code,t.t0.message,"auth/email-already-in-use"!=l){t.next=23;break}return this.emailLogin(),t.abrupt("return");case 23:this.errorMessage="Gagal masuk. Silakan periksa email dan kata sandi Anda.",this.showError=!0,this.showSignupModal=!1,this.signupButtonText=this.$t("signup");case 27:t.next=45;break;case 29:if(this.validateEmail(this.emailString)){t.next=33;break}return this.errorMessage="Masukkan email yang valid.",this.showModalError=!0,t.abrupt("return");case 33:if(!(this.passwordString.length<5)){t.next=37;break}return this.errorMessage="Masukkan kata sandi yang valid.",this.showModalError=!0,t.abrupt("return");case 37:if(0!=this.firstNameString.length){t.next=41;break}return this.errorMessage="Masukkan nama depan yang valid",this.showModalError=!0,t.abrupt("return");case 41:if(0!=this.lastNameString.length){t.next=45;break}return this.errorMessage="Masukkan nama belakang yang valid",this.showModalError=!0,t.abrupt("return");case 45:case"end":return t.stop()}},t,this,[[3,16]])}));return function(){return t.apply(this,arguments)}}(),fbLogin:function(){this.socialLogin(o.c),this.isFacebookLogin=!0,this.errorMessage=null},googleLogin:function(){this.socialLogin(o.d),this.isGoogleLogin=!0,this.errorMessage=null},socialLogin:function(){var t=s()(r.a.mark(function t(e){var a,i,n,s,l,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.signInWithPopup(e);case 3:return a=t.sent,i=a.user,n=i.displayName.split(" "),s=i.displayName,l="",n.length>1&&(s=n[0],l=n[1]),c={firstName:s,lastName:l,userId:i.uid,profilePhotoUrl:i.photoURL,email:i.email},t.next=12,this.createNewUser(c,!0);case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),console.error(t.t0);case 17:case"end":return t.stop()}},t,this,[[0,14]])}));return function(e){return t.apply(this,arguments)}}(),validateEmail:function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())},createNewUser:function(){var t=s()(r.a.mark(function t(e,a){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$axios.$post("https://us-central1-tickle-indonesia.cloudfunctions.net//createNewUser",e);case 3:o.a.currentUser.sendEmailVerification(),this.takeToStart(a,!0),t.next=14;break;case 7:if(t.prev=7,t.t0=t.catch(0),400!=t.t0.response.status){t.next=12;break}return this.takeToStart(a,!0),t.abrupt("return");case 12:this.errorMessage=t.t0.message,this.showError=!0;case 14:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}(),takeToStart:function(){var t=s()(r.a.mark(function t(e,a){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.showError=!1,!o.a.currentUser.emailVerified&&!e){t.next=7;break}return t.next=4,this.$store.dispatch("loadCurrentUser");case 4:this.$store.state.user&&this.$router.push(this.localePath({name:"start",params:{step:"StepTitle"}})),t.next=8;break;case 7:a?(console.log("verification email sent"),this.sendVerificationEmail()):(this.showSendVerification=!0,this.showError=!0,this.buttonTitle=this.$t("login"),this.signupButtonText=this.$t("signup"),this.showSignupModal=!1,this.errorMessage="Email tidak terverifikasi. Anda perlu memverifikasi alamat email Anda sebelum masuk.");case 8:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}(),sendVerificationEmail:function(){var t=s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.buttonTitle=this.$t("login"),this.signupButtonText=this.$t("signup"),this.showSignupModal=!1,this.showSendVerification=!1,this.showError=!1,o.a.currentUser.sendEmailVerification(),this.showVerifySent=!0,o.a.signOut();case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),sendResetPasswordEmail:function(){var t=s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.validateEmail(this.emailString)?(o.a.sendPasswordResetEmail(this.emailString),this.showForgotPassModal=!1,this.showModalError=!1,this.emailString=""):(this.showModalError=!0,this.errorMessage="Masukkan email yang valid");case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),onLanguageChanged:function(){this.selectedLanguage,this.$router.push(this.switchLocalePath("en"))},isMobile:function(){return window.innerWidth<=600?(window.location.href="https://trytickle.typeform.com/to/tqjOE2",!0):(console.log("desktop"),!1)}},mounted:function(){l.default.use(c.default),this.isMobile(),o.a.onAuthStateChanged(function(t){})},computed:{availableLocales:function(){var t=this;return this.$i18n.locales.filter(function(e){return e.code!==t.$i18n.locale})}}}},aa42:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".bg[data-v-2a183b29]{position:absolute;width:100%;height:350px;min-width:800px;top:-100px;background:-webkit-gradient(linear,left top,right bottom,from(#2ab4ff),to(#c2e4f8));background:linear-gradient(to bottom right,#2ab4ff,#c2e4f8);-webkit-transform:skew(0,-6deg);transform:skew(0,-6deg);z-index:-1}.header-img[data-v-2a183b29]{width:100%;min-width:800px;height:250px;position:relative;margin-top:40px;text-align:center;z-index:-1}.icon-image[data-v-2a183b29]{width:200px}.container[data-v-2a183b29]{position:relative;width:800px;margin:auto;padding:40px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:left;-ms-flex-align:left;align-items:left}.submit-button[data-v-2a183b29]{text-decoration:none;height:50px;margin:0;outline:none}.fb-button[data-v-2a183b29]{background-color:#3b5998}.fb-button[data-v-2a183b29],.google-button[data-v-2a183b29]{text-decoration:none;height:50px;margin:0;padding-left:25px;padding-right:25px;outline:none;border-radius:4px;color:hsla(0,0%,100%,.95);font-weight:600;width:200px}.google-button[data-v-2a183b29]{background-color:#db4437}.intro-description[data-v-2a183b29]{margin-bottom:20px}.email-wrapper[data-v-2a183b29]{position:relative;display:grid;grid-column-gap:10px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:20px 0 0;width:100%}.button-original[data-v-2a183b29]{width:250px}.error-wrapper[data-v-2a183b29]{color:red;text-align:center}.error-wrapper-modal[data-v-2a183b29]{color:red;text-align:left}.green-wrapper[data-v-2a183b29]{color:#18ad3d;text-align:center}.overlay[data-v-2a183b29]{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.signup-modal[data-v-2a183b29]{position:absolute;top:10%;margin-left:30%;width:40%;min-width:500px;padding:50px;background-color:#fff;border-radius:6px;z-index:100}.menu-button[data-v-2a183b29]{float:right;margin:10px;height:80%}.menu[data-v-2a183b29]{display:none;position:absolute;top:60px;width:400px;background-color:#fff;z-index:100;border-radius:4px;border:1px solid #ddd;padding:10px;max-height:80vh;overflow:auto}.menu-item[data-v-2a183b29]{text-align:right;max-width:320px;overflow:hidden;padding-bottom:4px;margin:10px}.menu-button:hover .menu[data-v-2a183b29]{display:block}.menu-item-cell[data-v-2a183b29]{grid-template-columns:120px auto}.menu-item-cell[data-v-2a183b29],.menu-item-grid[data-v-2a183b29]{display:grid;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.menu-item-grid[data-v-2a183b29]{grid-template-columns:85px auto;grid-gap:15px}@media screen and (max-width:640px){.bg[data-v-2a183b29]{min-width:100%}.container[data-v-2a183b29],.header-img[data-v-2a183b29]{display:none}}",""])},k9dm:function(t,e,a){var i=a("aa42");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("8f6ab816",i,!1,{sourceMap:!1})},mJPq:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"menu-button",style:t.isMenu?"margin-top:30px;text-align:left;height:50px;":"position:fixed;top:30px;right:0;height:40px;"},[a("button",{staticClass:"text-block link",staticStyle:{"background-color":"rgba(0,0,0,0)"},style:t.isMenu?"":"color:rgba(0,0,0,0.7);"},[a("i",{staticClass:"fas fa-comment",staticStyle:{"font-size":"12px","margin-right":"10px"}}),t._v(t._s(t.language))]),a("div",{staticClass:"menu",style:t.isMenu?"top:35px;left:0;right:0;":""},t._l(t.availableLocales,function(e){return a("div",{key:e.code,on:{click:function(a){t.changeLocale(e.code)}}},[a("div",{staticClass:"menu-item-cell"},[a("button",{staticClass:"link menu-item"},[t._v(t._s(e.name))])])])}))])};i._withStripped=!0;var r={render:i,staticRenderFns:[]};e.a=r},rGQh:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("LocalePicker"),a("div",{staticClass:"bg"}),t._m(0),a("div",{staticClass:"container"},[a("h3",{staticClass:"heading-3",staticStyle:{"margin-bottom":"20px","text-align":"center"}},[t._v(t._s(t.$t("welcomeTickleHost")))]),a("p",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.$t("welcomeMessage")))]),a("p",{staticStyle:{"text-align":"center"}},[t._v("\n      "+t._s(t.$t("askToSignupText"))+", "),a("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showSignupModal=!0}}},[t._v(t._s(t.$t("pleaseClickHere")))]),a("br"),t._v("\n     "+t._s(t.$t("askForgetPasswordText"))+", "),a("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showForgotPassModal=!0}}},[t._v(t._s(t.$t("pleaseClickHere")))])]),a("form",{staticClass:"email-wrapper",on:{submit:function(e){return e.preventDefault(),t.emailLogin(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.emailString,expression:"emailString"}],staticClass:"text-field",attrs:{type:"text",placeholder:"Email",spellcheck:"false"},domProps:{value:t.emailString},on:{input:function(e){e.target.composing||(t.emailString=e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordString,expression:"passwordString"}],staticClass:"text-field",attrs:{type:"password",placeholder:t.$t("password"),spellcheck:"false"},domProps:{value:t.passwordString},on:{input:function(e){e.target.composing||(t.passwordString=e.target.value)}}}),a("button",{staticClass:"submit-button",on:{click:function(e){return e.preventDefault(),t.emailLogin(e)}}},[t._v(t._s(t.buttonTitle))])]),t.showError?a("div",{staticClass:"error-wrapper",staticStyle:{"margin-bottom":"20px","margin-top":"20px"}},[t._v(t._s(t.errorMessage)),a("br"),t.showSendVerification?a("a",{staticClass:"error-wrapper",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.sendVerificationEmail()}}},[a("u",[t._v("Kirim verifikasi email")])]):t._e()]):t._e(),t.showVerifySent?a("div",{staticClass:"green-wrapper",staticStyle:{"margin-bottom":"20px","margin-top":"20px"}},[t._v("Email verifikasi dikirim. Perhatikan bahwa mungkin diperlukan hingga 10 menit untuk menerimanya. Silakan periksa email Anda dan klik tautan verifikasi di dalamnya.")]):t._e(),a("div",{staticStyle:{margin:"auto","margin-bottom":"10px","margin-top":"30px","padding-left":"20px"}},[a("span",{staticStyle:{align:"center","font-size":"11px","font-weight":"600",color:"#ccc"}},[t._v(t._s(t.$t("continueWith")))])]),a("div",{staticStyle:{margin:"auto"}},[a("button",{staticClass:"fb-button",staticStyle:{"margin-right":"10px"},on:{click:function(e){return e.preventDefault(),t.fbLogin(e)}}},[t._v("Facebook")]),a("button",{staticClass:"google-button",attrs:{id:"google"},on:{click:function(e){return e.preventDefault(),t.googleLogin(e)}}},[t._v("Google")])])]),a("div",{staticClass:"overlay",attrs:{hidden:!t.showSignupModal}},[a("div",{staticClass:"signup-modal"},[a("h3",{staticStyle:{"margin-top":"-5px","padding-bottom":"20px"}},[t._v(t._s(t.$t("signUpAsHost")))]),a("button",{staticClass:"fas fa-times",staticStyle:{position:"absolute",right:"20px",top:"20px",color:"#ccc","margin-right":"-5px",outline:"none"},on:{click:function(e){e.preventDefault(),t.showSignupModal=!1}}}),a("form",{on:{submit:function(e){return e.preventDefault(),t.emailSignup(e)}}},[a("span",[t._v(t._s(t.$t("email")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.emailString,expression:"emailString"}],staticClass:"text-field",staticStyle:{"margin-top":"5px"},attrs:{type:"text",placeholder:"Email",spellcheck:"false"},domProps:{value:t.emailString},on:{input:function(e){e.target.composing||(t.emailString=e.target.value)}}}),a("span",[t._v(t._s(t.$t("password")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordString,expression:"passwordString"}],staticClass:"text-field",staticStyle:{"margin-top":"5px"},attrs:{type:"password",placeholder:t.$t("password"),spellcheck:"false"},domProps:{value:t.passwordString},on:{input:function(e){e.target.composing||(t.passwordString=e.target.value)}}}),a("span",[t._v(t._s(t.$t("firstName")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.firstNameString,expression:"firstNameString"}],staticClass:"text-field",staticStyle:{"margin-top":"5px"},attrs:{type:"text",placeholder:t.$t("firstName"),spellcheck:"false"},domProps:{value:t.firstNameString},on:{input:function(e){e.target.composing||(t.firstNameString=e.target.value)}}}),a("span",[t._v(t._s(t.$t("lastName")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.lastNameString,expression:"lastNameString"}],staticClass:"text-field",staticStyle:{"margin-top":"5px"},attrs:{type:"text",placeholder:t.$t("lastName"),spellcheck:"false"},domProps:{value:t.lastNameString},on:{input:function(e){e.target.composing||(t.lastNameString=e.target.value)}}}),a("p",{staticStyle:{"padding-top":"10px",color:"#222"}},[t._v(t._s(t.$t("agreeToTerms"))+" "),a("a",{attrs:{target:"_blank",href:"https://trytickle.com/terms-of-service"}},[t._v(t._s(t.$t("termsOfService")))]),t._v(" "+t._s(t.$t("and"))+" "),a("a",{attrs:{target:"_blank",href:"https://trytickle.com/guest-refund-policy"}},[t._v(t._s(t.$t("privacyPolicy")))]),t._v(" Tickle.")]),t.showModalError?a("div",{staticClass:"error-wrapper-modal",staticStyle:{"margin-bottom":"20px","margin-top":"20px"}},[t._v(t._s(t.errorMessage))]):t._e(),a("button",{staticClass:"submit-button",staticStyle:{"margin-top":"20px"},on:{click:function(e){return e.preventDefault(),t.emailSignup(e)}}},[t._v(t._s(t.signupButtonText))])])])]),a("div",{staticClass:"overlay",attrs:{hidden:!t.showForgotPassModal}},[a("div",{staticClass:"signup-modal"},[a("h3",{staticStyle:{"margin-top":"-5px","padding-bottom":"20px"}},[t._v(t._s(t.$t("resetYourPassword")))]),a("button",{staticClass:"fas fa-times",staticStyle:{position:"absolute",right:"20px",top:"20px",color:"#ccc","margin-right":"-5px",outline:"none"},on:{click:function(e){e.preventDefault(),t.showForgotPassModal=!1}}}),a("form",{on:{submit:function(e){return e.preventDefault(),t.sendResetPasswordEmail(e)}}},[a("span",[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.emailString,expression:"emailString"}],staticClass:"text-field",staticStyle:{"margin-top":"5px"},attrs:{type:"text",placeholder:"Email",spellcheck:"false"},domProps:{value:t.emailString},on:{input:function(e){e.target.composing||(t.emailString=e.target.value)}}}),a("div",{staticStyle:{"margin-bottom":"20px","margin-top":"5px"}},[t._v(t._s(t.$t("resetEmailSent")))]),t.showModalError?a("div",{staticClass:"error-wrapper-modal",staticStyle:{"margin-bottom":"20px","margin-top":"20px"}},[t._v(t._s(t.errorMessage))]):t._e(),a("button",{staticClass:"submit-button",staticStyle:{"margin-top":"20px"},on:{click:function(e){return e.preventDefault(),t.sendResetPasswordEmail(e)}}},[t._v(t._s(t.$t("resetYourPassword")))])])])])],1)};i._withStripped=!0;var r={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header-img"},[e("img",{staticClass:"icon-image",attrs:{src:"/images/tickleIcon.png"}})])}]};e.a=r},vajV:function(t,e,a){var i=a("C1E8");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("2c52ab77",i,!1,{sourceMap:!1})}});