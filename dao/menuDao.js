const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

const getAllMenus = (req, res, next) => {
    db.all('SELECT * FROM Menu', (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        res.send({menus: rows})
    })
}

const addNewMenu = (req, res, next, menu) => {
    db.run('INSERT INTO Menu (title) VALUES ($title)', {
        $title: menu.title
    }, function(err) {
        menu.id = this.lastID
        res.status(201).send({menu: menu})
    })
}

const getMenuById = (req, res, next, id) => {
    db.get('SELECT * FROM Menu WHERE id = $id', {
        $id: id
    }, function(err, row) {
        res.send({menu: row})
    })
}

const updateMenu = (req, res, next, menu) => {
    db.run('UPDATE Menu SET title = $title WHERE id = $id', {
        $id: menu.id,
        $title: menu.title
    }, function(err) {
        res.send({menu: menu})
    })
}

const deleteMenu = (req, res, next, id) => {
    db.run('DELETE FROM Menu WHERE id = $id', {
        $id: id
    }, function(err) {
        res.status(204).send(204)
    })
}

module.exports ={getAllMenus, addNewMenu, getMenuById, updateMenu, deleteMenu}