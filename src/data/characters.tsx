import vampireIdle from "../assets/characters/vampire/Idle.png";
import vampireRun from "../assets/characters/vampire/Run.png";

import samuraiIdle from "../assets/characters/samurai/Idle.png";
import soldierIdle from "../assets/characters/soldier/Idle.png";
import warriorIdle from "../assets/characters/warrior/Idle.png";
import robotIdle from "../assets/characters/robot/Idle.png";
import knigthWalkIdle from "../assets/characters/knight/Walk.png";
import whizardIdle from "../assets/characters/wizard/idle.png";

const characters = {
  Vampire: {
    name: "Vampire",
    assetIdle: vampireIdle,
    assetHover: vampireRun,
    steps: 5,
  },
  Samurai: {
    name: "Samurai",
    assetIdle: samuraiIdle,
    assetHover: knigthWalkIdle,
    id: "default",
    steps: 5,
  },
  Soldier: {
    name: "Soldier",
    assetIdle: soldierIdle,
    assetHover: knigthWalkIdle,
    id: "soldier",
    steps: 9,
  },
  Warrior: {
    name: "Warrior",
    assetIdle: warriorIdle,
    assetHover: knigthWalkIdle,
    steps: 5,
  },
  Robot: {
    name: "Robot",
    assetIdle: robotIdle,
    assetHover: knigthWalkIdle,
    steps: 6,
  },
  Wizard: {
    name: "Wizard",
    assetIdle: whizardIdle,
    assetHover: whizardIdle,
    steps: 7,
  },
};

export { characters };
