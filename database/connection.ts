import {Sequelize} from 'sequelize';


const db = new Sequelize('tscrestdb','root', 'admin', {
    host:'localhost',
    dialect:'mysql',
    //logging:true
});

export default db;