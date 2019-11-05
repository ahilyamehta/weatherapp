const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahilya'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Weather Information'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Supporting Information'
    })
})

app.get('', (req,res) => {
    res.send('Hello express!')
})


app.get('/help', (req,res) =>{
    res.send('Hello help page')
})

app.get('/about', (req,res) => {
    res.send('Hello about page')
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ahilya',
        errorMessage: 'Page Not Found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude,longitude, location})=> {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })
   })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahilya',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('app.js in source folder is running')
})