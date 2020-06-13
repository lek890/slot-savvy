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

export const useSaveBookedSlot = () => {
  const { getAllSlotData } = useAllSlotData();

  const saveBookedSlot = (slotId: number, date: string) => {
    const allSlotData = getAllSlotData();
    let updatedDay = allSlotData[date];
    updatedDay.allSlotInfo.map((item) => {
      if (item.id == slotId) {
        //todo: make it declarative
        item["booked"] = true;
      }
    });
    const updatedSlotData = { ...allSlotData, [date]: updatedDay };
    localStorage.setItem("slotData", JSON.stringify(updatedSlotData));
  };

  return { saveBookedSlot };
};
