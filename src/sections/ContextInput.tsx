import { useTranslation } from "react-i18next";
import { useAxios, InitStoryResponse } from "@/services/api";
import { Response } from "@/components/response/response";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useStoryStore } from "@/store/story";
import { FormEventHandler } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isDataLoaded: boolean;
};

export const ContextInput = ({ isDataLoaded }: Props) => {
  const { t } = useTranslation();
  const story = useStoryStore();
  const [{ loading, error }, initStoryApi] = useAxios<InitStoryResponse>(
    {
      url: "/story/init",
      method: "POST",
    },
    { manual: true }
  );

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    
    story.startLoadingResponse();

    const response = await initStoryApi({
      data: {
        hero: story.hero,
        context: formData.get("context"),
      },
    });
    story.setStoryId(response.data.id);
    story.setInitStory({
      enemy: response.data.enemy,
      enemy_name: response.data.enemy_name,
      hero_name: response.data.hero_name,
    });
    story.addResponse(response.data.story_acts[0]);
  };

  return (
    <Response
      text={t("context")}
      isDataLoaded={Boolean(story.id)}
      isLoading={false}
    >
      <form onSubmit={handleOnSubmit}>
        <div className="flex justify-end  mt-10">
          <Textarea
            disabled={Boolean(story.id)}
            name="context"
            defaultValue={story.context}
            className="max-w-[90%] resize-none"
            maxLength={1200}
          />
        </div>

        <AnimatePresence>
          {!story.id && (
            <motion.div
              initial={{ opacity: isDataLoaded ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              exit={{ opacity: 0 }}
              className="flex justify-end  mt-10"
            >
              <Button size="lg" className="flex-shrink-0" type="submit">
                Select
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Response>
  );
};
