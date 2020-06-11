import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface EachSlotData {
  slotCount: number;
  durationOfSlots: number;
}

const SlotBookingSchema = Yup.object().shape({
  slotCount: Yup.number().min(1, "No slots to book!").required("Required"),
  durationOfSlots: Yup.number()
    .max(1440, "Cannot book more than 24 hours!")
    .required("Required"),
});

const initialSlotData: EachSlotData = {
  slotCount: 0,
  durationOfSlots: 0,
};
const DataCollector: React.FC<{ selectedDate: string }> = ({
  selectedDate,
}) => {
  console.log("selectedDate", selectedDate);
  const [msgToUser, setMsgToUser] = useState("");
  const [initialValues, setInitialValues] = useState<EachSlotData>(
    initialSlotData
  );
  const [allSlotData, setAllSlotData] = useState({});

  React.useEffect(() => {
    if (Object.entries(allSlotData).length === 0) {
      try {
        const data: EachSlotData[] = JSON.parse(
          localStorage.getItem("slotData")
        );
        setInitialValues(data[selectedDate] || initialSlotData);
        setAllSlotData(data);
      } catch (err) {
        console.log("could not retrive from localstorage");
      }
    } else {
      setInitialValues(allSlotData[selectedDate] || initialSlotData);
    }
  }, [selectedDate]);

  if (!selectedDate) {
    return null;
  }

  const handleSubmission = (values, actions) => {
    setMsgToUser("");
    const { slotCount, durationOfSlots } = values;
    actions.setSubmitting(false);
    if (24 * 60 - slotCount * durationOfSlots < 0) {
      setMsgToUser(
        "These many slots cannot be booked on a day. Please adjust slot count or slot durations."
      );
      return;
    }
    const updatedData = {
      ...allSlotData,
      [selectedDate]: {
        slotCount: parseInt(slotCount),
        durationOfSlots: parseInt(durationOfSlots),
      },
    };
    localStorage.setItem("slotData", JSON.stringify(updatedData));
    setAllSlotData(updatedData);
    setMsgToUser("Data saved successfully");
  };
  console.log("initialValues", initialValues);

  return (
    <div>
      <span>Selected date: {selectedDate}</span>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmission}
        validationSchema={SlotBookingSchema}
        render={(formikBag) => {
          const { errors, isSubmitting } = formikBag;
          return (
            <Form>
              <Field
                name="slotCount"
                render={({ field }) => (
                  <div>
                    <label>Number of slots for this day: </label>
                    <input
                      type="text"
                      {...field}
                      placeholder="enter number"
                      style={{
                        border:
                          errors && errors["slotCount"]
                            ? "1px solid red"
                            : "1px solid brown",
                      }}
                    />
                  </div>
                )}
              />
              <Field
                name="durationOfSlots"
                render={({ field, form, meta }) => (
                  <div>
                    <label>Duration of each slot: </label>
                    <input
                      type="text"
                      {...field}
                      placeholder="in minutes"
                      style={{
                        border:
                          errors && errors["durationOfSlots"]
                            ? "1px solid red"
                            : "1px solid brown",
                      }}
                    />
                  </div>
                )}
              />
              <button type="submit">
                {isSubmitting ? "Calculating" : "Submit"}
              </button>
              {msgToUser && <div>{msgToUser}</div>}
            </Form>
          );
        }}
      ></Formik>
    </div>
  );
};

export default DataCollector;
