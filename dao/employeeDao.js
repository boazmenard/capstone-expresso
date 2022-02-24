const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('../database.sqlite')

const getAllEmployees = () => {
    db.all('SELECT * FROM Employee', (err, rows) => {
        if (err) {
            console.log('Error has occured')
        }
        return rows
    })
}

const addNewEmployee = (employee) => {
    db.run('INSERT INTO Employee (name, position, wage) VALUES ($name, $position, $wage)', {
        $name: employee.name,
        $position: employee.position,
        $wage: employee.wage
    }, (err) => {
        if (err) {
            console.log("Couldn't insert employee due to error")
        }
    })
}

const getEmployeeById = id => {
    db.get('SELECT * FROM Employee WHERE id = $id', {
        $id: id
    }, (err, row) => {
        if (err) {
            console.log("Couldn't get that employee due to error")
        }
        return row
    })
}

const updateEmployee = employee => {
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

const deleteEmployee = id => {
    db.run('DELETE FROM Employee WHERE id = $id', {
        $id: id
    }, (err) => {
        if (err) {
            console.log("Couldn't delete that employee due to error")
        }
    })
}
