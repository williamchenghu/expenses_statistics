import React, { Component } from 'react';
import ExpensesCardCmp from '../components/ExpensesCard';
import DatePickerCmp from '../components/DatePicker';
import Modal from '@material-ui/core/Modal';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
      expensesList: []
    };
  }

  componentDidMount = () => {
    //get the expenses data
    axios.get('/expense').then(res => {
      // console.log(res);
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

  render() {
    let { expensesList } = this.state;
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
        <Modal open={this.state.modalOpen} onClose={this.onCloseModal}>
          <div className={classes.paper}>
            <Typography variant="headline" id="modal-title" className={classes.text}>
              New Expenses
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.margin}>
                  <DatePickerCmp
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
                      }
                    }}
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
                  this.setState({ currentCost: input.target.value });
                }}
                margin="normal"
                variant="outlined"
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
                  this.setState({ currentCost: input.target.value });
                }}
                margin="normal"
                variant="outlined"
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
                  this.setState({ currentCost: input.target.value });
                }}
                margin="normal"
                variant="outlined"
              />
            </form>
            <Button variant="contained" className={classes.button}>
              Add
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles(theme))(ExpensesListContainer);
