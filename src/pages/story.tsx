import { useEffect } from "react";

import { GallerySelection } from "@/sections/CharacterSelection";
import { ContextInput } from "@/sections/ContextInput";
import { FinishStorySelection } from "@/sections/FinishStorySection";
import { useValidateAuth } from "@/hooks/useValidateAuth";
import { useStoryStore } from "@/store/story";
import { OptionSelection } from "@/sections/OptionSelection";

import { useUserStore } from "../store/user";
import { handleServerEvent, ServerEvents } from "../store/utils";
import { useRoute } from "wouter";
import { useStoryList } from "@/store/storyList";

const API_URL = import.meta.env.VITE_API_URL;

export const Story = () => {
  const [match, params] = useRoute("/story/:id");
  const user = useUserStore();
  const story = useStoryStore();
  const storyList = useStoryList();

  useEffect(() => {
    if (match) {
      const storyLoad = storyList.stories[params.id as unknown as number];
      story.loadStory({ ...storyLoad, isDataLoaded: true });
    }
  }, [params?.id]);

  useEffect(() => {
    if (story.id) {
      const evtSource = new EventSource(
        `${API_URL}:3000/story/storyEvents?userId=${user.id}`
      );
      evtSource.onmessage = (event) => {
        const parsedEvent = JSON.parse(event.data) as ServerEvents;
        handleServerEvent(story, parsedEvent);
      };
      evtSource.onopen = () => {
        console.log("Open sse");
      };
      return () => evtSource.close();
    }
  }, [story.id]);

  useValidateAuth();

  console.log(story);

  return (
    <div className="mt-10 mx-auto flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
      <GallerySelection isDataLoaded={story.isDataLoaded} />

      {story.hero && <ContextInput isDataLoaded={story.isDataLoaded} />}

      {story.story_acts?.map(
        ({ data, id, pollResponse, isLoading, type }, index) => {
          const Component =
            type === "final_act" ? FinishStorySelection : OptionSelection;

          return (
            <Component
              powerups={story.powerups}
              key={id}
              response={pollResponse}
              action={data?.action!}
              text={data?.next_history}
              options={data?.options}
              enemyHealt={data?.enemy_healt}
              enemy={story?.enemy!}
              enemyName={story.enemy_name!}
              heroName={story.hero_name!}
              heroHealt={data?.hero_healt}
              hero={story.hero!}
              isLoading={isLoading}
              isDataLoaded={Boolean(story.isDataLoaded)}
              isLastResponse={story.story_acts?.length === index + 1}
            />
          );
        }
      )}
    </div>
  );
};
