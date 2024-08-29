const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');
const Course = require('./course');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'id',
        },
    },
    enrollment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'enrollment',
    timestamps: false,
});

module.exports = Enrollment;
