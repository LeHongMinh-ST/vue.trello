import axios from 'axios'
import store from "../store";
import router from "../router";
// Lấy ra các biến cần thiết: base url, token
const baseUrl = process.env.VUE_APP_BASE_URL;
const token = localStorage.getItem('access_token');
// Tạo instance của axios
export const apiAxios = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        },
        common: {
            'Authorization': `Bearer ${token}`
        }
    }
})
// Xử lý logout khi response 401
apiAxios.interceptors.response.use(undefined, (error) => {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
            store.commit('auth/updateLoginStatus', false)
            store.commit('auth/updateAuthUser', {})
            localStorage.removeItem('access_token')
            return router.push({name: 'Login'})
        }
    }
})
// Khai báo các request sử dụng trong hệ thống
export default {
    getAuthUser() {
        return apiAxios({
            method: 'get',
            url: '/auth/me'
        })
    },
    register(data) {
        return apiAxios({
            method: 'post',
            url: 'auth/register',
            data: data
        })
    },
    login(data) {
        return apiAxios({
            method: 'post',
            url: 'auth/login',
            data: data
        })
    },

    //list
    getList() {
        return apiAxios({
            method: 'get',
            url: '/directories'
        })
    },
    addList(data) {
        return apiAxios({
            method: 'post',
            url: '/directories',
            data: data
        })
    },
    updateTitleList(data, id) {
        return apiAxios({
            method: 'put',
            url: '/directories/' + id,
            data: data
        })
    },
    changeIndexList(data,id){
        return apiAxios({
            method: 'put',
            url: 'directories/' + id + '/index',
            data:data
        })
    },


    //cards
    addCards(data) {
        return apiAxios({
            method: 'post',
            url: '/cards',
            data: data
        })
    },
    getCard(id) {
        return apiAxios({
            method: 'get',
            url: '/cards/' + id,
        })
    },
    changeCardList(data, id) {
        return apiAxios({
            method: 'put',
            url: 'cards/' + id + '/directory',
            data:data
        })
    },

    //label
    getLabels() {
        return apiAxios({
            method: 'get',
            url: '/labels'
        })
    },
    addLabel(data,id){
        return apiAxios({
            method: 'post',
            url: '/cards'+id+'/label',
            data: data
        })
    }
}