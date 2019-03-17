import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AnalysisPie from './AnalysisPie';

const styles = {
  card: {
    maxWidth: 400
  },
  title: {
    fontSize: 18
  }
};

const ExpensesCardCmp = ({ expenseDetails, classes }) => {
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
      <AnalysisPie expense={expenseDetails} />
    </Card>
  );
};

ExpensesCardCmp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExpensesCardCmp);
