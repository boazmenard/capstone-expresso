const express = require('express');
const { deleteMenuItem, updateMenuItem, addANewMenuItem, getAllMenuItems } = require('../dao/menuItemsDao');
const menuItemsRouter = express.Router({mergeParams: true})

menuItemsRouter.get('/', (req, res, next) => {
    getAllMenuItems(req, res, next, req.params.menuId);
})

menuItemsRouter.post('/', (req, res, next) => {
    if (req.body && req.body.menuItem){
        req.body.menuItem.menuId = req.params.menuId
        addANewMenuItem(req, res, next, req.body.menuItem)
    }
})

menuItemsRouter.put('/:menuId', (req, res, next) => {
    if (req.body && req.body.menuItem) {
        updateMenuItem(req, res, next, req.body.menuItem)
    }
})

menuItemsRouter.delete('/:menuId', (req, res, next) => {
    deleteMenuItem(req, res, next, req.params.menuId)
})

module.exports = menuItemsRouter