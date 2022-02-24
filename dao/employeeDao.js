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
        console.log('I DID IT')
        res.status(201).send(employee)
    })
}

const getEmployeeById = (req, res, next, id) => {
    db.get('SELECT * FROM Employee WHERE id = $id', {
        $id: id
    }, (err, row) => {
        if (err) {
            console.log("Couldn't get that employee due to error")
        }
        return row
    })
}

const updateEmployee = (req, res, next, employee) => {
    db.run('UPDATE Employee SET name = $name, position = $position, wage = $wage WHERE id = $id', {
        $id: employee.id,
        $name: employee.name,
        $position: employee.position,
        $wage: employee.wage
    }, (err) => {
        if (err) {
            console.log("Couldn't update that employee due to error")
        }
    })
}

const deleteEmployee = (req, res, next, id) => {
    db.run('DELETE FROM Employee WHERE id = $id', {
        $id: id
    }, (err) => {
        if (err) {
            console.log("Couldn't delete that employee due to error")
        }
    })
}

module.exports = {getAllEmployees, addNewEmployee}