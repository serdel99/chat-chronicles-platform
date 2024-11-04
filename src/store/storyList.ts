import { create } from 'zustand';
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'
import { StoryStoreState, useStoryStore } from "./story"

type StoryList = {
    stories: Record<number, StoryStoreState>
}

type StoryListActions = {
    addStory: (id: number, story: StoryStoreState) => void
}

type StoryListStore = StoryList & StoryListActions



export const useStoryList = create(
    persist(
        subscribeWithSelector<StoryListStore>((set) => ({
            stories: {},
            addStory: (id, storyStore) => {
                set((state) => {
                    if (state.stories[id]) {
                        return {
                            ...state,
                            stories: {
                                ...state.stories,
                                [id]: { ...state.stories[id], ...storyStore }
                            },
                        }
                    }
                    return {
                        ...state,
                        stories: {
                            ...state.stories,
                            [id]: { ...storyStore }
                        },
                    }
                })
            }
        })),
        { name: "story-list", storage: createJSONStorage(() => localStorage) }
    ),
);


useStoryStore.subscribe((state) => state, (storyState) => {
    if (storyState.id) {
        useStoryList.getState().addStory(storyState.id, JSON.parse(JSON.stringify(storyState)))
    }
})

