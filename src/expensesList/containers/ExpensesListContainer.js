import React, { Component } from 'react';
import ExpensesCard from '../components/ExpensesCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

export class ExpensesListContainer extends Component {
  state = {
    expensesList: []
  };

  componentDidMount = () => {
    //get the expenses data
    axios.get('/expense').then(res => {
      // console.log(res);
      this.setState({
        expensesList: res.data
      });
    });
  };

  render() {
    let { expensesList } = this.state;
    return (
      <div>
        {expensesList.map(expense => {
          return (
            <div key={expense.id}>
              <ExpensesCard expenseDetails={expense} />
            </div>
          );
        })}
        <Fab color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
export default ExpensesListContainer;
