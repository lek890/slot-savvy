import * as React from "react";
import { EachSlotData } from "../../types/slot";

export const useAllSlotData = () => {
  const [allSlotData, setAllSlotData] = React.useState();

  React.useEffect(() => {
    try {
      const data: EachSlotData[] = JSON.parse(localStorage.getItem("slotData"));
      setAllSlotData(data);
    } catch (err) {
      console.log("could not retrive from localstorage");
    }
  }, []);

  return { allSlotData };
};

export const useSlotOfDay = () => {
  const { allSlotData } = useAllSlotData();

  const getDataForTheDay = (date: string) =>
    (allSlotData && allSlotData[date]) || {};
  return { getDataForTheDay };
};
