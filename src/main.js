import { createApp } from 'vue';
import App from './App.vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';

createApp(App)
    .use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyClmQc3eW7EbCocMH9cERxUAgZuWA3BDEg',
            libraries: 'places',
        }
    })
    .mount('#app');
