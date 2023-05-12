'use strict';
import {QueryInterface} from 'sequelize';
import * as Sequelize from 'sequelize';

module.exports = {      
  async up (queryInterface:QueryInterface): Promise<void> {
   try {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,        
      },
      user_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8,8]
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
    await queryInterface.dropTable('user');
   } catch (error) {
    console.error(`${JSON.stringify(error, null, 4)}`);
    throw error;
   }
  }
};
