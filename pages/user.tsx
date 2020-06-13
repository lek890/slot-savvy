import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlotBookingForm } from "../src/components/User/SlotBookingForm";
import { useAllSlotData } from "../src/helpers/hooks/useSlotData";

const List: React.FC = ({}) => {
  const [date, setDate] = React.useState("");
  useAllSlotData();

  const handleDateSelection = (date: Date) => {
    setDate(date.toLocaleDateString().slice(0, 10));
  };

  return (
    <div>
      <h3>User App</h3>
      <Calendar onClickDay={handleDateSelection} />
      {date && <SlotBookingForm selectedDate={date} />}
    </div>
  );
};

export default List;
