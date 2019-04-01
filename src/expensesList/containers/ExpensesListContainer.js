import React, { Component } from 'react';
import ExpensesCardCmp from '../components/ExpensesCard';
import CompareChart from '../components/CompareChart';
import AddCardModal from '../components/AddCardModal';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
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
      console.log(res);
      this.setState({
        expensesList: res.data
      });
    });
  };

  onModalChange = status => this.setState({ modalOpen: status });

  onSubmit = newRES => {
    const { expensesList } = this.state;
    console.log('newRES', newRES);
    this.setState({ expensesList: [...expensesList, newRES.data] });
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
        <CompareChart expenses={expensesList} />
        <Fab aria-label="Add" onClick={() => this.onModalChange(true)} className={classes.button}>
          <AddIcon />
        </Fab>
        <AddCardModal
          modalState={this.state.modalOpen}
          modalClose={() => this.onModalChange(false)}
          expenses={expensesList}
          onSubmit={this.onSubmit}
          classes={classes}
        />
      </div>
    );
  }
}
export default withStyles(styles(theme))(ExpensesListContainer);
