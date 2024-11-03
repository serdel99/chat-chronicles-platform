import { StoryStore } from "./story"

export type RewardRedemptionEvent = {
    id: string,
    broadcaster_user_id: string,
    user_login: string,
    user_name: string,
    user_input: string,
    type: string,
    reward: {
        id: string,
        title: string,
        cost: number,
        prompt: string
    },
    redeemed_at: string

}

export type PollEndEvent = {
    id: string
    broadcaster_user_id: string
    title: string
    status: "completed"
    choices: {
        id: string,
        title: string,
        bits_votes: number,
        votes: number
    }[]
}

export type ServerEvents = RewardRedemptionEvent | PollEndEvent

const isPollEvent = (event: ServerEvents): event is PollEndEvent => {
    return (event as PollEndEvent).choices !== undefined
}

export const handleServerEvent = (story: StoryStore, event: RewardRedemptionEvent | PollEndEvent) => {

    console.log(event)

    if (isPollEvent(event)) {
        return story.addPollResponse(event.id, event);
    }
    story.addPowerUp({
        type: event.type,
        user_name: event.user_name,
        title: event.reward.title
    })
}