<template>
  <div class="info-modal-wrapper">
     <div class="signup-modal">
        <h3 style="margin-top:-5px;padding-bottom:20px;">{{$t('addPaymentText')}}</h3>
         <h5 v-if="this.$store.state.user && this.$store.state.user.settings.payoutMethods" style="margin-top:-5px;padding-bottom:20px;">{{$t('addedAccount')}}: {{this.$store.state.user.settings.payoutMethods.accountNumber}}</h5>
        <button  v-if="this.$store.state.user && this.$store.state.user.settings.payoutMethods && !this.showInput" class="submit-button" style="margin-top:20px;" @click.prevent="showInput = true">{{$t("replaceAddedAccount")}}</button>
      
        <button class="fas fa-times" style="position:absolute;right:20px;top:20px;color:#ccc;margin-right:-5px;outline:none;" @click.prevent="$parent.togglePaymentMethod()"></button>
        <div v-if="(this.$store.state.user && !this.$store.state.user.settings.payoutMethods) || showInput">
        <form v-on:submit.prevent="emailSignup">
          <span>{{$t('bankCode')}}</span>
            <select name="bankcodes" class="menu-dropdown" v-model="bankCode">
                <option v-for="bankcode in bankCodes" :key="bankcode" :value="bankcode">{{bankcode}}</option>
            </select>
          <span>{{$t('accountNumber')}}</span>
          <input type="number" class="text-field" style="margin-top:5px;" :placeholder="$t('accountNumber')" spellcheck="false" v-model="accountNumber"/>
          <span>{{$t('accountHolderName')}}</span>
          <input type="text" class="text-field" style="margin-top:5px;" :placeholder="$t('accountHolderName')" spellcheck="false" v-model="accountHolderName"/>
          <div class="error-wrapper-modal" style="margin-bottom:20px;margin-top:20px;" v-if="showModalError">{{errorMessage}}</div>
          <button class="submit-button" style="margin-top:20px;" @click.prevent="addPayout()">{{$t("addPaymentMethod")}}</button>
        </form>
        </div>
      </div>
  </div>
</template>

<script>
import { db, auth } from "~/plugins/firebase";
export default {
  data() {
    return {
      accountNumber: "",
      accountHolderName: "",
      bankCode: "ACEH",
      showModalError: false,
      showInput: false,
      errorMessage: "",
      bankCodes: [
        "ACEH",
        "ACEH_UUS",
        "AGRIS",
        "AGRONIAGA",
        "AMAR",
        "ANDARA",
        "ANGLOMAS",
        "ANZ",
        "ARTA_NIAGA_KENCANA",
        "ARTHA",
        "ARTOS",
        "BALI",
        "BAML",
        "BANGKOK",
        "BANTEN",
        "BCA",
        "BCA_SYR",
        "BENGKULU",
        "BISNIS_INTERNASIONAL",
        "BJB",
        "BJB_SYR",
        "BNI",
        "BNI_SYR",
        "BNP_PARIBAS",
        "BOC",
        "BRI",
        "BRI_SYR",
        "BTN",
        "BTN_UUS",
        "BTPN_SYARIAH",
        "BUKOPIN",
        "BUKOPIN_SYR",
        "BUMI_ARTA",
        "CAPITAL",
        "CCB",
        "CENTRATAMA",
        "CHINATRUST",
        "CIMB",
        "CIMB_UUS",
        "CITIBANK",
        "COMMONWEALTH",
        "DAERAH_ISTIMEWA",
        "DAERAH_ISTIMEWA_UUS",
        "DANAMON",
        "DANAMON_UUS",
        "DBS",
        "DEUTSCHE",
        "DINAR_INDONESIA",
        "DKI",
        "DKI_UUS",
        "EXIMBANK",
        "FAMA",
        "GANESHA",
        "GOPAY",
        "HANA",
        "HARDA_INTERNASIONAL",
        "HIMPUNAN_SAUDARA",
        "HSBC",
        "HSBC_UUS",
        "ICBC",
        "INA_PERDANA",
        "INDEX_SELINDO",
        "INDIA",
        "JAMBI",
        "JAMBI_UUS",
        "JASA_JAKARTA",
        "JAWA_TENGAH",
        "JAWA_TENGAH_UUS",
        "JAWA_TIMUR",
        "JAWA_TIMUR_UUS",
        "JPMORGAN",
        "JTRUST",
        "KALIMANTAN_BARAT",
        "KALIMANTAN_BARAT_UUS",
        "KALIMANTAN_SELATAN",
        "KALIMANTAN_SELATAN_UUS",
        "KALIMANTAN_TENGAH",
        "KALIMANTAN_TIMUR",
        "KALIMANTAN_TIMUR_UUS",
        "KESEJAHTERAAN_EKONOMI",
        "LAMPUNG",
        "MALUKU",
        "MANDIRI",
        "MANDIRI_ECASH",
        "MANDIRI_SYR",
        "MANDIRI_TASPEN",
        "MASPION",
        "MAYAPADA",
        "MAYBANK",
        "MAYBANK_SYR",
        "MAYORA",
        "MEGA",
        "MEGA_SYR",
        "MESTIKA_DHARMA",
        "MITRA_NIAGA",
        "MITSUI",
        "MIZUHO",
        "MNC_INTERNASIONAL",
        "MUAMALAT",
        "MULTI_ARTA_SENTOSA",
        "NATIONALNOBU",
        "NUSANTARA_PARAHYANGAN",
        "NUSA_TENGGARA_BARAT",
        "NUSA_TENGGARA_BARAT_UUS",
        "NUSA_TENGGARA_TIMUR",
        "OCBC",
        "OCBC_UUS",
        "OKE",
        "OVO",
        "PANIN",
        "PANIN_SYR",
        "PAPUA",
        "PERMATA",
        "PERMATA_UUS",
        "PRIMA_MASTER",
        "QNB_INDONESIA",
        "RABOBANK",
        "RBS",
        "RESONA",
        "RIAU_DAN_KEPRI",
        "RIAU_DAN_KEPRI_UUS",
        "ROYAL",
        "SAHABAT_SAMPOERNA",
        "SBI_INDONESIA",
        "SHINHAN",
        "SINARMAS",
        "SINARMAS_UUS",
        "STANDARD_CHARTERED",
        "SULAWESI",
        "SULAWESI_TENGGARA",
        "SULSELBAR",
        "SULSELBAR_UUS",
        "SULUT",
        "SUMATERA_BARAT",
        "SUMATERA_BARAT_UUS",
        "SUMSEL_DAN_BABEL",
        "SUMSEL_DAN_BABEL_UUS",
        "SUMUT",
        "SUMUT_UUS",
        "TABUNGAN_PENSIUNAN_NASIONAL",
        "TOKYO",
        "UOB",
        "VICTORIA_INTERNASIONAL",
        "VICTORIA_SYR",
        "WOORI",
        "WOORI_SAUDARA",
        "YUDHA_BHAKTI"
      ]
    };
  },
  methods: {
    async addPayout() {
      if (
        this.accountNumber.length < 5 ||
        this.accountHolderName.length < 2 ||
        this.bankCode.length < 2
      ) {
        this.errorMessage = "Please make sure all detail is correct.";
        this.showModalError = true;
      } else {
        this.showModalError = false;
        let payout = {
          accountNumber: this.accountNumber,
          accountHolderName: this.accountHolderName,
          bankCode: this.bankCode
        };
        await db
          .collection("users")
          .doc(this.$store.state.user.userId)
          .update({ "settings.payoutMethods": payout });
        this.$parent.togglePaymentMethod();
        location.reload();
      }
    }
  }
};
</script>

<style scoped>
.info-modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
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
  background-color: rgba(0, 0, 0, 0);
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
    transform: scale(1);
    opacity: 1;
  }
}
.signup-modal {
  position: absolute;
  top: 10%;
  width: 40%;
  min-width: 500px;
  padding: 50px;
  background-color: white;
  border-radius: 6px;
  z-index: 100;
}
.content-wrapper {
  margin-top: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}
.submit-button {
  text-decoration: none;
  height: 50px;
  margin: 0;
  outline: none;
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
.menu-dropdown {
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0 20px 0 20px;
  color: black;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #fff url(/images/chevron-down.png) calc(100% - 20px) 15px;
  background-repeat: no-repeat;
}
</style>
