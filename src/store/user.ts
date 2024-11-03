import { create } from 'zustand';
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'


type User = {
    id?: string
    display_name?: string
    profile_image_url?: string
    access_token?: string
    id_token?: string
}

type AddUserParams = {
    id?: string,
    display_name: string,
    profile_image_url: string,

}

type UserStoreActions = {
    addUser: ({
        id,
        display_name,
        profile_image_url,
    }: AddUserParams) => void
    addAccessToken: (access_token: string, id_token: string) => void
}

type StoryStore = User & UserStoreActions

export const useUserStore = create(
    persist(
        subscribeWithSelector<StoryStore>((set) => ({
            addAccessToken: (access_token, id_token) => {
                set(state => ({ ...state, access_token, id_token }))
            },
            addUser: ({
                id,
                display_name,
                profile_image_url,
            }) => {
                set((state) => ({
                    ...state,
                    id,
                    display_name,
                    profile_image_url,
                }))
            },
        })),
        { name: "twitch-user", storage: createJSONStorage(() => localStorage) }
    ),
);


