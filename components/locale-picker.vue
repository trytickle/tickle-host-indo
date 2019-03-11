<template>
  <div class="menu-button" :style="isMenu ? 'margin-top:30px;text-align:left;height:50px;' : 'position:fixed;top:30px;right:0;height:40px;'">
    <button class="text-block link" :style="isMenu ? '' : 'color:rgba(0,0,0,0.7);'" style="background-color:rgba(0,0,0,0);"><i class="fas fa-comment" style="font-size:12px;margin-right:10px;"></i>{{ language }}</button>
    <div class="menu" :style="isMenu ? 'top:35px;left:0;right:0;' : ''">
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
  props: {
    isMenu: false
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
  min-width: 240px;
  text-align: right;
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
  display: inline-block;
}
</style>
