import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlotBookingForm } from "../src/components/User/SlotBookingForm";
import { useAllSlotData } from "../src/helpers/hooks/useSlotData";
import moment from "moment";

const List: React.FC = ({}) => {
  const [date, setDate] = React.useState("");

  // const today = moment(new Date()).format("DD/MM/YY");
  // console.log("List:React.FC -> today", new Date().getMonth());
  const today = new Date();

  const handleDateSelection = (date: Date) => {
    setDate(date.toLocaleDateString().slice(0, 10));
  };

  return (
    <div>
      <h3>User App</h3>
      <Calendar
        onClickDay={handleDateSelection}
        tileDisabled={(day) =>
          day.date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        }
      />
      {date && <SlotBookingForm selectedDate={date} />}
    </div>
  );
};

export default List;
