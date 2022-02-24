const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

const getAllEmployees = (req, res, next) => {
    db.all('SELECT * FROM Employee', (err, rows) => {
        if (err) {
            console.log('Error has occured getting the employees')
            console.log(err.message)
        }
        res.send({employees: rows})
    })
}

const addNewEmployee = (req, res, employee, next) => {
    db.run('INSERT INTO Employee (name, position, wage, is_current_employee) VALUES ($name, $position, $wage, $isCurrentEmployee)', {
        $name: employee.name,
        $position: employee.position,
        $wage: employee.wage,
        $isCurrentEmployee: employee.isCurrentEmployee
    }, function(err) {
        if (err) {
            console.log("Couldn't insert employee due to error")
        }
        employee.id = this.lastID
        res.status(201).send({employee: employee})
    })
}

const getEmployeeById = (req, res, next, id) => {
    db.get('SELECT * FROM Employee WHERE id = $id', {
        $id: id
    }, (err, row) => {
        if (err) {
            console.log("Couldn't get that employee due to error")
        }
        res.send({employee: row})
    })
}

const updateEmployee = (req, res, next, newEmployee) => {
    db.run('UPDATE Employee SET name = $name, position = $position, wage = $wage, is_current_employee = $isCurrentEmployee WHERE id = $id', {
        $id: newEmployee.id,
        $name: newEmployee.name,
        $position: newEmployee.position,
        $wage: newEmployee.wage,
        $isCurrentEmployee: newEmployee.isCurrentEmployee
    }, (err) => {
        if (err) {
            console.log("Couldn't update that employee due to error")
        }
        res.send({employee: newEmployee})
    })
}

const deleteEmployee = (req, res, next, id) => {
    db.run('UPDATE Employee SET is_current_employee = 0 WHERE id = $id', {
        $id: id
    }, (err) => {
        if (err) {
            console.log("Couldn't delete that employee due to error")
        }
        res.send()
    })
}

module.exports = {getAllEmployees, addNewEmployee, getEmployeeById, updateEmployee, deleteEmployee}