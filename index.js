const port = 9876; 

const express = require('express')
const reload = require('reload')
const path = require('path')
const app = express()

app.use('/js', express.static('static/js/dist'))
app.use('/lib', express.static('static/js/lib'))
app.use('/css', express.static('static/css'))
app.use('/img', express.static('static/img/dist'))
app.use('/pages', express.static('static/pages'))

app.all('/pages', (req, res) => {
	res.redirect('/')
})

app.all('/', (req, res) => {
	res.sendFile(path.resolve('static/index/index.html'))
})

reload(app)

app.listen(port, () => {
    console.log('Listening on port ' + String(port))
})
