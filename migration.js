const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./database.sqlite')

// Create all the tables specified in readme
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Employee', (err) => {
        if (err) {
            throw new Error(err)
        }
        db.run('CREATE TABLE Employee (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, position TEXT NOT NULL, wage INTEGER NOT NULL, is_current_employee INTEGER DEFAULT(1))')
    })
    db.run('DROP TABLE IF EXISTS Timesheet', (err) => {
        if (err) {
            throw new Error(err)
        }
        db.run('CREATE TABLE Timesheet (id INTEGER PRIMARY KEY NOT NULL, hours INTEGER NOT NULL, rate INTEGER NOT NULL, date INTEGER NOT NULL, employee_id INTEGER NOT NULL, FOREIGN KEY(employee_id) REFERENCES Employee(id))')
    })
    db.run('DROP TABLE IF EXISTS Menu', (err) => {
        if (err) {
            throw new Error(err)
        }
        db.run('CREATE TABLE Menu (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL)')
    })
    db.run('DROP TABLE IF EXISTS MenuItem', (err) => {
        if (err) {
            throw new Error(err)
        }
        db.run('CREATE TABLE MenuItem (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT, inventory INTEGER NOT NULL, price INTEGER NOT NULL, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id))')
    })
})

console.log('All the databases have been created!')