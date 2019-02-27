import React, { Component } from 'react';
import ExpensesCard from '../components/ExpensesCard';
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
      </div>
    );
  }
}
export default ExpensesListContainer;
