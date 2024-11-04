import { FormEventHandler, Fragment, useId, useState } from "react";
import { Response } from "@/components/response/response";
import { useAxios, GenerateActResponse } from "@/services/api";
import { PollResponse, StoryStore, useStoryStore } from "@/store/story";
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
  powerups: StoryStore["powerups"];
};

export const OptionSelection = ({
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
  powerups,
}: Props) => {
  const story = useStoryStore();
  const element = useFocusResponse();

  const [_, generate] = useAxios<GenerateActResponse>(
    { url: `/story/${story.id}/generate`, method: "POST" },
    { manual: true }
  );

  const totalVote =
    response?.choices.reduce((count, choice) => count + choice.votes, 0) ?? 1;

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

  return (
    <div ref={element}>
      <Response
        text={text!}
        isDataLoaded={isDataLoaded!}
        isLoading={isLoading}
        isLastReponse={isLastResponse}
      >
        <div className="my-4">
          <Battle
            powerups={powerups}
            enemyName={enemyName!}
            enemy={enemy!}
            enemyhealth={enemyHealt!}
            hero={hero!}
            heroName={heroName!}
            herohealth={heroHealt!}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="leading-6">{action}</CardTitle>
          </CardHeader>
          <CardContent>
            {!response &&
              options?.map((option, index) => (
                <div key={index} className="mb-4">
                  <p className="mb-2 ">{option}</p>
                </div>
              ))}

            {response?.choices.map((option, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2 ">{option.title}</p>
                <Progress
                  value={(option.votes * 100) / totalVote}
                  max={totalVote}
                  className="h-2"
                />
                <span className="text-sm text-gray-500">
                  {option.votes} Votes
                </span>
              </div>
            ))}
          </CardContent>
          {!response && (
            <CardFooter>
              <p className="w-full text-center text-sm font-medium">
                Chat is voting!
              </p>
              <ReactLoading
                type="spin"
                color="#828282"
                width={25}
                height={25}
                className="inline-block"
              />
            </CardFooter>
          )}
        </Card>
        {response && (
          <div className="flex justify-end mt-5">
            <Button size="lg" onClick={onClickContinue}>
              Continue
            </Button>
          </div>
        )}
      </Response>
    </div>
  );
};
