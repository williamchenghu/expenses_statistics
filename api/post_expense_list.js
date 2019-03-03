const Chance = require('chance');
const chance = new Chance();

module.exports = {
  path: '/api/new/expense',
  method: 'POST',
  template: (params, query, body) => ({
    id: chance.guid(),
    ...body.data
  })
};
