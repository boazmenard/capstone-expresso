const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('../database.sqlite')

const getAllTimesheets = (req, res, next, employeeId) => {
    db.all('SELECT * FROM Timesheet WHERE employee_id = $employeeId', {
        $employeeId: employeeId
    }, (err, rows) => {
        if (err) {
            console.log('An error occured trying to get the timesheet')
        }
        return rows
    })
}

const addANewTimesheet = (req, res, next, timesheet) => {
    db.run('INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employeeId)', {
        $hours: timesheet.hours,
        $rate: timesheet.rate,
        $date: timesheet.date,
        $employeeId: timesheet.employeeId
    }, function(err) {
        if (err) {
            console.log('An error occured with adding a new timesheet')
        }
        return this.lastID;
    })
}

const updateTimesheet = (req, res, next, timesheet) => {
    db.run('UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date, employee_id = $employeeId WHERE id = $id', {
        $id: timesheet.id,
        $hours: timesheet.hours,
        $rate: timesheet.rate,
        $date: timesheet.date,
        $employeeId: timesheet.employeeId
    }, function(err) {
        if (err) {
            console.log('An error occured with updating the timesheet')
        }
    })
}

const deleteTimesheet = (req, res, next, id) => {
    db.run('DELETE FROM Timesheet WHERE id = $id', {
        $id: id
    }, (err) => {
        if (err) {
            console.log('An error occured deleting the timesheet')
        }
    })
}