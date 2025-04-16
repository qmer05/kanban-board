import { createApp } from 'vue'
import App from './App.vue'

// Vuetify import
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icons (valgfrit men anbefalet)
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// CSS (kan du selv style senere)
import './style.css'

// Opret Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// Mount app med Vuetify
createApp(App).use(vuetify).mount('#app')
