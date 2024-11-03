import React from "react";

import { clsx } from "clsx";

import "./animation.css";

export const Character = ({ isSelected, onClick, name, assetIdle, steps }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-lg  w-[128px] cursor-pointer	box-content border-solid	",
        {
          "shadow-md  border-2 border-black": isSelected,
        }
      )}
    >
      <div id={`ch-default`}>
        <img
          id={`ch-default-sprite`}
          className={`steps-${steps}`}
          src={assetIdle}
        />
      </div>
    </button>
  );
};
