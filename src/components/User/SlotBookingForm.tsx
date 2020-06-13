import React, { useState } from "react";
import { useSlotOfDay } from "../../helpers/hooks/useSlotData";
import SlotMapper from "./SlotMapper";

export const SlotBookingForm: React.FC<{ selectedDate: string }> = ({
  selectedDate,
}) => {
  const { getDataForTheDay } = useSlotOfDay();
  const [slotMapping, setslotMapping] = useState([]);

  React.useEffect(() => {
    const dataForTheDay = getDataForTheDay(selectedDate);
    setslotMapping(dataForTheDay?.allSlotInfo);
  }, [selectedDate]);

  return <SlotMapper slotMapping={slotMapping}></SlotMapper>;
};
