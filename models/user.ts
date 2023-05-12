import {Model, DataTypes, Sequelize, Optional} from 'sequelize';

/**
 * @typedef {object} UserType
 * @member {number} id
 * @member {string} user_name
 * @member {string} email
 * @member {string} password
 * @member {number|Date} createdAt
 * @member {number|DataTypes} updatedAt
 */
export declare type UserType = {
  id?: number;
  user_name: string;
  email: string;
  password: string;
  createdAt?: number | Date;
  updatedAt?: number | Date;
} & Object & Optional<any, any> & Partial<any>;

/** class representing a user model */
class UserModel extends Model<UserType> {};


export const User = (sequelize: Sequelize): typeof UserModel => { 
  UserModel 
  UserModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20]
      }
    },
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true // true or false 
  });
  return UserModel;
};