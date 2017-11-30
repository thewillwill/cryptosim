'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('Portfolios', [{
        currency: 'USD',
        amount: 5000,
        expired: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }, {
        currency: 'USD',
        amount: 4000,
        expired: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }, {
        currency: 'BTC',
        amount: 0.45,
        expired: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
