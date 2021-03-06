import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        labelShow: false,
        // Khai báo state
        list: [
            {
                "id": 1,
                "title": "Dang lam",
                "user_id": 1,
                "index": 1,
                "created_at": null,
                "updated_at": null,
                "cards": [
                    {
                        "id": 1,
                        "title": "The 1",
                        "description": "The 001",
                        "status": 1,
                        "directory_id": 1,
                        "index": 1,
                        "deadline": null,
                        "user_id": 1,
                        "created_at": null,
                        "updated_at": null,
                        "labels": [
                            {
                                "id": 5,
                                "name": "hungle",
                                "color": "red",
                                "user_id": 1,
                                "created_at": "2021-01-25T08:20:54.000000Z",
                                "updated_at": "2021-01-25T08:20:54.000000Z",
                                "pivot": {
                                    "card_id": 1,
                                    "label_id": 5,
                                    "created_at": "2021-01-25T08:20:54.000000Z",
                                    "updated_at": "2021-01-25T08:20:54.000000Z"
                                }
                            },
                            {
                                "id": 6,
                                "name": "hungle",
                                "color": "red",
                                "user_id": 1,
                                "created_at": "2021-01-25T08:23:53.000000Z",
                                "updated_at": "2021-01-25T08:23:53.000000Z",
                                "pivot": {
                                    "card_id": 1,
                                    "label_id": 6,
                                    "created_at": "2021-01-25T08:23:53.000000Z",
                                    "updated_at": "2021-01-25T08:23:53.000000Z"
                                }
                            },
                            {
                                "id": 7,
                                "name": "hungle",
                                "color": "red",
                                "user_id": 1,
                                "created_at": "2021-01-25T08:26:42.000000Z",
                                "updated_at": "2021-01-25T08:26:42.000000Z",
                                "pivot": {
                                    "card_id": 1,
                                    "label_id": 7,
                                    "created_at": "2021-01-25T08:26:42.000000Z",
                                    "updated_at": "2021-01-25T08:26:42.000000Z"
                                }
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "title": "The 2",
                        "description": "The 002",
                        "status": 1,
                        "directory_id": 1,
                        "index": 2,
                        "deadline": null,
                        "user_id": 1,
                        "created_at": null,
                        "updated_at": null,
                        "labels": [
                            {
                                "id": 3,
                                "name": "MIT-Zent",
                                "color": "green",
                                "user_id": 1,
                                "created_at": null,
                                "updated_at": null,
                                "pivot": {
                                    "card_id": 2,
                                    "label_id": 3,
                                    "created_at": null,
                                    "updated_at": null
                                }
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "title": "The 3",
                        "description": "The 002",
                        "status": 1,
                        "directory_id": 1,
                        "index": 2,
                        "deadline": null,
                        "user_id": 1,
                        "created_at": null,
                        "updated_at": null,
                        "labels": [
                            {
                                "id": 3,
                                "name": "MIT-Zent",
                                "color": "green",
                                "user_id": 1,
                                "created_at": null,
                                "updated_at": null,
                                "pivot": {
                                    "card_id": 2,
                                    "label_id": 3,
                                    "created_at": null,
                                    "updated_at": null
                                }
                            }
                        ]
                    },
                ]
            },
            {
                "id": 2,
                "title": "Da Hoan Thanh",
                "user_id": 1,
                "index": 2,
                "created_at": null,
                "updated_at": null,
                "cards": [
                    {
                        "id": 3,
                        "title": "The 3",
                        "description": "The 003",
                        "status": 1,
                        "directory_id": 2,
                        "index": 3,
                        "deadline": null,
                        "user_id": 1,
                        "created_at": null,
                        "updated_at": null,
                        "labels": [
                            {
                                "id": 4,
                                "name": "MISS-Zent",
                                "color": "origin",
                                "user_id": 1,
                                "created_at": null,
                                "updated_at": null,
                                "pivot": {
                                    "card_id": 3,
                                    "label_id": 4,
                                    "created_at": null,
                                    "updated_at": null
                                }
                            }
                        ]
                    }
                ]
            }
        ]

    },
    getters: {
        getList: (state) => (id) => {
            return state.list.find(list => list.id === id)
        }
    },
    mutations: {
        addCard(state, data){
            state.list.find(list => list.id === data.list_id).cards.push(data.card)
        },
        addList(state, data){
            state.list.push(data)
        },
        showLable(state){
            state.labelShow = !state.labelShow
        },

    },
}