const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialDirectoryPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gagan Tripathi'
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Gagan Tripathi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Gagan Tripathi'
    })
})
// app.get('', (req, res) => {
//     res.send(`<h1>Hello Express!</h1>`);
// })

// app.get('/help', (req, res) => {
//     res.send('This is a Help page');
// })

// app.get('/about', (req, res) => {
//     res.send(`<h1>This is an about page</h1>`);
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to fetch weather info.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, data) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        })
    })
    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gagan Tripathi',
        message: 'Help article not found'
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Gagan Tripathi',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});