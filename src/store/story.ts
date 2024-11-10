import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'


export type PollResponse = {
    id: string
    title: string
    status: "completed"
    choices: {
        id: string,
        title: string,
        bits_votes: number,
        votes: number
    }[]
}

type Powerup = {
    user_name: string, type: "ENEMY_DEFENSE" | "ENEMY_POWER_ATTACK_UP" | "HERO_DEFENSE" | "HERO_POWER_ATTACK_UP"
}

type StoryActs = {
    data?: {
        next_history: string
        options: string[]
        hero_healt: number,
        enemy_healt: number,
        action: string,
    },
    pollId?: string
    type?: "final_act" | "next_act",
    id?: number
    pollResponse?: PollResponse
    isDataLoaded?: boolean
    isLoading: boolean
}

export type StoryStoreState = {
    id?: number,
    hero?: string,
    hero_name?: string
    enemy?: string
    enemy_name?: string
    context?: string,
    lang: string,
    powerups: {
        "ENEMY_DEFENSE": Powerup[],
        "ENEMY_POWER_ATTACK_UP": Powerup[],
        "HERO_DEFENSE": Powerup[]
        "HERO_POWER_ATTACK_UP": Powerup[]
    },
    story_acts: StoryActs[]
    isDataLoaded: boolean,
}

type StoryStoreActions = {
    addResponse: (Response: Omit<StoryActs, "isLoading">) => void
    addPollResponse: (pollId: string, response: PollResponse) => void,
    addPowerUp: (powerup: Powerup) => void,
    setCharacter: (character: string) => void
    setStoryId: (id: number) => void
    setDataLoaded: () => void
    setContext: (context: string) => void
    startLoadingResponse: () => void,
    resetStore: () => void
    loadStory: (story: StoryStoreState) => void,
    disableLoading: () => void
    setInitStory: ({ enemy, hero_name, enemy_name }: { enemy: string, hero_name: string, enemy_name: string }) => void
}

export type StoryStore = StoryStoreState & StoryStoreActions

const initalStore = {
    lang: window.navigator?.language || 'en',
    storyId: undefined,
    story_acts: [],
    isDataLoaded: false,
    powerups: {
        "ENEMY_DEFENSE": [],
        "ENEMY_POWER_ATTACK_UP": [],
        "HERO_DEFENSE": [],
        "HERO_POWER_ATTACK_UP": []
    },
}

export const useStoryStore = create(subscribeWithSelector<StoryStore>(
    (set) => ({
        ...initalStore,
        addPollResponse: (pollId, response) => {
            set(state => {
                const updatedActs = state.story_acts.map((storyAct) => {
                    if (storyAct.pollId === pollId) {
                        return { ...storyAct, pollResponse: response }
                    } return storyAct
                })
                return { ...state, story_acts: updatedActs }
            })
        },
        startLoadingResponse: () => {
            set((state) => ({ ...state, story_acts: [...state.story_acts, { isLoading: true, powerups: [] }] }))
        },
        disableLoading: () => {
            set((state) => ({ ...state, story_acts: [...state.story_acts.filter(({ isLoading }) => !isLoading)] }))
        },
        addResponse: (response) => {
            set((state) => ({
                ...state, story_acts: state.story_acts.map((act) => {
                    if (act.isLoading) {
                        return { ...response, isLoading: false, }
                    } return act
                })
            }))
        },
        addPowerUp: (powerup) => {
            set(state => ({
                ...state,
                powerups: { ...state.powerups, [powerup.type]: [...state.powerups[powerup.type], powerup] },
            }))
        },
        setCharacter: (character: string) => {
            set((state) => ({ ...state, hero: character }))
        },
        setStoryId: (id: number) => {
            set(state => ({ ...state, id }))
        },
        setContext: (context: string) => {
            set(state => ({ ...state, context }))
        },
        setDataLoaded: () => { set((state) => ({ ...state, story_acts: state.story_acts.map((act) => ({ ...act, isDataLoaded: true })) })) },
        setInitStory({ hero_name, enemy_name, enemy }) {
            set(state => ({ ...state, hero_name, enemy_name, enemy }))
        },
        loadStory: (story: StoryStoreState) => {
            set(story)
        },
        resetStore: () => {
            set(initalStore)
        }
    })),
);