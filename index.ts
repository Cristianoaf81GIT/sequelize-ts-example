import {User, UserType} from './models/user';
import {Book, BookType} from './models/book';
import { Sequelize, Transaction } from 'sequelize';

(async (): Promise<void> => {
  let sequelize: Sequelize | null = null;
  let transaction: Transaction | null = null; 
  try {
   sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite3',    
    });

    transaction = await sequelize.transaction();
       
    /** uncomment if u use mysql/postgress or other rdms with user and password */
    // await sequelize.authenticate();   

    const userRepository = User(sequelize);
    const bookRepository = Book(sequelize);
    
    // for sqlite only
    await userRepository.sequelize?.query('PRAGMA foreign_keys = OFF;');
    await bookRepository.sequelize?.query('PRAGMA foreign_keys = OFF;');
    await userRepository.sequelize?.query('DELETE FROM user;')
    await bookRepository.sequelize?.query('DELETE FROM book;');    
    await userRepository.sequelize?.query('PRAGMA foreign_keys = ON;');
    await bookRepository.sequelize?.query('PRAGMA foreign_keys = ON;');

    
    const user: UserType =  {
      email: 'user@email.com',
      user_name: 'user',
      password: 'myawesomepassword'
    };

    
    const newUserDb = await userRepository.create(user,{returning: true, transaction});
    
    const book: BookType = {
      author: 'Fiódor Mikhailovitch Dostoiévski',
      publish_date: new Date('1886-01-01').toISOString(),
      title: 'Crime e Castigo',
      user_id: newUserDb.dataValues.id!,      
    };

    const newBookDb = await bookRepository.create(book,{returning: true, transaction});
    
    console.log(`new user: ${JSON.stringify(newUserDb, null, 4)}`);
    console.log(`new book: ${JSON.stringify(newBookDb, null, 4)}`);    
    
    await transaction.commit();
    await sequelize.close();

  } catch (error) {
    console.error(`${JSON.stringify(error, null, 4)}`);
    await transaction?.rollback();
    await sequelize?.close();    
    throw error;
  }
})();