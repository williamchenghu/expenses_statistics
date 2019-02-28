const Chance = require('chance');
const moment = require('moment');

const chance = new Chance();

const expense = () => ({
  id: chance.guid(),
  date: moment(chance.date()).format('YYYY-MM-DD (ddd)'),
  food: chance.floating({ min: 50, max: 500, fixed: 2 }),
  living: chance.floating({ min: 0, max: 1000, fixed: 2 }),
  transport: chance.floating({ min: 0, max: 200, fixed: 2 })
});

module.exports = {
  path: '/api/expense',
  method: 'GET',
  cache: false,
  template: Array.from({ length: 5 }, () => expense())
};
