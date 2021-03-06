const express = require('express')
const { getAllEmployees, addNewEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../dao/employeeDao')
const employeeRouter = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

employeeRouter.get('/', (req, res, next) => {
    getAllEmployees(req, res, next)
})

employeeRouter.post('/', (req, res, next) => {
    if (req.body && req.body.employee) {
        const newEmployee = req.body.employee
        addNewEmployee(req, res, newEmployee, next)
    } else {
        res.status(400).send()
    }
})

employeeRouter.get('/:employeeId', (req, res, next) => {
    getEmployeeById(req, res, next, req.params.employeeId)
})

employeeRouter.put('/:employeeId', (req, res, next) => {
    if (req.body && req.body.employee) {
        updateEmployee(req, res, next, req.body.employee)
    } else {
        res.status(400).send()
    }
})

employeeRouter.delete('/:employeeId', (req, res, next) => {
    deleteEmployee(req, res, next, req.params.id)
})


module.exports = employeeRouter;