const express = require('express')
const reload = require('reload')
const app = express()

const port = 9876

app.set('view engine', 'pug')
app.set('views', 'renders/views')
app.use(express.static('public'))
app.use((req, res, next) => {
    res.locals.development = process.env.NODE_ENV === 'development'
    res.locals.path = req.path
    next()
})

app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))
app.get('/particles', (req, res) => res.render('particles'))

reload(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
