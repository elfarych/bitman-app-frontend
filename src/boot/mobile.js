import Vue from 'vue'
import { Platform } from 'quasar'

Vue.prototype.$mobile = !Platform.is.desktop
