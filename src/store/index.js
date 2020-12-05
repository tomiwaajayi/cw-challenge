import Vue from 'vue'
import Vuex from 'vuex'
import { searchPhotos } from '@/services/unsplash.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  //
  state: {
    loading: true,
    searchingFor: '',
    searchedFor: '',
    unsplashData: '',
    selectedImage: {},
    isModalVisible: false,
    errorMessage: ''
  },

  mutations: {
    SET_LOADING_STATUS(state, payload) {
      state.loading = payload
    },
    SET_SEARCHING_FOR(state, payload) {
      state.searchingFor = payload
    },
    SET_SEARCHED_FOR(state, payload) {
      state.searchedFor = payload
    },
    SET_UNSPLASH_DATA(state, payload) {
      state.unsplashData = payload
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload
    },
    SET_IS_MODAL_VISIBLE(state, payload) {
      state.isModalVisible = payload
    },
    SET_SELECTED_IMAGE(state, id) {
      state.selectedImage = state.unsplashData.find((el) => el.id === id)
    }
  },

  actions: {
    getPhotos({ commit }, query) {
      if (query.trim()) {
        // Search query parameter for making the api call
        const param = {
          query
        }
        // Reset searched parameters
        commit('SET_LOADING_STATUS', true)
        commit('SET_SEARCHING_FOR', query)
        commit('SET_SEARCHED_FOR', '')

        // Search photos
        searchPhotos(param)
          .then((res) => {
            commit('SET_ERROR_MESSAGE', '')
            commit('SET_UNSPLASH_DATA', res.results)
            commit('SET_LOADING_STATUS', false)
            commit('SET_SEARCHING_FOR', '')
            commit('SET_SEARCHED_FOR', query)
          })
          .catch((err) => {
            commit('SET_SEARCHING_FOR', '')
            commit('SET_SEARCHED_FOR', '')
            commit('SET_UNSPLASH_DATA', '')
            commit('SET_ERROR_MESSAGE', err)
            commit('SET_LOADING_STATUS', false)
          })
      }
    },

    // Fuction to load latest "African" pictures on page load
    getPhotosOnLoad({ commit }) {
      searchPhotos({ query: 'African', order_by: 'latest' })
        .then((res) => {
          commit('SET_ERROR_MESSAGE', '')
          commit('SET_UNSPLASH_DATA', res.results)
          commit('SET_LOADING_STATUS', false)
        })
        .catch((err) => {
          commit('SET_UNSPLASH_DATA', '')
          commit('SET_ERROR_MESSAGE', err)
          commit('SET_LOADING_STATUS', false)
        })
    },

    toggleModal({ commit }, id) {
      commit('SET_SELECTED_IMAGE', id)
      commit('SET_IS_MODAL_VISIBLE', true)
    }
  },

  getters: {
    searchingFor(state) {
      return state.searchingFor
    },
    searchedFor(state) {
      return state.searchedFor
    },
    loading(state) {
      return state.loading
    },
    unsplashData(state) {
      return state.unsplashData
    },
    isModalVisible(state) {
      return state.isModalVisible
    },
    selectedImage(state) {
      return state.selectedImage
    },
    errorMessage(state) {
      return state.errorMessage
    }
  }
})
