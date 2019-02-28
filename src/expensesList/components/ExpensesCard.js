import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 18
  }
};

export const ExpensesCard = ({ expenseDetails, classes }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.title}>{expenseDetails.date}</div>
        <div>
          <div>Food: {expenseDetails.food}€</div>
          <div>Living: {expenseDetails.living}€</div>
          <div>Transportation: {expenseDetails.transport}€</div>
        </div>
      </CardContent>
    </Card>
  );
};

ExpensesCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpensesCard);
