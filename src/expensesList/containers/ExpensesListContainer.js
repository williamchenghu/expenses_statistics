import React, { Component } from 'react';
import ExpensesCardCmp from '../components/ExpensesCard';
import DatePickerCmp from '../components/DatePicker';
import Modal from '@material-ui/core/Modal';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#e7ece8',
      main: '#b5bab6',
      dark: '#858a86',
      contrastText: '#184a45'
    },
    secondary: {
      light: '#ffa18f',
      main: '#ff6f61',
      dark: '#c63d37',
      contrastText: '#ffffff'
    },
    text: {
      primary: 'rgba(24, 74, 69, 0.87)',
      secondary: 'rgba(24, 74, 69, 0.54)',
      disabled: 'rgba(24, 74, 69, 0.38)',
      hint: 'rgba(24, 74, 69, 0.38)'
    },
    divider: 'rgba(24, 74, 69, 0.12)',
    background: {
      paper: '#ffffff',
      default: '#e1e2e1'
    }
  }
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit
  },
  text: {
    color: theme.palette.text.primary
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    },
    color: theme.palette.secondary.contrastText
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  cssFocused: {},
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.secondary.main
    }
  },
  notchedOutline: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  paper: {
    top: '30%',
    left: '30%',
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

export class ExpensesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      expensesList: [],
      datePick: null,
      foodCost: undefined,
      livingCost: undefined,
      transportCost: undefined
    };
  }

  componentDidMount = () => {
    //get the expenses data
    axios.get('/expense').then(res => {
      console.log(res);
      this.setState({
        expensesList: res.data
      });
    });
  };

  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  onChangeDate = selectedDate => {
    this.setState({ datePick: selectedDate });
  };

  //submit the data on modal
  onSubmitModal = (datePick, foodCost, livingCost, transportCost) => {
    const { expensesList } = this.state;
    axios
      .post('/new/expense', {
        data: {
          date: moment(datePick).format('YYYY-MM-DD (ddd)'),
          food: Number(foodCost),
          living: Number(livingCost),
          transport: Number(transportCost)
        }
      })
      .then(newRES => {
        console.log('newRES', newRES);
        this.setState({ expensesList: [...expensesList, newRES.data] });
        this.onCloseModal();
      });
  };

  render() {
    let { expensesList, foodCost, livingCost, transportCost, datePick } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.text}>
        {expensesList.map(expense => {
          return (
            <div key={expense.id}>
              <ExpensesCardCmp expenseDetails={expense} />
            </div>
          );
        })}
        <Fab aria-label="Add" onClick={this.onOpenModal} className={classes.button}>
          <AddIcon />
        </Fab>
        <ComposedChart
          width={600}
          height={300}
          data={expensesList}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="food" stackId="a" fill="#ffa18f" />
          <Bar dataKey="living" stackId="a" fill="#ff6f61" />
          <Bar dataKey="transport" stackId="a" fill="#c63d37" />
          <Line type="monotone" dataKey="living" stroke="#184a45" />
        </ComposedChart>
        <Modal open={this.state.modalOpen} onClose={this.onCloseModal}>
          <div className={classes.paper}>
            <Typography variant="headline" id="modal-title" className={classes.text}>
              New Expenses
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.margin}>
                  <DatePickerCmp
                    selectedDate={datePick}
                    changeDate={this.onChangeDate}
                    // InputLabelProps={{
                    //   classes: {
                    //     root: classes.cssLabel,
                    //     focused: classes.cssFocused
                    //   }
                    // }}
                    // InputProps={{
                    //   classes: {
                    //     root: classes.cssOutlinedInput,
                    //     focused: classes.cssFocused,
                    //     notchedOutline: classes.notchedOutline
                    //   }
                    // }}
                  />
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
                onChange={input => {
                  this.setState({ foodCost: input.target.value });
                }}
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
                onChange={input => {
                  this.setState({ livingCost: input.target.value });
                }}
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
                onChange={input => {
                  this.setState({ transportCost: input.target.value });
                }}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </form>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => this.onSubmitModal(datePick, foodCost, livingCost, transportCost)}
            >
              Add
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles(theme))(ExpensesListContainer);
