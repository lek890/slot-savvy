import React, { useState } from "react";
import { getApplicableSlots } from "../../helpers/utils/getApplicableSlots";
import { useSlotOfDay } from "../../helpers/hooks/useSlotData";
import SlotMapper from "./SlotMapper";

export const SlotBookingForm: React.FC<{ selectedDate: string }> = ({
  selectedDate,
}) => {
  const { getDataForTheDay } = useSlotOfDay();
  const [slotMapping, setslotMapping] = useState([]);

  React.useEffect(() => {
    const slotsAndDurations = getDataForTheDay(selectedDate);
    setslotMapping(getApplicableSlots(slotsAndDurations, selectedDate));
  }, [selectedDate]);
  return <SlotMapper slotMapping={slotMapping}></SlotMapper>;
};
