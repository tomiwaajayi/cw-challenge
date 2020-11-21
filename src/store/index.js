import Vue from 'vue';
import Vuex from 'vuex';
import { searchPhotos } from '@/services/unsplash.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		query: '',
		loading: false,
		searchinFor: '',
		searchedFor: '',
		usplashData: [],
	},
	getters: {
		usplashData: (state) => {
			return state.unsplashData;
		},
	},
	mutations: {
		resetSearchParams: (state) => {
			(state.searchinFor = ''), (state.searchedFor = '');
		},
		setLoadingStatus: (state) => {
			(state.loading = true), (state.searchingFor = this.$refs.search.value);
		},
	},
	actions: {
		getPhotos({ commit }) {
			let query = this.$refs.search.value;
			// Search parameter for making the api call
			const param = {
				query,
			};
			// Reset searched parameters
			commit('resetSearchParams');
			// this.searchingFor = '';
			// this.searchedFor = '';
			// Set loading state when making API call
			commit('setLoadingStatus');
			this.loading = true;
			this.searchingFor = this.$refs.search.value;

			let that = this; //For this to be scoped in the function below
			searchPhotos(param).then((res) => {
				console.log(res.results);
				that.unsplashData = res.results;
				that.loading = false;
				that.searchingFor = '';
				that.searchedFor = query;
				that.$refs.search.value = '';
			});
		},
	},
});
