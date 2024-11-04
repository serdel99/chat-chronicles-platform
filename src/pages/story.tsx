import { useEffect } from "react";
import { io } from "socket.io-client";
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
const WS_URL = import.meta.env.VITE_NOTIFICATION_API_URL;

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
    const socket = io(WS_URL, {
      extraHeaders: {
        Authorization: user.id_token || "",
      },
    });

    socket.on("connect", () => {
      console.log("Socket conected");
    });

    socket.on("notification", (event) => {
      const parsedEvent = event as ServerEvents;

      handleServerEvent(story, parsedEvent);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconect");
    });

    return () => {
      socket.disconnect();
    };
  }, [story.id]);

  useValidateAuth();

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
