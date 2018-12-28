const express = require('express')
const reload = require('reload')
const app = express()

app.use(express.static('static'))

reload(app)

app.listen(9876, () => {
    console.log('Listening on port 9876')
})