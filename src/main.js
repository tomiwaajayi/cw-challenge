import Vue from 'vue';
import App from './App.vue';
// Import vuexstore
import { store } from './store';
// lazy-load directive
import LazyLoadDirective from '@/directives/LazyLoadDirective';

Vue.directive('lazyload', LazyLoadDirective);

Vue.config.productionTip = false;

new Vue({ store, render: (h) => h(App) }).$mount('#app');
