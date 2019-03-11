<template>
  <div class="menu-button">
    <button class="text-block link" style="color:rgba(0,0,0,0.7);height:100%;background-color:rgba(0,0,0,0);">{{ language }}</button>
    <div class="menu">
      <div v-for="locale in availableLocales" :key="locale.code" @click="changeLocale(locale.code)">
        <div class="menu-item-cell">
          <button class="link menu-item">{{ locale.name }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localePickerVisible: false
    }
  },
  computed: {
    language() {
      switch (this.$i18n.locale) {
        case 'en': return 'English';
        case 'id': return 'Bahasa Indonesia';
        default: return 'Bahasa Indonesia';
      }
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => this.$i18n.locale)
    }
  },
  methods: {
    handleLanguageClick() {
      if (this.localePickerVisible) {
        this.localePickerVisible = false;
      } else {
        this.localePickerVisible = true;
      }
    },
    changeLocale(code) {
      this.localePickerVisible = false;
      this.$router.push(this.switchLocalePath(code));
    }
  }
}
</script>

<style scoped>
.menu-button {
  position: relative;
  display: inline-block;
  padding-bottom: 30px;
}
.menu {
  display: none;
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: white;
  z-index: 100;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding-top: 18px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  max-height: 80vh;
  overflow: auto;
}
.menu-item {
  text-align: left;
  overflow: hidden;
  padding-bottom: 8px;
}
.menu-button:hover .menu {
  display: block;
}
.menu-item-cell {
  display:grid;
  grid-template-columns: 200px auto;
  align-items: center;
}
</style>
