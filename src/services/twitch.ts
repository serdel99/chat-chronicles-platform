
import { makeUseAxios } from 'axios-hooks'

import axios from 'axios'

import { useUserStore } from '@/store/user';

const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;

export const useTwitchApi = makeUseAxios({
    axios: axios.create({
        baseURL: 'https://api.twitch.tv/',
        transformRequest: (data, headers) => {

            const { access_token } = useUserStore.getState();

            headers['Authorization'] = `Bearer ${access_token}`

            headers['Client-Id'] = clientId

            return data
        }
    })
})

export type GetUserReponse = {
    data: [{
        id: string
        display_name: string
        profile_image_url: string
    }]
}
