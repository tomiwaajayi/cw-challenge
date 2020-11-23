import Vue from 'vue';
import App from './App.vue';
// Import lazy-load directive
import LazyLoadDirective from '@/directives/LazyLoadDirective';

Vue.directive('lazyload', LazyLoadDirective);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount('#app');
