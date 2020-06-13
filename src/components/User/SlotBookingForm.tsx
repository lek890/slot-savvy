import React, { useState } from "react";
import {
  useSaveBookedSlot,
  useSlotOfDay,
} from "../../helpers/hooks/useSlotData";

export const SlotBookingForm: React.FC<{
  selectedDate: string;
}> = ({ selectedDate }) => {
  const [dataForTheDay, setDataForTheDay] = useState();

  const { getDataForTheDay } = useSlotOfDay();
  const { saveBookedSlot } = useSaveBookedSlot();

  const updateAllSlotData = () => {
    const dataForTheDay = getDataForTheDay(selectedDate);
    setDataForTheDay(dataForTheDay);
  };

  React.useEffect(() => {
    updateAllSlotData();
  }, [selectedDate]);

  const handleBooking = (slot) => {
    // const updatedSlot = { ...slot, booked: true };
    // const updatedBookingSlots = slotMapping.filter(
    //   (item) => item.id !== slot.id
    // );

    saveBookedSlot(slot.id, selectedDate);
    setTimeout(() => updateAllSlotData(), 1000);
  };
  return (
    <div>
      {dataForTheDay?.allSlotInfo &&
        dataForTheDay.allSlotInfo.map((item) => {
          const bookingCount = item.booked || 0;
          const canBook = dataForTheDay.admissionsOnEachSlot - bookingCount;
          return (
            <div key={item.id}>
              {item.slot}
              {"  "}
              <button disabled={!canBook} onClick={() => handleBooking(item)}>
                Book this slot
              </button>
              {"  "}
              {!!canBook && <span>{`( ${canBook} left )`}</span>}
              {!canBook && <span>{"Fully Booked"}</span>}
            </div>
          );
        })}
    </div>
  );
};
