import React from "react";
import { BookingInfo } from "../../types/slot";
import { useSaveBookedSlot } from "../../helpers/hooks/useSlotData";

export const SlotMapper: React.FC<{
  slotMapping: BookingInfo[];
  selectedDate: string;
}> = ({ slotMapping, selectedDate }) => {
  const { saveBookedSlot } = useSaveBookedSlot();
  const handleBooking = (slot) => {
    // const updatedSlot = { ...slot, booked: true };
    // const updatedBookingSlots = slotMapping.filter(
    //   (item) => item.id !== slot.id
    // );

    saveBookedSlot(slot.id, selectedDate);
  };
  return (
    <div>
      {slotMapping &&
        slotMapping.map((item) => (
          <div>
            {item.slot}
            {"  "}
            <button disabled={item.booked} onClick={() => handleBooking(item)}>
              Book this slot
            </button>
            <span>{item.booked ? "Full Booked" : ""}</span>
          </div>
        ))}
    </div>
  );
};

export default SlotMapper;
