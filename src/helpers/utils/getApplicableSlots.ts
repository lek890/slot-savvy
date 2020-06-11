import { EachSlotData } from "../../types/slot";
import moment from "moment";

export const getApplicableSlots = (
  { slotCount, durationOfSlots }: EachSlotData,
  selectedDate
) => {
  console.log("slotCount, durationOfSlots", slotCount, durationOfSlots);
  const STARTS_AT = 8 * 60;
  const theDate = new Date(Date.parse(selectedDate));
  const formattedDate = `${theDate.getDate()}/${
    theDate.getMonth() + 1
  }/${theDate.getFullYear()}`;
  let startingTime = moment(formattedDate, "DD/MM/YY");

  let data = [];
  let startsAt = 0;
  for (var i = 0; i <= slotCount; i++) {
    if (i === 0) {
      startsAt = STARTS_AT;
    }

    //todo: fix missing minutes in between calculations

    startingTime = startingTime.add(startsAt, "minutes");
    const startingTimeValue = startingTime.format("HH.mm A");

    const endingTime = startingTime.add(durationOfSlots, "minutes");
    const endingTimeValue = endingTime.format("HH.mm A");

    startsAt = data.push(`${startingTimeValue} -  ${endingTimeValue}`);
    startingTime = endingTime;
  }

  console.log("data", data);
  return data;
};
