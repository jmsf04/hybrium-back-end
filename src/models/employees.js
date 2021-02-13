const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('mysql://root@localhost:3306/backend');

const Employees = sequelize.define('employees', {
    id: {
        type: Sequelize.STRING,
        field: 'id',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    document: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    occupation: {
        type: Sequelize.STRING
    },
    workHourBegin: {
        type: Sequelize.STRING
    },
    workHourEnd: {
        type: Sequelize.STRING
    },
    lunchTimeBegin: {
        type: Sequelize.STRING
    },
    lunchTimeEnd: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Employees;