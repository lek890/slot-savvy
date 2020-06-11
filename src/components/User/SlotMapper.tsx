import React from "react";

export const SlotMapper: React.FC<{ slotMapping: any }> = ({ slotMapping }) => {
  console.log("slotMapping", slotMapping);
  return (
    <div>
      {slotMapping.map((slot) => (
        <div>
          {slot}
          {"  "}
          <button>Book this slot</button>
        </div>
      ))}
    </div>
  );
};

export default SlotMapper;
