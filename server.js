const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const employeeRouter = require('./api/employeeRouter');
const menuRouter = require('./api/menuRouter');
const timesheetRouter = require('./api/timesheetRouter');
const menuItemsRouter = require('./api/menuItemsRouter');


const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())
app.use('/api/employees', employeeRouter)
app.use('/api/menus', menuRouter)
app.use('/api/employees/:employeeId/timesheets', timesheetRouter)
app.use('/api/menus/:menuId/menu-items', menuItemsRouter)

app.listen(port, () => {
    console.log(`Server has started listening on port: ${port}`)
})

module.exports = app;