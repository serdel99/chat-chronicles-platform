import { Progress } from "@/components/ui/progress";
import { Character } from "@/components/character/character";
import { characters } from "@/data/characters";

type Props = {
  enemy: string;
  enemyName: string;
  hero: string;
  heroName: string;
  enemyhealth: number;
  herohealth: number;
};

const CharacterCard = ({
  name,
  health,
  character,
  reversed = false,
}: {
  name: string;
  health: number;
  character: string;
  reversed?: boolean;
}) => {
  console.log(character);
  return (
    <div
      className={`flex flex-col items-center ${
        reversed ? "sm:flex-col-reverse" : ""
      }`}
    >
      <div className="relative w-32 h-32 mb-4 trasn">
        <div className={reversed ? "-scale-x-[1]" : ""}>
          <Character {...characters[character]} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-boldmb-2">{name}</h2>
        <div className="w-32">
          <Progress value={health} className="h-3" />
        </div>
        <p className="mt-2 text-sm">{health}% HP</p>
      </div>
    </div>
  );
};

export const Battle = ({
  hero,
  herohealth,
  heroName,
  enemy,
  enemyName,
  enemyhealth,
}: Props) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <CharacterCard name={heroName} character={hero} health={herohealth} />
        <div className="text-5xl font-bold  my-4 sm:my-0 sm:mx-4">VS</div>
        <CharacterCard
          name={enemyName}
          character={enemy}
          health={enemyhealth}
          reversed={true}
        />
      </div>
    </div>
  );
};
