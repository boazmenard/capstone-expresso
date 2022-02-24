const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const employeeRouter = require('./api/employeeRouter');
const menuRouter = require('./api/menuRouter');


const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())
app.use('/api/employees', employeeRouter)
app.use('/api/menus', menuRouter)

app.listen(port, () => {
    console.log(`Server has started listening on port: ${port}`)
})

module.exports = app;