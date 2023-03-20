import { Framework } from 'vuetify'
import Vue from 'vue'
declare module '*.vue' {
  interface Vue {
    $vuetify: Framework
  }

  export default Vue
}
