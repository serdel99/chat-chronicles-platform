import { FormEventHandler, Fragment, useId, useState } from "react";
import { Response } from "@/components/response/response";
import { useAxios, GenerateActResponse } from "@/services/api";
import { PollResponse, useStoryStore } from "@/store/story";
import { useFocusResponse } from "@/hooks/useFocusResponse";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ReactLoading from "react-loading";
import { Button } from "@/components/ui/button";
import { Battle } from "@/components/battle/battle";
import { Character } from "@/components/character/character";
import { characters } from "@/data/characters";

type Props = {
  text?: string;
  options?: string[];
  action?: string;
  enemyHealt?: number;
  heroHealt?: number;
  hero?: string;
  enemy?: string;
  heroName?: string;
  enemyName?: string;
  response?: PollResponse;
  isDataLoaded?: boolean;
  isLoading: boolean;
  isLastResponse: boolean;
};

export const FinishStorySelection = ({
  text,
  options,
  action,
  response,
  isDataLoaded,
  enemyHealt,
  heroHealt,
  hero,
  enemy,
  heroName,
  enemyName,
  isLoading,
  isLastResponse,
}: Props) => {
  const story = useStoryStore();
  const element = useFocusResponse();

  const [_, generate] = useAxios<GenerateActResponse>(
    { url: `/story/${story.id}/generate`, method: "POST" },
    { manual: true }
  );

  const onClickContinue = async () => {
    story.startLoadingResponse();
    const winnerOption = response?.choices.reduce((maxObj, currentObj) =>
      currentObj.votes > maxObj.votes ? currentObj : maxObj
    );
    const responseApi = await generate({
      data: {
        selectedOption: winnerOption?.title,
      },
    });
    story.addResponse(responseApi.data);
  };

  const winner =
    heroHealt && heroHealt > 0
      ? { character: hero, name: heroName }
      : { character: enemy, name: enemyName };

  return (
    <div ref={element}>
      <Response
        text={text!}
        isDataLoaded={isDataLoaded!}
        isLoading={isLoading}
        isLastReponse={isLastResponse}
      >
        <div className="flex justify-center w-full">
          <div className="w-[50%] flex flex-col items-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">¡Ganador!</h2>
            <div className="relative  mb-4 ">
              <Character {...characters[winner.character]} />
            </div>
            <h3 className="text-2xl font-bold text-white">{winner.name}</h3>
          </div>
        </div>
      </Response>
    </div>
  );
};
