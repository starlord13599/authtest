'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('accessTokens', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			accessToken: {
				type: Sequelize.STRING
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('accessTokens');
	}
};
