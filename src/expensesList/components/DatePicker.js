import React, { useState } from 'react';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

const DatePickerCmp = props => {
  const [selectedDate, handleDateChange] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <InlineDatePicker
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
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerCmp;
