const express = require('express')
const { getAllMenus, addNewMenu, getMenuById, updateMenu, deleteMenu } = require('../dao/menuDao')
const menuRouter = express.Router()

menuRouter.get('/', (req, res, next) => {
    getAllMenus(req, res, next)
})

menuRouter.post('/', (req, res, next) => {
    if (req.body && req.body.menu) {
        addNewMenu(req, res, next, req.body.menu)
    } else {
        res.status(400).send()
    }
})

menuRouter.get('/:menuId', (req, res, next) => {
    getMenuById(req, res, next, req.params.menuId)
})

menuRouter.put('/:menuId', (req, res, next) => {
    if (req.body && req.body.menu) {
        updateMenu(req, res, next, req.body.menu)
    } else {
        res.status(400).send()
    }
    
})

menuRouter.delete('/:menuId', (req, res, next) => {
    deleteMenu(req, res, next, req.params.menuId)
})

module.exports = menuRouter