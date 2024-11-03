import { useValidateAuth } from "./hooks/useValidateAuth";
import { GallerySelection } from "@/sections/CharacterSelection";
import { ContextInput } from "@/sections/ContextInput";
import { useStoryStore } from "./store/story";
import { OptionSelection } from "./sections/OptionSelection";
import { useEffect } from "react";
import { FinishStorySelection } from "./sections/FinishStorySection";

const App = () => {
  const story = useStoryStore();

  useEffect(() => {
    if (story.id) {
      const evtSource = new EventSource(
        `http://localhost:3000/story/storyEvents?storyId=${story.id}`
      );
      evtSource.onmessage = (event) => {
        const pollEvent = JSON.parse(event.data);
        console.log(pollEvent);
        story.addPollResponse(pollEvent.id, pollEvent);
      };
      evtSource.onopen = () => {
        console.log("Open sse");
      };
      return () => evtSource.close();
    }
  }, [story.id]);

  useValidateAuth();

  console.log(story.isDataLoaded);

  return (
    <div className="mt-10 mx-auto flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
      <GallerySelection isDataLoaded={story.isDataLoaded} />

      {story.hero && <ContextInput isDataLoaded={story.isDataLoaded} />}

      {story.story_acts?.map(
        ({ data, id, pollResponse, isDataLoaded, isLoading, type }, index) => {
          const Component =
            type === "final_act" ? FinishStorySelection : OptionSelection;

          return (
            <Component
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
              isDataLoaded={Boolean(isDataLoaded)}
              isLastResponse={story.story_acts?.length === index + 1}
            />
          );
        }
      )}
    </div>
  );
};

export default App;
