import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { loadFonts } from './plugins/webfontloader';

// Loads the Google fonts
loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(vuetify).use(router).use(pinia).mount('#app');
