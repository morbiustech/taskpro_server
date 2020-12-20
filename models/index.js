const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{

        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorAliases:false,
        pool: {

            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle

        }
    }  
);
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// users 
db.users = require('./users.model')(sequelize,Sequelize)
db.tasks = require('./tasks.model')(sequelize,Sequelize)

db.tasks.belongsTo(db.users,{ foreignKey:'user_id'})


module.exports = db