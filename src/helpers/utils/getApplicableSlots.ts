import { EachSlotData, BookingInfo } from "../../types/slot";
import moment from "moment";

export const getApplicableSlots = (
  { slotCount, durationOfSlots },
  selectedDate
): BookingInfo[] => {
  const STARTS_AT = 8 * 60;
  const theDate = new Date(Date.parse(selectedDate));
  const formattedDate = `${theDate.getDate()}/${
    theDate.getMonth() + 1
  }/${theDate.getFullYear()}`;
  let startingTime = moment(formattedDate, "DD/MM/YY");

  let data = [];
  for (var i = 1; i <= slotCount; i++) {
    if (i === 1) {
      startingTime = startingTime.add(STARTS_AT, "minutes");
    }

    //todo: fix missing minutes in between calculations

    const startingTimeValue = startingTime.format("HH.mm A");

    const endingTime = startingTime.add(durationOfSlots, "minutes");
    const endingTimeValue = endingTime.format("HH.mm A");

    const eachSlot = {
      slot: `${startingTimeValue} -  ${endingTimeValue}`,
      id: i,
    };

    data.push(eachSlot);
    startingTime = endingTime;
  }

  console.log("data", data);
  return data;
};
