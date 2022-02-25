const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

const getAllMenuItems = (req, res, next, menuId) => {
    db.all('SELECT * FROM MenuItem WHERE menu_id = $menuId', {
        $menuId: menuId
    }, (err, rows) => {
        if (err) {
            console.log('An error occured trying to get the menu items')
        }
        res.send({menuItems: rows})
    })
}

const addANewMenuItem = (req, res, next, menuItem) => {
    db.run('INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menu_id)', {
        $name: menuItem.name,
        $description: menuItem.description,
        $inventory: menuItem.inventory,
        $price: menuItem.price,
        $menu_id: menuItem.menuId
    }, function(err) {
        if (err) {
            console.log('An error occured with adding a new menu item')
            console.log(err.message)
        }
        menuItem.id = this.lastID
        res.status(201).send({menuItem: menuItem});
    })
}

const updateMenuItem = (req, res, next, menuItem) => {
    db.run('UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price, menu_id = $menu_id WHERE id = $id', {
        $id: menuItem.id,
        $name: menuItem.name,
        $description: menuItem.description,
        $inventory: menuItem.inventory,
        $price: menuItem.price,
        $menu_id: menuItem.menuId
    }, function(err) {
        if (err) {
            console.log('An error occured with updating the menu item')
            console.log(err.message)
        }
        res.send({menuItem: menuItem})
    })
}

const deleteMenuItem = (req, res, next, id) => {
    db.run('DELETE FROM MenuItem WHERE id = $id', {
        $id: id
    }, (err) => {
        if (err) {
            console.log('An error occured deleting the menu item')
        }
        res.status(204).send()
    })
}

module.exports = {getAllMenuItems, addANewMenuItem, updateMenuItem, deleteMenuItem}