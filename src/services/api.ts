
import { makeUseAxios } from 'axios-hooks'

import axios from 'axios'

import { useUserStore } from '@/store/user'

const API_URL = import.meta.env.VITE_API_URL;

export const useAxios = makeUseAxios({
    axios: axios.create({
        baseURL: API_URL,

        transformRequest: function (data, headers) {
            const { id_token, access_token } = useUserStore.getState()
            headers['Authorization'] = id_token
            headers['x-twitch-token'] = access_token
            headers['Content-Type'] = "application/json"
            return JSON.stringify(data)
        }
    })
})

export type InitStoryResponse = {

    "id": number
    "createdAt": string
    "user_id": string
    "enemy": string,
    "hero": string
    "hero_name": string
    "enemy_name": string
    "story_acts": [
        {
            "id": number
            "createdAt": string
            "story_id": number
            "type": string
            "data": {
                "options": string[]
                "hero_healt": number,
                "enemy_healt": number,
                "next_history": string
            }
        }
    ]

}

export type GenerateActResponse = {
    "id": number,
    "pollId": string,
    "type": "act",
    "data": {
        "action": string,
        "options": string[]
        "hero_healt": number,
        "enemy_healt": number,
        "next_history": string
    }
}


export type UserResponse = {
    user: {
        id: string,
        login: string,
        display_name: string,
        broadcaster_type: string,
        profile_image_url: string,
        type: string
    },
    access_token: string
}