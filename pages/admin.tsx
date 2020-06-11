import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DataCollector from "../src/DataCollector/DataCollector";

const List: React.FC = ({}) => {
  const [date, setDate] = React.useState("");

  const handleDateSelection = (date: Date) => {
    setDate(date.toLocaleDateString().slice(0, 10));
  };

  return (
    <div>
      <h3>Admin Panel</h3>
      <Calendar onClickDay={handleDateSelection} />
      <DataCollector selectedDate={date} />
    </div>
  );
};

export default List;
