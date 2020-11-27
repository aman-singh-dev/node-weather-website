const path = require('path')
const express = require('express')
const hbs = require('hbs')
const temperature = require('./utils/temperature')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Call us @ +91-8585454545',
        name: 'Aman'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is missing!'
        })
    }
    temperature(req.query.address, (error, data) => {

        if (error) {
            return res.send({ error })
        }
        res.send({ data })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        message: 'Help article not found!',
        name: 'Aman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        message: '404 page not found!',
        name: 'Aman'
    })
})

app.listen(port, () => {
    console.log('server is running at port ' + port);
})