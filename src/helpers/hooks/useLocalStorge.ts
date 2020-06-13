import * as React from "react";

export const useLocalStorge = () => {
  const setSlotData = (slotData) => {
    localStorage.setItem("slotData", JSON.stringify(slotData));
  };

  return { setSlotData };
};
