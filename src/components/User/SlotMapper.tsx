import React from "react";
import { BookingInfo } from "../../types/slot";
import { useLocalStorge } from "../../helpers/hooks/useLocalStorge";

const saveUpdatedSlots = (allSlots) => {
  localStorage.setItem("", JSON.stringify(allSlots));
};

export const SlotMapper: React.FC<{ slotMapping: BookingInfo[] }> = ({
  slotMapping,
}) => {
  const handleBooking = (slot) => {
    const updatedSlot = { ...slot, booked: true };
    const updatedBookingSlots = slotMapping.filter(
      (item) => item.id !== slot.id
    );

    const updatedSlotInfo = [...updatedBookingSlots, updatedSlot];
    saveUpdatedSlots(updatedSlotInfo);
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
