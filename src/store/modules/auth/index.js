import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authUser: {},
    },
    getters: {
        //
    },
    actions:{

    }
    ,
    mutations: {
        updateLoginStatus (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        updateAuthUser (state, authUser) {
            state.authUser = authUser;
        }
    },
}