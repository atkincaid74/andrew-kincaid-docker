import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#00786A',
        secondary: '#607d8b',
        accent: '#00bcd4',
        error: '#f44336',
        warning: '#ff9800',
        info: '#ffc107',
        success: '#4caf50',
      },
      dark: {
        primary: '#00786A',
        secondary: '#607d8b',
        accent: '#00bcd4',
        error: '#db3f35',
        warning: '#D89C07',
        info: '#d37000',
        success: '#4a964b',
      }
    }
  }
});
