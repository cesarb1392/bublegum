'use strict';

const Sequelize = require('sequelize');
const config = require('../Config/ServerConfig');


const sequelize = new Sequelize(config.postgres.database, config.postgres.user, config.postgres.password, {
    host: config.postgres.host,
    dialect: config.postgres.dialect,
    operatorsAliases: config.postgres.operatorsAliases,
    pool: config.postgres.pool
});


const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: require('../Models/User')(sequelize, Sequelize)
};


module.exports = db;


// const uuidv4 = require('uuid/v4');
// const bcrypt = require('bcrypt');
// const salt = 10;

// const db = null;
//
// const initConnexion = (syncDB?: boolean) => {
//     try {
//         const config = require('../Config/ServerConfig');
//         const sequelize = new Sequelize(config.postgres.database, config.postgres.user, config.postgres.password, {
//             host: config.postgres.host,
//             dialect: config.postgres.dialect,
//             operatorsAliases: config.postgres.operatorsAliases,
//             pool: config.postgres.pool
//         });
//
//         authenticateDB(sequelize);
//
//         if(syncDB){
//             this.syncDB(sequelize);
//         }
//
//          this.db = {
//             Sequelize: Sequelize,
//             sequelize: sequelize
//         };
//
//         db['Users'] = require('../Models/User')(sequelize, Sequelize);
//
//         return db;
//
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// const authenticateDB = (dbConnexion) => {
//     return dbConnexion.authenticate()
//         .then(() => {
//             console.log('Connection has been established successfully.');
//             return true;
//         })
//         .catch(err => {
//             console.error('Unable to connect to the database:', err);
//             return false;
//         });
// };
//
// const syncDB = (sequelize, force?: boolean) => {
//     if(force){
//         return sequelize.sync({ force: true });
//     }else{
//         return sequelize.sync({});
//
//     }
// };
//
//
// module.exports= {
//     connexion: db,
//     initConnexion: initConnexion
// };


// export class Database {
//
//     db = null;
//
//     public static initConnexion(){
//         try {
//             const config = require('../Config/ServerConfig');
//             const sequelize = new Sequelize(config.postgres.database, config.postgres.user, config.postgres.password, {
//                 host: config.postgres.host,
//                 dialect: config.postgres.dialect,
//                 operatorsAliases: config.postgres.operatorsAliases,
//                 pool: config.postgres.pool
//             });
//
//             Database.authenticateDB(sequelize);
//
//             Database.db = {
//                 Sequelize: Sequelize,
//                 sequelize: sequelize
//             };
//
//             Database.db['Users'] = require ('../Models/User')(sequelize, Sequelize);
//
//         }catch (error) {
//             throw new Error (error);
//         }
//     }
//
//     private static authenticateDB(dbConnexion): void {
//         return dbConnexion.authenticate()
//             .then(() => {
//                 console.log('Connection has been established successfully.');
//                 return true;
//             })
//             .catch(err => {
//                 console.error('Unable to connect to the database:', err);
//                 return false;
//             });
//     }
//
//     public static syncDB(sequelize){
//         // sequelize.sync({ force: true })
//         return  sequelize.sync({});
//     }
//     //
//     // public static async defineUserModel (){
//     //     const dbConnexion = this.openConnexion();
//     //     return await UserModel(dbConnexion, Sequelize);
//     // }
//     //
//     // public static async createUser (email, password) {
//     //     return await UserModel.create({
//     //         email: email,
//     //         password: password
//     //     })
//     // }
//     //
//     // public static async getAllUsers() {
//     //     return await UserModel.findAll({});
//     // }
//
//
// }
