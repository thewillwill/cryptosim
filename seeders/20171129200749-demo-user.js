'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Transactions', [{
        currency: 'BTC',
        amount: .45,
        price_paid: 10000,
        transaction_type: 'B',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }, {
        currency: 'USD',
        amount: 5000,
        price_paid: 1,
        transaction_type: 'B',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }
      ], {
      });
    
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
