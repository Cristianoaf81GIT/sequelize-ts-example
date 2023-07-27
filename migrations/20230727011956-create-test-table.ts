'use strict';

import { QueryInterface } from "sequelize";
import * as Sequelize from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  try {
    await queryInterface.createTable('test', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true 
      },
      name: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
          min: {
            msg: 'minimum 2 characters',
            args: [2]
          },
          max: {
            msg: 'maximum 45 characters',
            args: [45]
          },
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true 
      },
    });
    await queryInterface.addIndex('test',['name']);
  } catch (error) {
    console.error(JSON.stringify(error, null, 4));
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  try {
    await queryInterface.dropTable('test');
  } catch (error) {
    console.error(JSON.stringify(error, null, 4));
  }
}
