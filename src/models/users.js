const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('mysql://root@localhost:3306/backend');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        field: 'id',
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Users;