'use strict';
import {QueryInterface} from 'sequelize';
import * as Sequelize from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.createTable('book',{
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: false,          
        },
        author: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true
        },
        publish_date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        },
      });
    } catch (error) {
      console.error(`${JSON.stringify(error, null, 4)}`);
      throw error;
    }
  },

  async down (queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.dropTable('book');
    } catch (error) {
      console.error(`${JSON.stringify(error, null, 4)}`);
      throw error;
    }
  }
};
