import React, { useState } from 'react';
import { InlineDatePicker } from 'material-ui-pickers';

const DatePickerCmp = props => {
  const [selectedDate, handleDateChange] = useState(null);

  return (
    <InlineDatePicker
      fullWidth
      keyboard
      required
      disableOpenOnEnter
      disableFuture
      variant="outlined"
      label="Select Date"
      placeholder="Day/Month/Year"
      format="DD/MM/YYYY"
      value={selectedDate}
      onChange={handleDateChange}
      mask={value =>
        // handle clearing outside if value can be changed outside of the component
        value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
      }
    />
  );
};

export default DatePickerCmp;
