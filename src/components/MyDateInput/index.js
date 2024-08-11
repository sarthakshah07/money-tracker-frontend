import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDateInput({ value, onChange }) {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <ReactDatePicker
            selected={value}
            onChange={onChange}
        />
    );
}