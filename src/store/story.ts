import { create } from 'zustand';
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'


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

type StoryStoreState = {
    id?: number,
    hero?: string,
    hero_name?: string
    enemy?: string
    enemy_name?: string
    context?: string,
    lang: string,
    story_acts: StoryActs[]
    isDataLoaded: boolean,
}

type StoryStoreActions = {
    addResponse: (Response: Omit<StoryActs, "isLoading">) => void
    addPollResponse: (pollId: string, response: PollResponse) => void,
    setCharacter: (character: string) => void
    setStoryId: (id: number) => void
    setDataLoaded: () => void
    setContext: (context: string) => void
    startLoadingResponse: () => void,
    setInitStory: ({ enemy, hero_name, enemy_name }: { enemy: string, hero_name: string, enemy_name: string }) => void
}

type StoryStore = StoryStoreState & StoryStoreActions

export const useStoryStore = create(persist(subscribeWithSelector<StoryStore>(
    (set) => ({
        lang: window.navigator.language || 'en',
        storyId: undefined,
        story_acts: [],
        isDataLoaded: false,
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
            set((state) => ({ ...state, story_acts: [...state.story_acts, { isLoading: true }] }))
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
    })),
    {
        name: "currentStory",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => Object.fromEntries(
            Object.entries(state).filter(([key]) => !['isDataLoaded'].includes(key)),
        ),
        onRehydrateStorage: () => {
            return (state, error) => {
                state?.setDataLoaded();
            }
        },
    }
));