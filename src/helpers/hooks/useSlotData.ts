import * as React from "react";
import { EachSlotData } from "../../types/slot";

export const useAllSlotData = () => {
  const getAllSlotData = () => {
    let data: EachSlotData[] = [];
    try {
      data = JSON.parse(localStorage.getItem("slotData"));
    } catch (err) {
      console.log("could not retrive from localstorage");
    }
    return data;
  };

  return { getAllSlotData };
};

export const useSlotOfDay = () => {
  const { getAllSlotData } = useAllSlotData();

  const getDataForTheDay = (date: string): EachSlotData => {
    const allSlotData = getAllSlotData();
    return allSlotData[date];
  };

  return { getDataForTheDay };
};
