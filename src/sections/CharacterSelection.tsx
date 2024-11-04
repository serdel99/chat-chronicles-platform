import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Response } from "@/components/response/response";
import { characters } from "../data/characters";
import { Character } from "../components/character/character";
import { Button } from "@/components/ui/button";

import { useStoryStore } from "@/store/story";
import { LoginDialog } from "@/components/login-dialog/login-dialog";
import { useUserStore } from "@/store/user";

type Props = {
  isDataLoaded: boolean;
};

export const GallerySelection = ({ isDataLoaded }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const story = useStoryStore();
  const user = useUserStore();

  return (
    <>
      <LoginDialog isOpen={isDialogOpen} setOpen={setDialogOpen} />
      <Response
        text={t("welcome")}
        isDataLoaded={Boolean(story.hero)}
        isLoading={false}
        isLastReponse={!story.id}
      >
        <div className="mt-5 grid grid-cols-3 gap-5 justify-items-center">
          {Object.values(characters).map((data) => {
            return (
              <Character
                key={data.name}
                isSelected={data.name === story.hero}
                onClick={() => {
                  if (!user.display_name) {
                    setDialogOpen(true);
                    return;
                  }
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
    </>
  );
};
