import {Model, DataTypes, Sequelize, Optional} from 'sequelize';

/**
 * @typedef {object} BookType
 * @member {number} id
 * @member {string} title
 * @member {string} author
 * @member {string} publish_date
 * @member {number} user_id
 * @member {number|Date} createdAt
 * @member {number|Date} updatedAt
 */
export declare type BookType = {
  id?: number;
  title: string;
  author?: string;
  publish_date: string;
  user_id: number;
  createdAt?: number | Date;
  updatedAt?: number | Date;
}& Object & Optional<any, any> & Partial<any>;

/** class representing book model */
class BookModel extends Model<BookType> {};

export const Book = (sequelize: Sequelize): typeof BookModel => {
  BookModel
  BookModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,          
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'book', // table name
    timestamps: true // true or false
  });
  return BookModel;
};