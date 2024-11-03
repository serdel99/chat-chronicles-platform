import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Response } from "@/components/response/response";
import { characters } from "../data/characters";
import { Character } from "../components/character/character";
import { Button } from "@/components/ui/button";

import { useStoryStore } from "@/store/story";

type Props = {
  isDataLoaded: boolean;
};

export const GallerySelection = ({ isDataLoaded }: Props) => {
  const { t } = useTranslation();
  const story = useStoryStore();

  return (
    <Response
      text={t("welcome")}
      isDataLoaded={Boolean(story.hero)}
      isLoading={false}
    >
      <div className="mt-5 grid grid-cols-3 gap-5 justify-items-center">
        {Object.values(characters).map((data) => {
          return (
            <Character
              key={data.name}
              isSelected={data.name === story.hero}
              onClick={() => {
                if (!story.id) {
                  story.setCharacter(data.name);
                }
              }}
              {...data}
            />
          );
        })}
      </div>
    </Response>
  );
};
