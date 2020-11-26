import Vue from 'vue';
import Vuex from 'vuex';
import { searchPhotos } from '@/services/unsplash.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
	//
	state: {
		loading: true,
		searchingFor: '',
		searchedFor: '',
		unsplashData: null,
		selectedImage: {},
		isModalVisible: false,
	},

	mutations: {
		setLoadingStatus(state, payload) {
			state.loading = payload;
		},
		setSearchingFor(state, payload) {
			state.searchingFor = payload;
		},
		setSearchedFor(state, payload) {
			state.searchedFor = payload;
		},
		setUnsplashData(state, payload) {
			state.unsplashData = payload;
		},
		setIsModalVisible(state, payload) {
			state.isModalVisible = payload;
		},
		setSelectedImage(state, id) {
			state.selectedImage = state.unsplashData.find((el) => el.id === id);
		},
	},

	actions: {
		getPhotos(context, query) {
			if (query.trim()) {
				// Search query parameter for making the api call
				const param = {
					query,
				};
				// Reset searched parameters
				context.commit('setLoadingStatus', true);
				context.commit('setSearchedFor', '');
				context.commit('setSearchingFor', query);

				// Search photos
				searchPhotos(param)
					.then((res) => {
						context.commit('setUnsplashData', res.results);
						context.commit('setLoadingStatus', false);
						context.commit('setSearchingFor', '');
						context.commit('setSearchedFor', query);
					})
					.catch(() => {
						context.commit('setSearchingFor', '');
						context.commit('setSearchedFor', '');
						context.commit('setUnsplashData', null);
						context.commit('setLoadingStatus', false);
					});
			}
		},

		// Fuction to load latest "African" pictures on page load
		getPhotosOnLoad(context) {
			searchPhotos({ query: 'African', order_by: 'latest' })
				.then((res) => {
					context.commit('setUnsplashData', res.results);
					context.commit('setLoadingStatus', false);
				})
				.catch(() => {
					context.commit('setUnsplashData', null);
					context.commit('setLoadingStatus', false);
				});
		},

		toggleModal(context, id) {
			context.commit('setSelectedImage', id);
			context.commit('setIsModalVisible', true);
		},
	},

	getters: {
		searchingFor(state) {
			return state.searchingFor;
		},
		searchedFor(state) {
			return state.searchedFor;
		},
		loading(state) {
			return state.loading;
		},
		unsplashData(state) {
			return state.unsplashData;
		},
		isModalVisible(state) {
			return state.isModalVisible;
		},
		selectedImage(state) {
			return state.selectedImage;
		},
	},
});
