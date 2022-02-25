const express = require('express');
const { getAllTimesheets, addANewTimesheet, updateTimesheet, deleteTimesheet } = require('../dao/timesheetDao');
const timesheetRouter = express.Router({mergeParams: true});


timesheetRouter.get('/', (req, res, next) => {
    getAllTimesheets(req, res, next, req.params.employeeId);
})

timesheetRouter.post('/', (req, res, next) => {
    if (req.body && req.body.timesheet){
        addANewTimesheet(req, res, next, req.body.timesheet)
    }
})

timesheetRouter.put('/:timesheetId', (req, res, next) => {
    if (req.body && req.body.timesheet) {
        updateTimesheet(req, res, next, req.body.timesheet)
    }
})

timesheetRouter.delete('/:timesheetId', (req, res, next) => {
    deleteTimesheet(req, res, next, req.params.timesheetId)
})

module.exports = timesheetRouter