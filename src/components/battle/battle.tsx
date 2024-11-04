import { Progress } from "@/components/ui/progress";
import { Character } from "@/components/character/character";
import { characters } from "@/data/characters";
import { StoryStore } from "@/store/story";
import { Shield, Swords } from "lucide-react";

type Props = {
  enemy: string;
  enemyName: string;
  hero: string;
  heroName: string;
  enemyhealth: number;
  herohealth: number;
  powerups: StoryStore["powerups"];
};

const CharacterCard = ({
  name,
  health,
  character,
  damageCount,
  defenseCount,
  reversed = false,
}: {
  name: string;
  health: number;
  character: string;
  reversed?: boolean;
  damageCount: number;
  defenseCount: number;
}) => {
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
          <Progress
            value={health}
            className="h-3"
            color={reversed ? "bg-rose-900" : "bg-green-900"}
          />
        </div>
        <p className="mt-2 text-sm">{health}% HP</p>
        <PowerupsDisplay
          damageCount={damageCount}
          defenseCount={defenseCount}
        />
      </div>
    </div>
  );
};

const PowerupsDisplay = ({
  damageCount,
  defenseCount,
}: {
  damageCount: number;
  defenseCount: number;
}) => {
  return (
    <div className="flex space-x-2 mt-2">
      {damageCount > 0 && (
        <div className="flex items-center bg-red-500 rounded-full p-1 pr-2">
          <Swords size={16} className="text-white mr-1" />
          <span className="text-white text-xs font-bold">{damageCount}</span>
        </div>
      )}
      {defenseCount > 0 && (
        <div className="flex items-center bg-blue-500 rounded-full p-1 pr-2">
          <Shield size={16} className="text-white mr-1" />
          <span className="text-white text-xs font-bold">{defenseCount}</span>
        </div>
      )}
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
  powerups,
}: Props) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <CharacterCard
          name={heroName}
          character={hero}
          health={herohealth}
          damageCount={powerups.HERO_POWER_ATTACK_UP.length}
          defenseCount={powerups.HERO_DEFENSE.length}
        />
        <div className="text-5xl font-bold  my-4 sm:my-0 sm:mx-4">VS</div>
        <CharacterCard
          damageCount={powerups.ENEMY_POWER_ATTACK_UP.length}
          defenseCount={powerups.ENEMY_DEFENSE.length}
          name={enemyName}
          character={enemy}
          health={enemyhealth}
          reversed={true}
        />
      </div>
    </div>
  );
};
