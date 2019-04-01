import React, { useState } from 'react';
import DatePickerCmp from './DatePicker';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AddCardModal = ({ modalState, modalClose, expenses, onSubmit, classes }) => {
  //init the state of all fields
  const [datePick, onChangeDate] = useState(null);
  const [foodCost, onChangeFoodCost] = useState(undefined);
  const [livingCost, onChangelivingCost] = useState(undefined);
  const [transportCost, onChangeTransportCost] = useState(undefined);

  //post the data on modal
  const onSubmitModal = () => {
    console.log('foodCost', foodCost);
    axios
      .post('/new/expense', {
        data: {
          date: moment(datePick).format('YYYY-MM-DD (ddd)'),
          food: Number(foodCost),
          living: Number(livingCost),
          transport: Number(transportCost)
        }
      })
      //add new data to cards list
      .then(newRES => {
        console.log('n', newRES);
        onSubmit(newRES);
      });
  };

  return (
    <Modal open={modalState} onClose={() => modalClose()}>
      <div className={classes.paper}>
        <Typography variant="headline" id="modal-title" className={classes.text}>
          New Expenses
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={classes.margin}>
              <DatePickerCmp selectedDate={datePick} changeDate={onChangeDate} />
            </div>
          </MuiPickersUtilsProvider>
          <TextField
            id="food"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
              endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            label="Food Cost"
            placeholder="Food, drinks, snacks...you name it."
            fullWidth
            className={classes.margin}
            onChange={input => onChangeFoodCost(input.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
          />
          <TextField
            id="living"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
              endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            label="Living Cost"
            placeholder="Rent, clothes, glitters...everything counts."
            fullWidth
            className={classes.margin}
            onChange={input => onChangelivingCost(input.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
          />
          <TextField
            id="transportation"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              },
              endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            label="Transportation Cost"
            placeholder="Public, private, gas...those moved you around."
            fullWidth
            className={classes.margin}
            onChange={input => onChangeTransportCost(input.target.value)}
            margin="normal"
            variant="outlined"
            type="number"
          />
        </form>
        <Button variant="contained" className={classes.button} onClick={() => onSubmitModal()}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default AddCardModal;
