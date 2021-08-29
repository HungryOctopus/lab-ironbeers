const express = require('express');

const hbs = require('hbs');
const path = require('path');
const { cpuUsage } = require('process');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// To tell hbs where partial templates are located
hbs.registerPartials(__dirname + '/views/partials');

// Express needs to know which templating engine to use
// We need to set the option 'view engine' to the name of the package
// that will render our views
app.set('view engine', 'hbs');
// We need to tell express where to look up our view templates
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/randombeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Random beer :', randomBeer);
      res.render('randombeer', { randomBeer: randomBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
