const express = require('express')
const request = require('postman-request')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const weatherSvs = require('./utils/weatherservices')

const portal = process.env.PORT || 3000

const app = express()

// define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
 

// set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rommel'  
    })
})


app.get('/about', (req, res) => {
    const loc = req.query.location
    if(!req.query.location){
        return res.send({
            error: 'missing input, location'
        })
    }

    geoCode(loc, (error, { latitude, longitude, location }={}) => {

        if(error){
          return res.send({
            error: error
        })
        }
    
        weatherSvs(latitude, longitude, (error, weatherdata) => {
          
            if(error){
              return res.send({
                error: error
            })
            }
            
            res.render('about', {
                title: 'Current weather',
                input: loc,
                found_location: location,
                weather_desc: weatherdata
            })
            res.send({
                weather_desc: weatherdata,
                found_location: location,
                input: loc
            })
          })
    
    })

})


app.get( '/about/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'About article not found',  
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Please Contact',
        info_desc: 'roger@sample.com',  
        version: 'v2.2'  
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.name){
//         return res.send({
//             error: 'You must provide a search name'
//         })
// //     }

//     console.log(req.query.name)
//     res.send({
//         test: []
//     })
// })

app.get( '/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',  
    })
})

app.get( '*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',  
    })
})


app.listen(portal, () => {
    console.log(`server is up on port ${portal}`)
})